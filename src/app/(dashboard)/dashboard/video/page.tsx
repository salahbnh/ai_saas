"use client";

import { Download, Play, Sparkles, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolLockedBanner } from "@/components/dashboard/tool-locked";

const ASPECT_RATIOS = [
  { id: "16:9", label: "Landscape (16:9)" },
  { id: "9:16", label: "Portrait (9:16)" },
  { id: "1:1", label: "Square (1:1)" },
];

const STYLES = [
  { id: "cinematic", label: "Cinematic" },
  { id: "realistic", label: "Realistic" },
  { id: "cartoon", label: "Cartoon" },
  { id: "3d", label: "3D Render" },
  { id: "anime", label: "Anime" },
  { id: "watercolor", label: "Watercolor" },
];

const DURATIONS = [
  { id: "5", label: "5 seconds" },
  { id: "10", label: "10 seconds" },
  { id: "15", label: "15 seconds" },
  { id: "30", label: "30 seconds" },
];

export default function VideoPage() {
  return (
    <div>
      <ToolLockedBanner name="AI Video" />

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-amber-500/25">
            <Video className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-heading text-xl font-semibold">AI Video Generator</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate short videos from text prompts. Perfect for social content and ads.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Form */}
          <div className="space-y-4">
            {/* Prompt */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Prompt *
              </label>
              <Textarea
                disabled
                placeholder="e.g., A golden retriever running through a field of sunflowers at sunset, slow motion, cinematic lighting"
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Style */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    disabled
                    className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                      s.id === "cinematic"
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "bg-background text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio & Duration */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Aspect Ratio
                </label>
                <select
                  disabled
                  defaultValue="16:9"
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                >
                  {ASPECT_RATIOS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Duration
                </label>
                <select
                  disabled
                  defaultValue="5"
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                >
                  {DURATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Negative prompt */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Negative Prompt <span className="text-muted-foreground/60">(optional)</span>
              </label>
              <Textarea
                disabled
                placeholder="e.g., blurry, low quality, distorted faces, text watermark"
                rows={2}
                className="resize-none"
              />
            </div>

            <Button disabled className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Video
            </Button>
          </div>

          {/* Preview */}
          <div className="flex flex-col rounded-xl border bg-background">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Preview</span>
              <button type="button" disabled className="flex items-center gap-1 text-xs text-muted-foreground">
                <Download className="h-3 w-3" />
                Download
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center bg-muted/30 p-6" style={{ minHeight: 350 }}>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <Play className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Your generated video will appear here.
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground/50">
                  Typical generation time: 30-120 seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
