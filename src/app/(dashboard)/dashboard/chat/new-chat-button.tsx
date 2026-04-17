"use client";

import { useTransition } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createConversation } from "./actions";

export function NewChatButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => {
        startTransition(async () => {
          await createConversation(fd);
        });
      }}
    >
      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="cursor-pointer"
      >
        {isPending ? (
          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
        ) : (
          <Plus className="mr-1.5 h-4 w-4" />
        )}
        New chat
      </Button>
    </form>
  );
}
