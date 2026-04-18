"use client";

import { Copy, FileText, Globe, Link2, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToolLockedBanner } from "@/components/dashboard/tool-locked";

const INPUT_MODES = [
  { id: "text", label: "Paste Text", icon: FileText },
  { id: "url", label: "URL", icon: Globe },
  { id: "pdf", label: "Upload PDF", icon: Upload },
];

const LENGTHS = [
  { id: "brief", label: "Brief (2-3 sentences)" },
  { id: "detailed", label: "Detailed (paragraph)" },
  { id: "executive", label: "Executive Summary" },
  { id: "bullet", label: "Bullet Points" },
];

export default function SummarizerPage() {
  return (
    <div>
      <ToolLockedBanner name="AI Summarizer" />

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500 to-zinc-600 shadow-md shadow-slate-500/25">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-heading text-xl font-semibold">AI Summarizer</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Summarize articles, PDFs, and documents into structured key points.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Input */}
          <div className="space-y-4">
            {/* Input mode tabs */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Input Method
              </label>
              <div className="flex gap-2">
                {INPUT_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    disabled
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium ${
                      mode.id === "text"
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "bg-background text-muted-foreground"
                    }`}
                  >
                    <mode.icon className="h-3.5 w-3.5" />
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text input */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Content *
              </label>
              <Textarea
                disabled
                placeholder="Paste the article, document, or text you want to summarize..."
                rows={10}
                className="resize-none"
              />
            </div>

            {/* URL input (shown as alternative) */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Or enter a URL
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    disabled
                    placeholder="https://example.com/article"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            {/* Summary length */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Summary Format
              </label>
              <select
                disabled
                defaultValue="detailed"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                {LENGTHS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <Button disabled className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Summarize
            </Button>
          </div>

          {/* Output */}
          <div className="flex flex-col rounded-xl border bg-background">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Summary</span>
              <button type="button" disabled className="flex items-center gap-1 text-xs text-muted-foreground">
                <Copy className="h-3 w-3" />
                Copy
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center p-6" style={{ minHeight: 400 }}>
              <div className="text-center">
                <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground">
                  Your summary with key points and action items will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
