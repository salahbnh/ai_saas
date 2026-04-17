"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, "Name must be 100 characters or fewer")
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
  useCase: z
    .string()
    .trim()
    .max(200, "Use case must be 200 characters or fewer")
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
  imageUrl: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v && v.length > 0 ? v : null)),
});

export type ProfileActionState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<"name" | "useCase" | "imageUrl", string>>;
};

export async function updateProfile(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await requireUser();

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    useCase: formData.get("useCase"),
    imageUrl: formData.get("imageUrl"),
  });

  if (!parsed.success) {
    const errors: ProfileActionState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ProfileActionState["errors"]>;
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
        imageUrl: parsed.data.imageUrl,
      },
    });
  } catch (err) {
    console.error("[updateProfile]", err);
    return { ok: false, message: "Could not save profile. Please try again." };
  }

  revalidatePath("/dashboard/settings/profile");
  revalidatePath("/dashboard");
  return { ok: true, message: "Profile updated" };
}
