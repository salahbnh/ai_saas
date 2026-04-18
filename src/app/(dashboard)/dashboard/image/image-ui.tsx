"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  Download,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const STYLES = [
  { id: "vivid", label: "Vivid" },
  { id: "natural", label: "Natural" },
] as const;

const SIZES = [
  { id: "1024x1024", label: "Square", aspect: "1:1" },
  { id: "1792x1024", label: "Landscape", aspect: "16:9" },
  { id: "1024x1792", label: "Portrait", aspect: "9:16" },
] as const;

const QUALITIES = [
  { id: "standard", label: "Standard" },
  { id: "hd", label: "HD" },
] as const;

type ImageRecord = {
  id: string;
  prompt: string;
  style: string;
  size: string;
  quality: string;
  imageUrl: string;
  createdAt: string;
};

type Props = {
  images: ImageRecord[];
  quota: { used: number; limit: number };
};

export function ImageUI({ images: initialImages, quota }: Props) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<string>("vivid");
  const [size, setSize] = useState<string>("1024x1024");
  const [quality, setQuality] = useState<string>("standard");
  const [userApiKey, setUserApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageRecord[]>(initialImages);
  const [lightboxImage, setLightboxImage] = useState<ImageRecord | null>(null);
  const [used, setUsed] = useState(quota.used);

  const quotaExhausted = quota.limit !== -1 && used >= quota.limit;

  const handleGenerate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!prompt.trim() || isLoading || quotaExhausted) return;

      setIsLoading(true);
      try {
        const res = await fetch("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            style,
            size,
            quality,
            ...(userApiKey.trim() ? { apiKey: userApiKey.trim() } : {}),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error ?? "Image generation failed");
          return;
        }

        const newImage: ImageRecord = {
          id: data.id,
          prompt: data.revisedPrompt ?? prompt,
          style,
          size,
          quality,
          imageUrl: data.imageUrl,
          createdAt: new Date().toISOString(),
        };

        setImages((prev) => [newImage, ...prev]);
        setUsed((prev) => prev + 1);
        setPrompt("");
        toast.success("Image generated!");
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [prompt, style, size, quality, isLoading, quotaExhausted],
  );

  const handleDownload = async (image: ImageRecord) => {
    try {
      const res = await fetch(image.imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nexusai-${image.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/25">
          <ImageIcon className="h-5 w-5 text-white" />
        </div>
        <h2 className="font-heading text-xl font-semibold">AI Image Generator</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Create stunning visuals from text prompts powered by DALL-E 3.
        </p>
        {quota.limit !== -1 && (
          <p className="mt-2 text-xs text-muted-foreground">
            {used} / {quota.limit} images used this month
          </p>
        )}
      </div>

      {/* Generation form */}
      <form
        onSubmit={handleGenerate}
        className="mx-auto mb-10 max-w-2xl space-y-4"
      >
        {/* Prompt */}
        <div>
          <label
            htmlFor="prompt"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Prompt *
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic city skyline at sunset with flying cars and neon lights"
            maxLength={1000}
            rows={3}
            required
            disabled={isLoading}
            className="resize-none"
          />
        </div>

        {/* API Key (optional) */}
        <div>
          <label
            htmlFor="apiKey"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            OpenAI API Key{" "}
            <span className="text-muted-foreground/60">(optional — use your own key)</span>
          </label>
          <Input
            id="apiKey"
            type="password"
            value={userApiKey}
            onChange={(e) => setUserApiKey(e.target.value)}
            placeholder="sk-..."
            disabled={isLoading}
            autoComplete="off"
          />
        </div>

        {/* Style, Size, Quality — row */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="style"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              Style
            </label>
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              disabled={isLoading}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
            >
              {STYLES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="size"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              Size
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              disabled={isLoading}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
            >
              {SIZES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} ({s.aspect})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="quality"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              Quality
            </label>
            <select
              id="quality"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              disabled={isLoading}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
            >
              {QUALITIES.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate button */}
        <Button
          type="submit"
          disabled={!prompt.trim() || isLoading || quotaExhausted}
          className="w-full cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : quotaExhausted ? (
            "Monthly quota reached — upgrade to continue"
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>
      </form>

      {/* Gallery */}
      {images.length > 0 ? (
        <div>
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Your Images ({images.length})
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Image */}
                <div
                  className={cn(
                    "relative overflow-hidden bg-muted",
                    img.size === "1792x1024" && "aspect-video",
                    img.size === "1024x1792" && "aspect-[9/16]",
                    img.size === "1024x1024" && "aspect-square",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.imageUrl}
                    alt={img.prompt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => setLightboxImage(img)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white/30 cursor-pointer"
                      aria-label="View full size"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(img)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white/30 cursor-pointer"
                      aria-label="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {img.prompt}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground/60">
                    <span className="capitalize">{img.style}</span>
                    <span>·</span>
                    <span>{img.quality.toUpperCase()}</span>
                    <span>·</span>
                    <span>
                      {SIZES.find((s) => s.id === img.size)?.label ?? img.size}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ImageIcon className="mb-3 h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              No images yet. Write a prompt and click Generate to get started.
            </p>
          </div>
        )
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20 cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage.imageUrl}
              alt={lightboxImage.prompt}
              className="max-h-[85vh] rounded-lg object-contain"
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="max-w-lg text-xs text-white/70">
                {lightboxImage.prompt}
              </p>
              <button
                type="button"
                onClick={() => handleDownload(lightboxImage)}
                className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs text-white transition-colors duration-150 hover:bg-white/20 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
