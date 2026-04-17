"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Loader2, MessageSquare, FileText, Code2, Sparkles, Briefcase, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { completeOnboarding, type OnboardingActionState } from "./actions";

type Props = {
  defaults: { name: string | null };
};

const useCases = [
  { id: "customer-support", label: "Customer support", icon: MessageSquare },
  { id: "content-generation", label: "Content generation", icon: FileText },
  { id: "code-assistant", label: "Code assistant", icon: Code2 },
  { id: "research", label: "Research & analysis", icon: Sparkles },
  { id: "business-ops", label: "Business operations", icon: Briefcase },
  { id: "learning", label: "Learning & education", icon: GraduationCap },
];

const initialState: OnboardingActionState = { ok: false };

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className="w-full cursor-pointer"
      size="lg"
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Setting up..." : "Continue to dashboard"}
    </Button>
  );
}

export function OnboardingForm({ defaults }: Props) {
  const [state, action] = useFormState(completeOnboarding, initialState);
  const [useCase, setUseCase] = useState<string>("");

  useEffect(() => {
    if (!state.ok && state.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="name">Your name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Alex Kim"
          defaultValue={defaults.name ?? ""}
          autoFocus
          required
        />
        {state.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>What will you use NexusAI for?</Label>
        <input type="hidden" name="useCase" value={useCase} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {useCases.map((c) => {
            const active = useCase === c.label;
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => setUseCase(c.label)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border p-3 text-xs font-medium transition-colors duration-150 cursor-pointer",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:bg-muted",
                )}
              >
                <c.icon className="h-4 w-4" />
                {c.label}
              </button>
            );
          })}
        </div>
        {state.errors?.useCase && (
          <p className="text-sm text-destructive">{state.errors.useCase}</p>
        )}
      </div>

      <SubmitButton disabled={!useCase} />
    </form>
  );
}
