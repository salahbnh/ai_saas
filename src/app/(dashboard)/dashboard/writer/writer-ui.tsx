"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Briefcase,
  Check,
  Copy,
  FileText,
  Loader2,
  Mail,
  Megaphone,
  Newspaper,
  RefreshCw,
  Share2,
  ShoppingBag,
  Sparkles,
  Square,
  Video,
} from "lucide-react";
import type { AIModel } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ApiKeyInput, useUserApiKey } from "@/components/dashboard/api-key-input";
import { ModelSelector } from "@/app/(dashboard)/dashboard/chat/model-selector";
import { MessageContent } from "@/app/(dashboard)/dashboard/chat/message-content";
import {
  templates,
  TONES,
  LENGTHS,
  type WriterTemplate,
  type Tone,
  type Length,
} from "./templates";

const ICONS: Record<string, typeof FileText> = {
  FileText,
  Mail,
  Share2,
  ShoppingBag,
  Briefcase,
  Video,
  Newspaper,
  Megaphone,
};

type Props = {
  models: AIModel[];
};

export function WriterUI({ models }: Props) {
  const [selected, setSelected] = useState<WriterTemplate | null>(null);

  if (!selected) {
    return <TemplatePicker onSelect={setSelected} />;
  }

  return (
    <GenerateView
      template={selected}
      models={models}
      onBack={() => setSelected(null)}
    />
  );
}

function TemplatePicker({
  onSelect,
}: {
  onSelect: (t: WriterTemplate) => void;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-md shadow-emerald-500/25">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <h2 className="font-heading text-xl font-semibold">AI Writer</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a template to generate polished content in seconds.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((t) => {
          const Icon = ICONS[t.icon] ?? FileText;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t)}
              className="group flex flex-col items-start gap-2 rounded-xl border bg-background p-4 text-left transition-all duration-150 hover:border-primary/40 hover:shadow-sm cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-150 group-hover:bg-primary/20">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {t.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GenerateView({
  template,
  models,
  onBack,
}: {
  template: WriterTemplate;
  models: AIModel[];
  onBack: () => void;
}) {
  const [modelId, setModelId] = useState(models[0]?.id ?? "");
  const [userApiKey, setUserApiKey] = useUserApiKey();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [length, setLength] = useState<Length>("medium");
  const [audience, setAudience] = useState("");
  const [instructions, setInstructions] = useState("");
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const body = useMemo(
    () => ({
      templateId: template.id,
      topic,
      tone,
      length,
      audience: audience || undefined,
      instructions: instructions || undefined,
      modelId,
      ...(userApiKey.trim() ? { apiKey: userApiKey.trim() } : {}),
    }),
    [template.id, topic, tone, length, audience, instructions, modelId, userApiKey],
  );

  const handleError = useCallback((err: Error) => {
    try {
      const parsed = JSON.parse(err.message);
      toast.error(parsed.error ?? "Something went wrong");
    } catch {
      toast.error(err.message || "Something went wrong");
    }
  }, []);

  const { completion, isLoading, complete, stop, setCompletion } =
    useCompletion({
      api: "/api/writer",
      body,
      onError: handleError,
    });

  // Auto-scroll output area as tokens stream in.
  useEffect(() => {
    const el = outputRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
    return () => cancelAnimationFrame(id);
  }, [completion]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;
    setCompletion("");
    complete(topic);
  };

  const handleRegenerate = () => {
    if (!topic.trim() || isLoading) return;
    setCompletion("");
    complete(topic);
  };

  const handleCopy = () => {
    if (!completion) return;
    navigator.clipboard.writeText(completion).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const Icon = ICONS[template.icon] ?? FileText;
  const hasOutput = completion.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background transition-colors duration-150 hover:bg-muted cursor-pointer"
          aria-label="Back to templates"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold">{template.name}</h2>
          <p className="text-xs text-muted-foreground">{template.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          {/* Model selector */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Model
            </label>
            <ModelSelector
              models={models}
              value={modelId}
              onChange={setModelId}
              disabled={isLoading}
            />
          </div>

          {/* API Key (BYOK) */}
          <ApiKeyInput
            value={userApiKey}
            onChange={setUserApiKey}
            disabled={isLoading}
          />

          {/* Topic */}
          <div>
            <label htmlFor="topic" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Topic / Subject *
            </label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={template.topicPlaceholder}
              maxLength={500}
              required
              disabled={isLoading}
            />
          </div>

          {/* Tone & Length — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tone" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Tone
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                disabled={isLoading}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="length" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Length
              </label>
              <select
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value as Length)}
                disabled={isLoading}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {LENGTHS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Audience */}
          <div>
            <label htmlFor="audience" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Target Audience <span className="text-muted-foreground/60">(optional)</span>
            </label>
            <Input
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., SaaS founders, Gen Z consumers"
              maxLength={200}
              disabled={isLoading}
            />
          </div>

          {/* Extra instructions */}
          <div>
            <label htmlFor="instructions" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Additional Instructions <span className="text-muted-foreground/60">(optional)</span>
            </label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g., Include a call-to-action, mention our free trial"
              maxLength={500}
              rows={2}
              disabled={isLoading}
              className="resize-none"
            />
          </div>

          {/* Generate button */}
          <Button
            type="submit"
            disabled={!topic.trim() || isLoading}
            className="w-full cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </form>

        {/* Output */}
        <div className="flex flex-col rounded-xl border bg-background">
          {/* Output header */}
          <div className="flex items-center justify-between border-b px-4 py-2.5">
            <span className="text-xs font-medium text-muted-foreground">
              {isLoading ? "Generating…" : hasOutput ? "Output" : "Preview"}
            </span>
            {hasOutput && !isLoading && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  Copy
                </button>
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  Regenerate
                </button>
              </div>
            )}
            {isLoading && (
              <button
                type="button"
                onClick={stop}
                className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground cursor-pointer"
              >
                <Square className="h-3 w-3" />
                Stop
              </button>
            )}
          </div>

          {/* Output body */}
          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto p-4"
            style={{ minHeight: 320, maxHeight: 600 }}
          >
            {hasOutput ? (
              <MessageContent content={completion} />
            ) : (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <Sparkles className="mx-auto mb-2 h-6 w-6 text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground">
                    Fill in the form and click Generate to see your content here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
