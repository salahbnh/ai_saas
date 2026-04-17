"use client";

import { Check, ChevronDown, Sparkles, Lock } from "lucide-react";
import { useState } from "react";
import type { AIModel } from "@/types";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ModelSelector({
  models,
  value,
  onChange,
  disabled,
}: {
  models: AIModel[];
  value: string;
  onChange: (modelId: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const current = models.find((m) => m.id === value) ?? models[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled || models.length <= 1}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs font-medium transition-colors duration-150",
            !disabled && "hover:bg-muted cursor-pointer",
            disabled && "opacity-60 cursor-not-allowed",
          )}
        >
          <Sparkles className="h-3 w-3 text-primary" />
          {current?.name ?? "Select model"}
          {models.length > 1 && <ChevronDown className="h-3 w-3 opacity-60" />}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-1">
        <ul className="space-y-0.5">
          {models.map((m) => {
            const selected = m.id === value;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(m.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors duration-150 cursor-pointer",
                    selected ? "bg-primary/10" : "hover:bg-muted",
                  )}
                >
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                    {selected ? (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    ) : m.byok ? (
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium">{m.name}</p>
                    {m.description && (
                      <p className="text-[10px] text-muted-foreground">
                        {m.description}
                      </p>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
