import { NextResponse } from "next/server";
import { streamText, type CoreMessage } from "ai";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/config/plans";
import { getModel, resolveModelForPlan, DEFAULT_MODEL_ID } from "@/lib/ai/models";
import { chatRateLimit, checkRateLimit } from "@/lib/rate-limit";
import { generateConversationTitle } from "@/lib/ai/title";

export const runtime = "nodejs";
export const maxDuration = 60;

const requestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
      }),
    )
    .min(1),
  conversationId: z.string().min(1),
  modelId: z.string().optional(),
  apiKey: z.string().trim().min(1).optional(),
});

const SYSTEM_PROMPT = `You are NexusAI, a helpful AI assistant. Respond clearly and concisely. Use GitHub-flavored Markdown for formatting — code blocks with language tags, lists, tables, and headings when appropriate.`;

export async function POST(req: Request) {
  const user = await requireUser();

  // 1. Rate limit (per user) — 20 msg/min
  const rl = await checkRateLimit(chatRateLimit, `chat:${user.id}`);
  if (!rl.success) {
    return NextResponse.json(
      {
        error: "Too many messages. Please slow down.",
        reset: rl.reset,
      },
      { status: 429 },
    );
  }

  // 2. Parse + validate body
  const parsed = requestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { messages, conversationId, modelId, apiKey: userApiKey } = parsed.data;

  // 3. Load conversation + verify ownership
  const conversation = await db.conversation.findUnique({
    where: { id: conversationId },
    include: { user: { select: { id: true } } },
  });
  if (!conversation || conversation.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 4. Plan-based quota
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });
  const plan = getPlan(subscription?.plan ?? "STARTER");
  if (plan.limits.messagesPerMonth !== -1) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const monthCount = await db.message.count({
      where: {
        role: "USER",
        createdAt: { gte: startOfMonth },
        conversation: { userId: user.id },
      },
    });
    if (monthCount >= plan.limits.messagesPerMonth) {
      return NextResponse.json(
        {
          error: "Monthly message quota reached. Upgrade your plan to continue.",
          quotaExceeded: true,
        },
        { status: 402 },
      );
    }
  }

  // 5. Resolve the model (falls back to plan default if not allowed)
  const resolvedModelId = resolveModelForPlan(
    modelId ?? conversation.model ?? DEFAULT_MODEL_ID,
    subscription?.plan ?? "STARTER",
  );

  // Persist model choice on the conversation (so reloads pick the same one).
  if (resolvedModelId !== conversation.model) {
    await db.conversation.update({
      where: { id: conversation.id },
      data: { model: resolvedModelId },
    });
  }

  // 6. Reconcile client messages ↔ DB messages.
  //
  // Three scenarios arrive at this endpoint:
  //   a) Fresh user turn → client has 1 more USER msg than DB → create it.
  //   b) Regenerate (reload()) → same USER count, DB has a trailing ASSISTANT
  //      message that the client dropped → delete that stale ASSISTANT.
  //   c) Edit-and-resend → client has FEWER messages (truncated). We delete
  //      everything in the DB after the last client-side message id, then
  //      create the edited USER message if needed.
  const lastUserMessage = messages[messages.length - 1];
  const dbMessages = await db.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" },
    select: { id: true, role: true, content: true },
  });
  const dbUserCount = dbMessages.filter((m) => m.role === "USER").length;
  const clientUserCount = messages.filter((m) => m.role === "user").length;

  if (clientUserCount > dbUserCount) {
    // (a) New user turn.
    if (lastUserMessage?.role === "user") {
      await db.message.create({
        data: {
          conversationId: conversation.id,
          role: "USER",
          content: lastUserMessage.content,
        },
      });
    }
  } else if (clientUserCount === dbUserCount) {
    // (b) Regenerate. Drop the trailing ASSISTANT so we don't end up with two.
    const last = dbMessages[dbMessages.length - 1];
    if (last?.role === "ASSISTANT") {
      await db.message.delete({ where: { id: last.id } });
    }
  } else {
    // (c) Truncated (edit-and-resend path). The client should already have
    // called the truncate server action, but defend here too: delete any
    // DB rows beyond what the client sent, then re-persist the new tail
    // user message.
    const keepCount = messages.length;
    const toDrop = dbMessages.slice(keepCount);
    if (toDrop.length > 0) {
      await db.message.deleteMany({
        where: { id: { in: toDrop.map((m) => m.id) } },
      });
    }
    if (lastUserMessage?.role === "user") {
      const dbLast = dbMessages[keepCount - 1];
      if (!dbLast || dbLast.content !== lastUserMessage.content) {
        await db.message.create({
          data: {
            conversationId: conversation.id,
            role: "USER",
            content: lastUserMessage.content,
          },
        });
      }
    }
  }

  // 7. Stream
  const coreMessages: CoreMessage[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const isFirstExchange =
    conversation.title === "New Conversation" &&
    messages.filter((m) => m.role === "user").length === 1;

  try {
    const result = await streamText({
      model: getModel(resolvedModelId, userApiKey),
      system: SYSTEM_PROMPT,
      messages: coreMessages,
      onFinish: async ({ text, usage }) => {
        try {
          await db.message.create({
            data: {
              conversationId: conversation.id,
              role: "ASSISTANT",
              content: text,
              tokenCount: usage?.totalTokens ?? null,
            },
          });

          // Auto-title on first successful exchange. Fire-and-forget.
          if (isFirstExchange && lastUserMessage) {
            void generateConversationTitle({
              conversationId: conversation.id,
              firstMessage: lastUserMessage.content,
              firstResponse: text,
            });
          }
        } catch (err) {
          console.error("[chat] failed to persist assistant message:", err);
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (err) {
    // Provider-level failures (quota exceeded, auth, network). Classify so the
    // client toast is useful instead of dumping a raw stack.
    const msg = err instanceof Error ? err.message : "Unknown provider error";
    const isQuota = /quota|exceeded|429|rate limit/i.test(msg);
    const isAuth = /api key|unauthor|401|403/i.test(msg);
    console.error("[chat] provider error:", err);
    return NextResponse.json(
      {
        error: isQuota
          ? "This model is rate-limited right now. Try another model or wait a moment."
          : isAuth
            ? "This model's API key is missing or invalid."
            : "The model failed to respond. Please try again.",
      },
      { status: isQuota ? 429 : isAuth ? 401 : 502 },
    );
  }
}
