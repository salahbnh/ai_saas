import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/config/plans";
import { ImageUI } from "./image-ui";

export default async function ImagePage() {
  const user = await requireUser();
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });
  const plan = getPlan(subscription?.plan ?? "STARTER");

  // Fetch current month usage for quota display
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const usedThisMonth = await db.imageGeneration.count({
    where: {
      userId: user.id,
      createdAt: { gte: startOfMonth },
    },
  });

  // Fetch recent images for the gallery
  const recentImages = await db.imageGeneration.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <ImageUI
      images={recentImages.map((img) => ({
        id: img.id,
        prompt: img.prompt,
        style: img.style,
        size: img.size,
        quality: img.quality,
        imageUrl: img.imageUrl,
        createdAt: img.createdAt.toISOString(),
      }))}
      quota={{ used: usedThisMonth, limit: plan.limits.imagesPerMonth }}
    />
  );
}
