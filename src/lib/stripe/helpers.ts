import { stripe } from "./client";
import { appConfig } from "@/config/app";

export async function createCheckoutSession({
  customerId,
  priceId,
  userId,
}: {
  customerId: string;
  priceId: string;
  userId: string;
}) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appConfig.url}/dashboard/settings/billing?success=true`,
    cancel_url: `${appConfig.url}/dashboard/settings/billing?canceled=true`,
    metadata: { userId },
  });
}

export async function createBillingPortalSession({
  customerId,
}: {
  customerId: string;
}) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appConfig.url}/dashboard/settings/billing`,
  });
}

export async function createStripeCustomer({
  email,
  name,
  userId,
}: {
  email: string;
  name?: string;
  userId: string;
}) {
  return stripe.customers.create({
    email,
    name: name ?? undefined,
    metadata: { userId },
  });
}

export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}

export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}
