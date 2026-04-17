"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateProfile, type ProfileActionState } from "./actions";

type Props = {
  defaults: {
    name: string | null;
    email: string;
    imageUrl: string | null;
    useCase: string | null;
  };
};

const initialState: ProfileActionState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="cursor-pointer">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Saving..." : "Save changes"}
    </Button>
  );
}

export function ProfileForm({ defaults }: Props) {
  const [state, action] = useFormState(updateProfile, initialState);

  useEffect(() => {
    if (state.ok && state.message) toast.success(state.message);
    else if (!state.ok && state.message) toast.error(state.message);
  }, [state]);

  const initials =
    defaults.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ||
    defaults.email[0]?.toUpperCase() ||
    "U";

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={defaults.imageUrl ?? undefined} alt={defaults.name ?? defaults.email} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="imageUrl">Avatar URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://example.com/avatar.png"
            defaultValue={defaults.imageUrl ?? ""}
          />
          {state.errors?.imageUrl && (
            <p className="text-sm text-destructive">{state.errors.imageUrl}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Display name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            defaultValue={defaults.name ?? ""}
          />
          {state.errors?.name && (
            <p className="text-sm text-destructive">{state.errors.name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={defaults.email}
            readOnly
            disabled
            className="cursor-not-allowed bg-muted/50"
          />
          <p className="text-[11px] text-muted-foreground">
            Managed by your sign-in provider
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="useCase">What are you building?</Label>
        <Input
          id="useCase"
          name="useCase"
          placeholder="e.g. Customer support bot, content generation, research"
          defaultValue={defaults.useCase ?? ""}
        />
        {state.errors?.useCase && (
          <p className="text-sm text-destructive">{state.errors.useCase}</p>
        )}
        <p className="text-[11px] text-muted-foreground">
          Helps us tailor recommendations. Leave blank to keep default.
        </p>
      </div>

      <div className="flex justify-end border-t pt-5">
        <SubmitButton />
      </div>
    </form>
  );
}
