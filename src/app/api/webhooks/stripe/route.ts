import type Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe/client";
import { db } from "@/lib/db";
import type { SubscriptionPlan, SubscriptionStatus } from "@/types";

export const runtime = "nodejs";

const relevantEvents = new Set<Stripe.Event.Type>([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.payment_failed",
]);

function planFromPriceId(priceId: string | null | undefined): SubscriptionPlan {
  if (!priceId) return "STARTER";
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "PRO";
  if (priceId === process.env.STRIPE_TEAM_PRICE_ID) return "TEAM";
  return "STARTER";
}

function mapStatus(s: Stripe.Subscription.Status): SubscriptionStatus {
  switch (s) {
    case "active":
      return "ACTIVE";
    case "trialing":
      return "TRIALING";
    case "past_due":
      return "PAST_DUE";
    case "unpaid":
      return "UNPAID";
    default:
      return "CANCELED";
  }
}

async function syncSubscription(sub: Stripe.Subscription) {
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const priceId = sub.items.data[0]?.price.id ?? null;

  // Look up our user by stripeCustomerId OR by the metadata.userId we set on checkout.
  const metadataUserId = (sub.metadata?.userId as string | undefined) ?? null;
  const existing = await db.subscription.findFirst({
    where: {
      OR: [
        { stripeCustomerId: customerId },
        ...(metadataUserId ? [{ userId: metadataUserId }] : []),
      ],
    },
  });
  if (!existing) {
    console.warn("[stripe-webhook] no matching subscription row for", customerId);
    return;
  }

  await db.subscription.update({
    where: { userId: existing.userId },
    data: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: sub.id,
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
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("STRIPE_WEBHOOK_SECRET not configured", { status: 501 });
  }

  const signature = headers().get("stripe-signature");
  if (!signature) return new Response("Missing stripe-signature", { status: 400 });

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (!relevantEvents.has(event.type)) {
    return new Response("ignored", { status: 200 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription) break;
        const sub = await stripe.subscriptions.retrieve(
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription.id,
        );
        // Propagate userId metadata onto the subscription so future events
        // can find the right row even if customerId lookup fails.
        if (session.metadata?.userId) {
          sub.metadata = { ...sub.metadata, userId: session.metadata.userId };
        }
        await syncSubscription(sub);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await syncSubscription(event.data.object as Stripe.Subscription);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (typeof invoice.subscription === "string") {
          const sub = await stripe.subscriptions.retrieve(invoice.subscription);
          await syncSubscription(sub);
        }
        break;
      }
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("[stripe-webhook] handler error:", err);
    return new Response("Internal error", { status: 500 });
  }
}
