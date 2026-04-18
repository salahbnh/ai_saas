import { NextResponse } from "next/server";
import { streamText } from "ai";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/config/plans";
import { getModel, resolveModelForPlan, DEFAULT_MODEL_ID } from "@/lib/ai/models";
import { chatRateLimit, checkRateLimit } from "@/lib/rate-limit";
import {
  getTemplate,
  resolvePrompt,
  TONES,
  LENGTHS,
  type Tone,
  type Length,
} from "@/app/(dashboard)/dashboard/writer/templates";

export const runtime = "nodejs";
export const maxDuration = 60;

const toneValues = TONES as readonly [string, ...string[]];
const lengthValues = LENGTHS.map((l) => l.id) as unknown as readonly [string, ...string[]];

const requestSchema = z.object({
  templateId: z.string().min(1),
  topic: z.string().trim().min(1).max(500),
  tone: z.enum(toneValues),
  length: z.enum(lengthValues),
  audience: z.string().max(200).optional(),
  instructions: z.string().max(500).optional(),
  modelId: z.string().optional(),
  apiKey: z.string().trim().min(1).optional(),
});

export async function POST(req: Request) {
  const user = await requireUser();

  // Rate limit — shares the chat bucket (20/min)
  const rl = await checkRateLimit(chatRateLimit, `chat:${user.id}`);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down.", reset: rl.reset },
      { status: 429 },
    );
  }

  const parsed = requestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { templateId, topic, tone, length, audience, instructions, modelId, apiKey: userApiKey } =
    parsed.data;

  const template = getTemplate(templateId);
  if (!template) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }

  // Plan quota — counts against messagesPerMonth (shared with chat)
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
        { error: "Monthly quota reached. Upgrade your plan to continue.", quotaExceeded: true },
        { status: 402 },
      );
    }
  }

  const resolvedModelId = resolveModelForPlan(
    modelId ?? DEFAULT_MODEL_ID,
    subscription?.plan ?? "STARTER",
  );

  const systemPrompt = resolvePrompt(template, {
    tone: tone as Tone,
    length: length as Length,
    audience,
    instructions,
  });

  try {
    const result = await streamText({
      model: getModel(resolvedModelId, userApiKey),
      system: systemPrompt,
      messages: [{ role: "user", content: topic }],
    });

    return result.toDataStreamResponse();
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown provider error";
    const isQuota = /quota|exceeded|429|rate limit/i.test(msg);
    const isAuth = /api key|unauthor|401|403/i.test(msg);
    console.error("[writer] provider error:", err);
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
