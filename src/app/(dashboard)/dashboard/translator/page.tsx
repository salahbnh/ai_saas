"use client";

import { ArrowLeftRight, Copy, Languages, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolLockedBanner } from "@/components/dashboard/tool-locked";

const POPULAR_LANGS = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese",
  "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian",
  "Dutch", "Swedish", "Turkish", "Polish",
];

const TONES = ["Formal", "Casual", "Technical", "Literary"];

export default function TranslatorPage() {
  return (
    <div>
      <ToolLockedBanner name="AI Translator" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-500/25">
            <Languages className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-heading text-xl font-semibold">AI Translator</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Translate between 100+ languages with tone and formality controls.
          </p>
        </div>

        {/* Language selectors */}
        <div className="mx-auto mb-6 flex max-w-3xl items-center gap-3">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              From
            </label>
            <select
              disabled
              defaultValue="English"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="">Auto-detect</option>
              {POPULAR_LANGS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            disabled
            className="mt-5 flex h-9 w-9 items-center justify-center rounded-lg border bg-background"
          >
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          </button>

          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              To
            </label>
            <select
              disabled
              defaultValue="Spanish"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            >
              {POPULAR_LANGS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tone selector */}
        <div className="mx-auto mb-6 max-w-3xl">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Tone
          </label>
          <div className="flex gap-2">
            {TONES.map((tone) => (
              <button
                key={tone}
                type="button"
                disabled
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                  tone === "Formal"
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "bg-background text-muted-foreground"
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Translation panels */}
        <div className="mx-auto grid max-w-3xl gap-4 lg:grid-cols-2">
          {/* Source */}
          <div className="flex flex-col rounded-xl border bg-background">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Source</span>
              <span className="text-[10px] text-muted-foreground/50">0 / 5,000</span>
            </div>
            <Textarea
              disabled
              placeholder="Enter text to translate..."
              rows={8}
              className="flex-1 resize-none border-0 focus-visible:ring-0"
            />
            <div className="flex items-center justify-between border-t px-4 py-2">
              <button type="button" disabled className="text-muted-foreground">
                <Volume2 className="h-4 w-4" />
              </button>
              <Button disabled size="sm">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Translate
              </Button>
            </div>
          </div>

          {/* Target */}
          <div className="flex flex-col rounded-xl border bg-background">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Translation</span>
              <button type="button" disabled className="flex items-center gap-1 text-xs text-muted-foreground">
                <Copy className="h-3 w-3" />
                Copy
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center p-6" style={{ minHeight: 200 }}>
              <div className="text-center">
                <Languages className="mx-auto mb-2 h-6 w-6 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground">
                  Translation will appear here.
                </p>
              </div>
            </div>
            <div className="flex items-center border-t px-4 py-2">
              <button type="button" disabled className="text-muted-foreground">
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
