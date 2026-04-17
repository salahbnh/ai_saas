"use server";

import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe/client";

/**
 * Exports all user data as a JSON-serializable object.
 * GDPR Article 20 — right to data portability.
 */
export async function exportUserData() {
  const user = await requireUser();

  const [subscription, conversations, documents, apiKeys, feedback] =
    await Promise.all([
      db.subscription.findUnique({ where: { userId: user.id } }),
      db.conversation.findMany({
        where: { userId: user.id },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
            select: {
              role: true,
              content: true,
              tokenCount: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      }),
      db.document.findMany({
        where: { userId: user.id },
        select: {
          name: true,
          fileType: true,
          fileSize: true,
          status: true,
          createdAt: true,
        },
      }),
      db.apiKey.findMany({
        where: { userId: user.id },
        select: { name: true, lastUsed: true, createdAt: true },
      }),
      db.feedback.findMany({
        where: { userId: user.id },
        select: {
          type: true,
          status: true,
          subject: true,
          message: true,
          createdAt: true,
        },
      }),
    ]);

  return {
    exportedAt: new Date().toISOString(),
    account: {
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    },
    subscription: subscription
      ? {
          plan: subscription.plan,
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
        }
      : null,
    conversations: conversations.map((c) => ({
      title: c.title,
      model: c.model,
      createdAt: c.createdAt.toISOString(),
      messages: c.messages.map((m) => ({
        role: m.role,
        content: m.content,
        tokenCount: m.tokenCount,
        createdAt: m.createdAt.toISOString(),
      })),
    })),
    documents: documents.map((d) => ({
      name: d.name,
      fileType: d.fileType,
      fileSize: d.fileSize,
      status: d.status,
      createdAt: d.createdAt.toISOString(),
    })),
    apiKeys: apiKeys.map((k) => ({
      name: k.name,
      lastUsed: k.lastUsed?.toISOString() ?? null,
      createdAt: k.createdAt.toISOString(),
    })),
    feedback: feedback.map((f) => ({
      type: f.type,
      status: f.status,
      subject: f.subject,
      message: f.message,
      createdAt: f.createdAt.toISOString(),
    })),
  };
}

/**
 * Returns aggregate counts for the data summary card.
 */
export async function getUserDataSummary() {
  const user = await requireUser();

  const [conversations, messages, documents, apiKeys] = await Promise.all([
    db.conversation.count({ where: { userId: user.id } }),
    db.message.count({ where: { conversation: { userId: user.id } } }),
    db.document.count({ where: { userId: user.id } }),
    db.apiKey.count({ where: { userId: user.id } }),
  ]);

  return { conversations, messages, documents, apiKeys };
}

/**
 * Permanently deletes the user's account.
 *
 * Flow:
 *   1. Cancel any Stripe subscription immediately (not at period end).
 *   2. Delete the user row from our DB (cascades all related data).
 *   3. Delete the Clerk user (triggers sign-out on all sessions).
 *   4. Redirect to the home page.
 */
export async function deleteAccount() {
  const user = await requireUser();

  // 1. Cancel Stripe subscription if one exists.
  const sub = await db.subscription.findUnique({
    where: { userId: user.id },
  });
  if (sub?.stripeSubscriptionId) {
    await stripe.subscriptions
      .cancel(sub.stripeSubscriptionId)
      .catch((e) => console.error("[delete-account] stripe cancel:", e));
  }

  // 2. Delete DB user (cascades everything via onDelete: Cascade).
  await db.user.delete({ where: { id: user.id } });

  // 3. Delete Clerk user (this signs out all sessions).
  await clerkClient()
    .users.deleteUser(user.clerkId)
    .catch((e) => console.error("[delete-account] clerk delete:", e));

  // 4. Redirect to home.
  redirect("/");
}
