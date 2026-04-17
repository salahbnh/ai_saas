"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2, MessageSquare, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createConversation,
  deleteConversation,
  renameConversation,
} from "./actions";

type Conversation = {
  id: string;
  title: string;
  updatedAt: Date;
};

export function ConversationList({
  conversations,
}: {
  conversations: Conversation[];
}) {
  const pathname = usePathname();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, startCreating] = useTransition();

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r bg-background lg:flex">
      <div className="flex items-center justify-between border-b p-3">
        <h2 className="font-heading text-sm font-semibold">Conversations</h2>
        <form
          action={(fd) => {
            startCreating(async () => {
              await createConversation(fd);
            });
          }}
        >
          <Button
            type="submit"
            size="sm"
            variant="outline"
            disabled={isCreating}
            className="cursor-pointer gap-1.5"
          >
            {isCreating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
            New
          </Button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              No conversations yet. Click <span className="font-medium">New</span>{" "}
              to start chatting.
            </p>
          </div>
        ) : (
          <ul className="space-y-0.5">
            {isCreating && (
              <li className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
                <span className="text-xs">Creating…</span>
              </li>
            )}
            {conversations.map((conv) => {
              const isActive = pathname === `/dashboard/chat/${conv.id}`;
              const isEditing = editingId === conv.id;

              return (
                <li key={conv.id}>
                  {isEditing ? (
                    <RenameForm
                      conversationId={conv.id}
                      initialTitle={conv.title}
                      onClose={() => setEditingId(null)}
                    />
                  ) : (
                    <div
                      className={cn(
                        "group relative flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors duration-150",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Link
                        href={`/dashboard/chat/${conv.id}`}
                        className="flex min-w-0 flex-1 items-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium">
                            {conv.title}
                          </p>
                          <RelativeTime date={conv.updatedAt} />
                        </div>
                      </Link>

                      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => setEditingId(conv.id)}
                          className="flex h-6 w-6 items-center justify-center rounded hover:bg-background cursor-pointer"
                          aria-label="Rename"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                        <form action={deleteConversation}>
                          <input
                            type="hidden"
                            name="conversationId"
                            value={conv.id}
                          />
                          <button
                            type="submit"
                            className="flex h-6 w-6 items-center justify-center rounded text-destructive/80 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}

/**
 * Renders a relative time string ("2 minutes ago") only after mount to avoid
 * hydration mismatches — server-rendered time drifts from client time by the
 * ms it takes to hydrate, which React flags as a mismatch error.
 */
function RelativeTime({ date }: { date: Date | string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const compute = () =>
      setLabel(formatDistanceToNow(new Date(date), { addSuffix: true }));
    compute();
    const interval = setInterval(compute, 60_000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <p
      className="truncate text-[10px] opacity-70"
      suppressHydrationWarning
    >
      {label ?? "\u00A0"}
    </p>
  );
}

function RenameForm({
  conversationId,
  initialTitle,
  onClose,
}: {
  conversationId: string;
  initialTitle: string;
  onClose: () => void;
}) {
  return (
    <form
      action={async (fd) => {
        await renameConversation(fd);
        onClose();
      }}
      className="flex items-center gap-1 p-1"
    >
      <input type="hidden" name="conversationId" value={conversationId} />
      <Input
        name="title"
        defaultValue={initialTitle}
        autoFocus
        className="h-7 text-xs"
        maxLength={80}
      />
      <button
        type="submit"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-emerald-600 hover:bg-emerald-500/10 cursor-pointer"
        aria-label="Save"
      >
        <Check className="h-3 w-3" />
      </button>
      <button
        type="button"
        onClick={onClose}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-muted cursor-pointer"
        aria-label="Cancel"
      >
        <X className="h-3 w-3" />
      </button>
    </form>
  );
}
