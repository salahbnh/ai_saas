"use client";

import { Download, Mic, Pause, Play, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolLockedBanner } from "@/components/dashboard/tool-locked";

const VOICES = [
  { id: "alloy", label: "Alloy", desc: "Neutral, balanced" },
  { id: "echo", label: "Echo", desc: "Warm, conversational" },
  { id: "fable", label: "Fable", desc: "Expressive, storytelling" },
  { id: "onyx", label: "Onyx", desc: "Deep, authoritative" },
  { id: "nova", label: "Nova", desc: "Bright, energetic" },
  { id: "shimmer", label: "Shimmer", desc: "Soft, calming" },
];

const MODES = [
  { id: "tts", label: "Text to Speech", icon: Mic },
  { id: "stt", label: "Speech to Text", icon: Upload },
];

export default function VoicePage() {
  return (
    <div>
      <ToolLockedBanner name="AI Voice" />

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-md shadow-pink-500/25">
            <Mic className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-heading text-xl font-semibold">AI Voice</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Convert text to natural speech or transcribe audio to text.
          </p>
        </div>

        {/* Mode tabs */}
        <div className="mx-auto mb-6 flex max-w-2xl justify-center gap-2">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              disabled
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium ${
                mode.id === "tts"
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "bg-background text-muted-foreground"
              }`}
            >
              <mode.icon className="h-4 w-4" />
              {mode.label}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-2xl space-y-4">
          {/* Text input */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Text *
            </label>
            <Textarea
              disabled
              placeholder="Enter the text you want to convert to speech..."
              rows={5}
              className="resize-none"
            />
            <p className="mt-1 text-right text-[10px] text-muted-foreground/50">
              0 / 4,096 characters
            </p>
          </div>

          {/* Voice selector */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Voice
            </label>
            <div className="grid grid-cols-3 gap-2">
              {VOICES.map((voice) => (
                <button
                  key={voice.id}
                  type="button"
                  disabled
                  className={`rounded-lg border px-3 py-2 text-left ${
                    voice.id === "alloy"
                      ? "border-primary/40 bg-primary/10"
                      : "bg-background"
                  }`}
                >
                  <p className="text-xs font-medium">{voice.label}</p>
                  <p className="text-[10px] text-muted-foreground">{voice.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Speed & Format */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Speed
              </label>
              <select
                disabled
                defaultValue="1.0"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="0.5">0.5x (Slow)</option>
                <option value="0.75">0.75x</option>
                <option value="1.0">1.0x (Normal)</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x (Fast)</option>
                <option value="2.0">2.0x</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Format
              </label>
              <select
                disabled
                defaultValue="mp3"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="mp3">MP3</option>
                <option value="wav">WAV</option>
                <option value="opus">Opus</option>
                <option value="flac">FLAC</option>
              </select>
            </div>
          </div>

          <Button disabled className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Speech
          </Button>

          {/* Audio player placeholder */}
          <div className="rounded-xl border bg-background p-4">
            <div className="flex items-center gap-3">
              <button type="button" disabled className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Play className="h-4 w-4 text-primary" />
              </button>
              <div className="flex-1">
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div className="h-1.5 w-0 rounded-full bg-primary" />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                  <span>0:00</span>
                  <span>0:00</span>
                </div>
              </div>
              <button type="button" disabled className="text-muted-foreground">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
