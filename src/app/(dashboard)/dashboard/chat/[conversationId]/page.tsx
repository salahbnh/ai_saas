import { notFound } from "next/navigation";
import type { Message as UIMessage } from "ai";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getModelsForPlan, resolveModelForPlan, DEFAULT_MODEL_ID } from "@/lib/ai/models";
import { ChatUI } from "../chat-ui";

export default async function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const user = await requireUser();

  const conversation = await db.conversation.findUnique({
    where: { id: params.conversationId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        select: { id: true, role: true, content: true, createdAt: true },
      },
    },
  });

  if (!conversation || conversation.userId !== user.id) notFound();

  const [subscription] = await Promise.all([
    db.subscription.findUnique({ where: { userId: user.id } }),
  ]);
  const plan = subscription?.plan ?? "STARTER";
  const models = getModelsForPlan(plan);
  const initialModelId = resolveModelForPlan(
    conversation.model ?? DEFAULT_MODEL_ID,
    plan,
  );

  // Map DB roles (USER/ASSISTANT/SYSTEM) → AI SDK roles (user/assistant/system)
  const initialMessages: UIMessage[] = conversation.messages.map((m) => ({
    id: m.id,
    role: m.role.toLowerCase() as "user" | "assistant" | "system",
    content: m.content,
    createdAt: m.createdAt,
  }));

  return (
    <ChatUI
      conversationId={conversation.id}
      initialMessages={initialMessages}
      models={models}
      initialModelId={initialModelId}
      userName={user.name}
    />
  );
}
