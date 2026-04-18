import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/config/plans";
import { imageRateLimit, checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const STYLES = ["vivid", "natural"] as const;
const SIZES = ["1024x1024", "1792x1024", "1024x1792"] as const;
const QUALITIES = ["standard", "hd"] as const;

const requestSchema = z.object({
  prompt: z.string().trim().min(1).max(1000),
  style: z.enum(STYLES).default("vivid"),
  size: z.enum(SIZES).default("1024x1024"),
  quality: z.enum(QUALITIES).default("standard"),
  apiKey: z.string().trim().min(1).optional(),
});

export async function POST(req: Request) {
  const user = await requireUser();

  // Rate limit — 5 images per minute
  const rl = await checkRateLimit(imageRateLimit, `image:${user.id}`);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down.", reset: rl.reset },
      { status: 429 },
    );
  }

  const parsed = requestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { prompt, style, size, quality, apiKey: userApiKey } = parsed.data;

  // Plan quota check
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });
  const plan = getPlan(subscription?.plan ?? "STARTER");
  if (plan.limits.imagesPerMonth !== -1) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const monthCount = await db.imageGeneration.count({
      where: {
        userId: user.id,
        createdAt: { gte: startOfMonth },
      },
    });
    if (monthCount >= plan.limits.imagesPerMonth) {
      return NextResponse.json(
        {
          error: "Monthly image quota reached. Upgrade your plan to continue.",
          quotaExceeded: true,
        },
        { status: 402 },
      );
    }
  }

  // Resolve API key: user-provided takes priority, then server env
  const apiKey = userApiKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "No API key available. Paste your OpenAI API key in the form, or ask the admin to configure OPENAI_API_KEY." },
      { status: 501 },
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size,
        quality,
        style,
        response_format: "url",
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const message =
        err?.error?.message ?? `OpenAI returned ${response.status}`;
      const isQuota = /quota|billing|exceeded|429|rate/i.test(message);
      const isAuth = /api key|invalid|401|403/i.test(message);
      const isSafety = /safety|content policy|rejected/i.test(message);
      console.error("[image] OpenAI error:", message);
      return NextResponse.json(
        {
          error: isSafety
            ? "Your prompt was rejected by the safety filter. Please try a different prompt."
            : isQuota
              ? "Image generation is rate-limited right now. Please try again shortly."
              : isAuth
                ? "The OpenAI API key is missing or invalid."
                : "Image generation failed. Please try again.",
        },
        { status: isSafety ? 400 : isQuota ? 429 : isAuth ? 401 : 502 },
      );
    }

    const data = await response.json();
    const imageUrl = data.data?.[0]?.url;
    const revisedPrompt = data.data?.[0]?.revised_prompt;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image was returned. Please try again." },
        { status: 502 },
      );
    }

    // Save to database for gallery + quota tracking
    const record = await db.imageGeneration.create({
      data: {
        userId: user.id,
        prompt: revisedPrompt ?? prompt,
        style,
        size,
        quality,
        imageUrl,
      },
    });

    return NextResponse.json({
      id: record.id,
      imageUrl,
      revisedPrompt,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[image] generation error:", err);
    return NextResponse.json(
      { error: `Image generation failed: ${msg}` },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const user = await requireUser();

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") ?? undefined;
  const take = 20;

  const images = await db.imageGeneration.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = images.length > take;
  const items = hasMore ? images.slice(0, take) : images;

  return NextResponse.json({
    images: items,
    nextCursor: hasMore ? items[items.length - 1]?.id : null,
  });
}
