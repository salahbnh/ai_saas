import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe/client";
import type { SubscriptionPlan, SubscriptionStatus } from "@/types";

function planFromPriceId(priceId: string | null | undefined): SubscriptionPlan {
  if (!priceId) return "STARTER";
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "PRO";
  if (priceId === process.env.STRIPE_TEAM_PRICE_ID) return "TEAM";
  return "STARTER";
}

function mapStatus(s: string): SubscriptionStatus {
  switch (s) {
    case "active": return "ACTIVE";
    case "trialing": return "TRIALING";
    case "past_due": return "PAST_DUE";
    case "unpaid": return "UNPAID";
    default: return "CANCELED";
  }
}

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const subscription = await db.subscription.findUnique({ where: { userId } });
  if (!subscription?.stripeSubscriptionId) {
    return NextResponse.json({ error: "No active subscription found" }, { status: 404 });
  }

  const sub = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);
  const priceId = sub.items.data[0]?.price.id ?? null;

  await db.subscription.update({
    where: { userId },
    data: {
      stripePriceId: priceId,
      plan: planFromPriceId(priceId),
      status: mapStatus(sub.status),
      currentPeriodStart: sub.current_period_start
        ? new Date(sub.current_period_start * 1000)
        : null,
      currentPeriodEnd: sub.current_period_end
        ? new Date(sub.current_period_end * 1000)
        : null,
      cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
    },
  });

  return NextResponse.json({ ok: true, plan: planFromPriceId(priceId) });
}
