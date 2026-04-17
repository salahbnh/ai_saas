"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

const onboardingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name must be 100 characters or fewer"),
  useCase: z
    .string()
    .trim()
    .min(1, "Select what you'd like to build")
    .max(200),
});

export type OnboardingActionState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<"name" | "useCase", string>>;
};

export async function completeOnboarding(
  _prev: OnboardingActionState,
  formData: FormData,
): Promise<OnboardingActionState> {
  const user = await requireUser();

  const parsed = onboardingSchema.safeParse({
    name: formData.get("name"),
    useCase: formData.get("useCase"),
  });

  if (!parsed.success) {
    const errors: OnboardingActionState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<OnboardingActionState["errors"]>;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "Please fix the errors below", errors };
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        name: parsed.data.name,
        useCase: parsed.data.useCase,
        onboarded: true,
      },
    });
  } catch (err) {
    console.error("[completeOnboarding]", err);
    return { ok: false, message: "Could not save. Please try again." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
