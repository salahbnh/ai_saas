import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  // Dev-friendly: if the webhook secret isn't configured yet, don't crash — the
  // app falls back to on-demand user creation via getOrCreateUser().
  if (!secret) {
    return new Response("CLERK_WEBHOOK_SECRET not configured", { status: 501 });
  }

  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(secret);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("[clerk-webhook] signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (evt.type) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name, image_url } =
          evt.data;
        const email = email_addresses[0]?.email_address;
        if (!email) return new Response("No email on user", { status: 400 });

        const name =
          [first_name, last_name].filter(Boolean).join(" ").trim() || null;

        await db.user.upsert({
          where: { clerkId: id },
          update: { email, name, imageUrl: image_url ?? null },
          create: {
            clerkId: id,
            email,
            name,
            imageUrl: image_url ?? null,
            subscription: { create: {} }, // defaults: STARTER / ACTIVE
          },
        });
        break;
      }

      case "user.updated": {
        const { id, email_addresses, first_name, last_name, image_url } =
          evt.data;
        const email = email_addresses[0]?.email_address;
        const name =
          [first_name, last_name].filter(Boolean).join(" ").trim() || null;

        await db.user.update({
          where: { clerkId: id },
          data: {
            ...(email ? { email } : {}),
            name,
            imageUrl: image_url ?? null,
          },
        });
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;
        if (id) {
          // Cancel any active Stripe subscription before cascading the DB delete
          // so the customer isn't billed for a deleted account.
          const sub = await db.subscription
            .findFirst({ where: { user: { clerkId: id } } })
            .catch(() => null);
          if (sub?.stripeSubscriptionId) {
            await stripe.subscriptions
              .cancel(sub.stripeSubscriptionId)
              .catch((e) =>
                console.error("[clerk-webhook] stripe cancel failed:", e),
              );
          }
          await db.user
            .delete({ where: { clerkId: id } })
            .catch(() => undefined); // idempotent
        }
        break;
      }
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("[clerk-webhook] handler error:", err);
    return new Response("Internal error", { status: 500 });
  }
}
