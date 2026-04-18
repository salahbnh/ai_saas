"use client";

import { Code2, Copy, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolLockedBanner } from "@/components/dashboard/tool-locked";

const LANGUAGES = [
  "TypeScript", "JavaScript", "Python", "Go", "Rust", "Java", "C++", "C#",
  "Ruby", "PHP", "Swift", "Kotlin", "Scala", "SQL", "Bash",
];

const MODES = [
  { id: "generate", label: "Generate Code" },
  { id: "debug", label: "Debug & Fix" },
  { id: "explain", label: "Explain Code" },
  { id: "refactor", label: "Refactor" },
];

export default function CodePage() {
  return (
    <div>
      <ToolLockedBanner name="AI Code" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-lime-600 shadow-md shadow-green-500/25">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-heading text-xl font-semibold">AI Code Generator</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate, debug, and explain code in 50+ programming languages.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input panel */}
          <div className="space-y-4">
            {/* Mode selector */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                {MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    disabled
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors duration-150 ${
                      mode.id === "generate"
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "bg-background text-muted-foreground"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Language
              </label>
              <select
                disabled
                defaultValue="TypeScript"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                {LANGUAGES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Prompt */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Describe what you need *
              </label>
              <Textarea
                disabled
                placeholder="e.g., Create a REST API with Express that handles CRUD operations for a todo list with authentication"
                rows={5}
                className="resize-none"
              />
            </div>

            {/* Context */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Context / Existing Code <span className="text-muted-foreground/60">(optional)</span>
              </label>
              <Textarea
                disabled
                placeholder="Paste existing code here for debugging or refactoring..."
                rows={3}
                className="resize-none font-mono text-xs"
              />
            </div>

            <Button disabled className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Code
            </Button>
          </div>

          {/* Output panel */}
          <div className="flex flex-col rounded-xl border bg-background">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Output</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled
                  className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground"
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </button>
                <button
                  type="button"
                  disabled
                  className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground"
                >
                  <Play className="h-3 w-3" />
                  Run
                </button>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center p-6" style={{ minHeight: 400 }}>
              <div className="text-center">
                <Code2 className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground">
                  Generated code will appear here with syntax highlighting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
