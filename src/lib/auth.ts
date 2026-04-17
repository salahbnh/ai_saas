import { auth, clerkClient } from "@clerk/nextjs/server";
import type { User } from "@prisma/client";
import { db } from "@/lib/db";

/**
 * Returns the DB User for the currently signed-in Clerk user.
 *
 * If the user doesn't exist in the DB yet (e.g. webhook hasn't fired, or we're
 * running locally without a configured webhook), fetch the Clerk profile and
 * create the row on-demand so the rest of the app can always trust a user
 * record exists.
 *
 * Returns null when no one is signed in.
 */
export async function getCurrentUser(): Promise<User | null> {
  const { userId } = auth();
  if (!userId) return null;

  const existing = await db.user.findUnique({ where: { clerkId: userId } });
  if (existing) return existing;

  // Fallback: webhook hasn't synced yet — hydrate from Clerk.
  const clerkUser = await clerkClient().users.getUser(userId);
  const email = clerkUser.emailAddresses.find(
    (e) => e.id === clerkUser.primaryEmailAddressId,
  )?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("Clerk user has no email address");
  }

  const name =
    [clerkUser.firstName, clerkUser.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() || null;

  return db.user.create({
    data: {
      clerkId: userId,
      email,
      name,
      imageUrl: clerkUser.imageUrl ?? null,
      subscription: { create: {} }, // defaults: STARTER / ACTIVE
    },
  });
}

/**
 * Variant of getCurrentUser() that throws if no user is signed in. Use inside
 * protected routes where the middleware guarantees auth.
 */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
