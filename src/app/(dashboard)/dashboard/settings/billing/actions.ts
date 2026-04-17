"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { plans } from "@/config/plans";
import type { SubscriptionPlan } from "@/types";
import {
  createCheckoutSession,
  createBillingPortalSession,
  createStripeCustomer,
} from "@/lib/stripe/helpers";

/**
 * Starts a Stripe Checkout Session for upgrading from STARTER → paid plan.
 * If the user already has a paid subscription, redirects to the Billing Portal
 * instead so Stripe handles plan changes, proration, and cancellation.
 */
export async function startCheckout(formData: FormData) {
  const plan = formData.get("plan") as SubscriptionPlan | null;
  if (!plan || plan === "STARTER") {
    throw new Error("Invalid plan");
  }

  const priceId = plans[plan].stripePriceId;
  if (!priceId) {
    throw new Error(`Missing STRIPE_${plan}_PRICE_ID env var`);
  }

  const user = await requireUser();
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });

  // Ensure a Stripe customer exists for this user.
  let customerId = subscription?.stripeCustomerId ?? null;
  if (!customerId) {
    const customer = await createStripeCustomer({
      email: user.email,
      name: user.name ?? undefined,
      userId: user.id,
    });
    customerId = customer.id;
    await db.subscription.upsert({
      where: { userId: user.id },
      update: { stripeCustomerId: customerId },
      create: { userId: user.id, stripeCustomerId: customerId },
    });
  }

  // If they already have an active paid subscription, route through the portal
  // so Stripe can handle the plan switch cleanly.
  if (subscription?.stripeSubscriptionId) {
    const portal = await createBillingPortalSession({ customerId });
    redirect(portal.url);
  }

  const session = await createCheckoutSession({
    customerId,
    priceId,
    userId: user.id,
  });

  if (!session.url) throw new Error("Stripe returned no checkout URL");
  redirect(session.url);
}

/**
 * Opens the Stripe-hosted Billing Portal where users can change card,
 * view invoices, switch plans, or cancel.
 */
export async function openBillingPortal() {
  const user = await requireUser();
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });

  if (!subscription?.stripeCustomerId) {
    throw new Error("No Stripe customer on file — upgrade to a paid plan first");
  }

  const portal = await createBillingPortalSession({
    customerId: subscription.stripeCustomerId,
  });
  redirect(portal.url);
}
