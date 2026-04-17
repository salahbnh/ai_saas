"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/config/plans";
import { DEFAULT_MODEL_ID, resolveModelForPlan } from "@/lib/ai/models";

/**
 * Creates a fresh conversation and redirects to it. Called from the sidebar
 * "New chat" button and the empty-state on /dashboard/chat.
 */
export async function createConversation(formData?: FormData) {
  const user = await requireUser();

  // Enforce monthly conversation quota for non-unlimited plans.
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });
  const plan = getPlan(subscription?.plan ?? "STARTER");
  if (plan.limits.conversationsPerMonth !== -1) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const count = await db.conversation.count({
      where: { userId: user.id, createdAt: { gte: startOfMonth } },
    });
    if (count >= plan.limits.conversationsPerMonth) {
      throw new Error(
        `You've hit the ${plan.limits.conversationsPerMonth}-conversation monthly limit. Upgrade your plan to continue.`,
      );
    }
  }

  const requestedModel = formData?.get("modelId")?.toString();
  const model = resolveModelForPlan(
    requestedModel ?? DEFAULT_MODEL_ID,
    subscription?.plan ?? "STARTER",
  );

  const conversation = await db.conversation.create({
    data: {
      userId: user.id,
      title: "New Conversation",
      model,
    },
  });

  revalidatePath("/dashboard/chat");
  redirect(`/dashboard/chat/${conversation.id}`);
}

const renameSchema = z.object({
  conversationId: z.string().min(1),
  title: z.string().trim().min(1).max(80),
});

export async function renameConversation(formData: FormData) {
  const user = await requireUser();
  const parsed = renameSchema.safeParse({
    conversationId: formData.get("conversationId"),
    title: formData.get("title"),
  });
  if (!parsed.success) throw new Error("Invalid input");

  const conv = await db.conversation.findUnique({
    where: { id: parsed.data.conversationId },
    select: { userId: true },
  });
  if (!conv || conv.userId !== user.id) throw new Error("Not found");

  await db.conversation.update({
    where: { id: parsed.data.conversationId },
    data: { title: parsed.data.title },
  });
  revalidatePath("/dashboard/chat");
}

/**
 * Deletes every message at or after the given messageId in a conversation.
 * Used by edit-and-resend: the UI truncates client-side, then calls this to
 * keep the DB in sync before re-streaming a new assistant reply.
 */
export async function truncateConversationAt(
  conversationId: string,
  messageId: string,
) {
  const user = await requireUser();
  const conv = await db.conversation.findUnique({
    where: { id: conversationId },
    select: { userId: true },
  });
  if (!conv || conv.userId !== user.id) throw new Error("Not found");

  const anchor = await db.message.findUnique({
    where: { id: messageId },
    select: { createdAt: true, conversationId: true },
  });
  if (!anchor || anchor.conversationId !== conversationId) {
    throw new Error("Message not found");
  }

  await db.message.deleteMany({
    where: {
      conversationId,
      createdAt: { gte: anchor.createdAt },
    },
  });
}

export async function deleteConversation(formData: FormData) {
  const user = await requireUser();
  const id = formData.get("conversationId")?.toString();
  if (!id) throw new Error("Invalid input");

  const conv = await db.conversation.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!conv || conv.userId !== user.id) throw new Error("Not found");

  await db.conversation.delete({ where: { id } });
  revalidatePath("/dashboard/chat");
  redirect("/dashboard/chat");
}
