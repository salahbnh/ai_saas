"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useChat, type Message as UIMessage } from "ai/react";
import { toast } from "sonner";
import {
  ArrowUp,
  Check,
  Copy,
  Loader2,
  Pencil,
  RefreshCw,
  Square,
  Sparkles,
  X,
} from "lucide-react";
import type { AIModel } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApiKeyInput, useUserApiKey } from "@/components/dashboard/api-key-input";
import { ModelSelector } from "./model-selector";
import { MessageContent } from "./message-content";
import { createConversation, truncateConversationAt } from "./actions";

type Props = {
  conversationId: string;
  initialMessages: UIMessage[];
  models: AIModel[];
  initialModelId: string;
  userName: string | null;
};

const SUGGESTIONS = [
  "Explain quantum entanglement in simple terms",
  "Write a Python function to reverse a linked list",
  "Draft a professional follow-up email",
  "Compare React Server Components vs. traditional SSR",
];

export function ChatUI({
  conversationId,
  initialMessages,
  models,
  initialModelId,
  userName,
}: Props) {
  const [modelId, setModelId] = useState(initialModelId);
  const [userApiKey, setUserApiKey] = useUserApiKey();
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Memoize options so useChat doesn't reinitialize on every render — a fresh
  // object literal here triggers an internal SWR re-key → infinite loop.
  const chatBody = useMemo(
    () => ({
      conversationId,
      modelId,
      ...(userApiKey.trim() ? { apiKey: userApiKey.trim() } : {}),
    }),
    [conversationId, modelId, userApiKey],
  );
  const handleError = useCallback((err: Error) => {
    try {
      const parsed = JSON.parse(err.message);
      toast.error(parsed.error ?? "Something went wrong");
    } catch {
      toast.error(err.message || "Something went wrong");
    }
  }, []);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    setInput,
    setMessages,
    append,
    error,
  } = useChat({
    api: "/api/chat",
    id: conversationId,
    initialMessages,
    body: chatBody,
    onError: handleError,
  });

  // Auto-scroll to bottom when the message count changes — depend on primitive
  // `.length` so this doesn't fire on every streaming token.
  const messageCount = messages.length;
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messageCount]);

  // Keep the last message in view as tokens arrive — rAF-throttled + instant.
  const lastContent = messages[messages.length - 1]?.content ?? "";
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
    return () => cancelAnimationFrame(id);
  }, [lastContent]);

  // Auto-resize textarea (direct DOM mutation).
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [input]);

  // Keep a ref to messages so callbacks can read the latest value without
  // needing `messages` in their dependency array (which would break memo on
  // every streaming token and trigger the "Maximum update depth" error).
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Global keyboard shortcuts.
  useEffect(() => {
    const onKey = async (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;

      // Esc → stop streaming
      if (e.key === "Escape" && isLoading) {
        e.preventDefault();
        stop();
        return;
      }

      // ⌘K / Ctrl+K → new conversation
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        try {
          await createConversation();
        } catch (err) {
          if (err instanceof Error) toast.error(err.message);
        }
        return;
      }

      // ⌘↑ / Ctrl+↑ → recall last user message into the composer
      if (mod && e.key === "ArrowUp" && !isLoading) {
        const msgs = messagesRef.current;
        const last = [...msgs].reverse().find((m) => m.role === "user");
        if (last) {
          e.preventDefault();
          setInput(last.content);
          textareaRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLoading, stop, setInput]);

  const handleRegenerate = useCallback(() => {
    reload();
  }, [reload]);

  const handleEditResend = useCallback(
    async (messageIndex: number, newContent: string) => {
      const msgs = messagesRef.current;
      const target = msgs[messageIndex];
      if (!target || target.role !== "user") return;

      // 1. Truncate DB (delete target + everything after).
      try {
        await truncateConversationAt(conversationId, target.id);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
        return;
      }

      // 2. Truncate client state to just before the edited message.
      const trimmed = msgs.slice(0, messageIndex);
      setMessages(trimmed);

      // 3. Append the edited message — this triggers /api/chat, which sees
      //    one extra USER message vs. DB and persists it.
      await append({ role: "user", content: newContent });
    },
    [conversationId, setMessages, append],
  );

  const isEmpty = messages.length === 0;
  const firstName = userName?.split(" ")[0] ?? null;

  // Index of the last assistant message (used to show "Regenerate" only on it).
  // Depends on messages.length (primitive) — not the messages ref — so it only
  // recomputes when a message is added/removed, not on every streaming token.
  const lastAssistantIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageCount]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 border-b px-4 py-2.5">
        <ModelSelector
          models={models}
          value={modelId}
          onChange={setModelId}
          disabled={isLoading}
        />
        <div className="flex flex-1 items-center justify-end gap-3">
          <ApiKeyInput
            value={userApiKey}
            onChange={setUserApiKey}
            disabled={isLoading}
            className="w-full max-w-[260px] [&_label]:hidden [&_p]:hidden"
          />
          {isLoading && (
            <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Thinking…
              <kbd className="ml-1 rounded border bg-muted px-1 font-mono text-[10px]">
                Esc
              </kbd>
              to stop
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-md shadow-emerald-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="font-heading text-xl font-semibold">
              {firstName ? `Hey ${firstName}, what's on your mind?` : "What can I help with?"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ask anything, brainstorm, or get unstuck.
            </p>
            <div className="mt-6 grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setInput(s)}
                  className="rounded-lg border bg-background p-3 text-left text-xs text-muted-foreground transition-colors duration-150 hover:border-primary/40 hover:bg-muted cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl px-4 py-6">
            {messages.map((m, i) => (
              <MessageBubble
                key={m.id}
                message={m}
                index={i}
                isLastAssistant={i === lastAssistantIndex && !isLoading}
                isStreaming={isLoading && i === messages.length - 1 && m.role === "assistant"}
                onRegenerate={handleRegenerate}
                onEditResend={handleEditResend}
                disabled={isLoading}
              />
            ))}
            {error && (
              <div className="mx-auto my-3 max-w-3xl rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
                {error.message.includes("quota")
                  ? "Monthly quota reached. Upgrade your plan to keep chatting."
                  : "The model failed to respond. Click retry below."}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-6 cursor-pointer"
                  onClick={() => reload()}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Retry
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="border-t bg-background p-3 md:p-4"
      >
        <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border bg-background p-1.5 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Message NexusAI…  (⌘K new chat · ⌘↑ recall last)"
            rows={1}
            className="flex-1 resize-none border-0 bg-transparent px-3 py-2 text-sm shadow-none focus-visible:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim() && !isLoading) {
                  handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                }
              }
            }}
          />
          {isLoading ? (
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={stop}
              className="h-9 w-9 shrink-0 cursor-pointer"
              aria-label="Stop"
            >
              <Square className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              className="h-9 w-9 shrink-0 cursor-pointer"
              aria-label="Send"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          NexusAI can make mistakes. Verify important info.
        </p>
      </form>
    </div>
  );
}

type BubbleProps = {
  message: UIMessage;
  index: number;
  isLastAssistant: boolean;
  isStreaming: boolean;
  onRegenerate: () => void;
  onEditResend: (index: number, newContent: string) => void | Promise<void>;
  disabled: boolean;
};

const MessageBubble = memo(function MessageBubble({
  message,
  index,
  isLastAssistant,
  isStreaming,
  onRegenerate,
  onEditResend,
  disabled,
}: BubbleProps) {
  const isUser = message.role === "user";
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing && isUser) {
    return (
      <EditUserMessage
        initialContent={message.content}
        onCancel={() => setIsEditing(false)}
        onSave={async (newContent) => {
          setIsEditing(false);
          await onEditResend(index, newContent);
        }}
      />
    );
  }

  return (
    <div
      className={cn(
        "group mb-5 flex gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
      )}

      <div
        className={cn(
          "flex min-w-0 max-w-[85%] overflow-hidden flex-col gap-1.5",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted/60",
            isStreaming && "animate-in fade-in-50",
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <MessageContent content={message.content} />
          )}
        </div>

        {!isStreaming && message.content.trim().length > 0 && (
          <MessageActions
            content={message.content}
            showEdit={isUser && !disabled}
            showRegenerate={!isUser && isLastAssistant}
            onEdit={() => setIsEditing(true)}
            onRegenerate={onRegenerate}
          />
        )}
      </div>
    </div>
  );
});

function MessageActions({
  content,
  showEdit,
  showRegenerate,
  onEdit,
  onRegenerate,
}: {
  content: string;
  showEdit: boolean;
  showRegenerate: boolean;
  onEdit: () => void;
  onRegenerate: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
      <button
        type="button"
        onClick={copy}
        className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
        aria-label={copied ? "Copied" : "Copy message"}
        title="Copy"
      >
        {copied ? (
          <Check className="h-3 w-3 text-emerald-600" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </button>
      {showEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          aria-label="Edit message"
          title="Edit & resend"
        >
          <Pencil className="h-3 w-3" />
        </button>
      )}
      {showRegenerate && (
        <button
          type="button"
          onClick={onRegenerate}
          className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          aria-label="Regenerate response"
          title="Regenerate"
        >
          <RefreshCw className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function EditUserMessage({
  initialContent,
  onCancel,
  onSave,
}: {
  initialContent: string;
  onCancel: () => void;
  onSave: (content: string) => void | Promise<void>;
}) {
  const [value, setValue] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 240) + "px";
  }, []);

  const submit = async () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === initialContent) {
      onCancel();
      return;
    }
    setIsSaving(true);
    await onSave(trimmed);
  };

  return (
    <div className="mb-5 flex justify-end">
      <div className="flex w-full max-w-[85%] flex-col gap-2 rounded-2xl border border-primary/30 bg-background p-2 shadow-sm">
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, 240) + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submit();
            } else if (e.key === "Escape") {
              e.preventDefault();
              onCancel();
            }
          }}
          className="resize-none border-0 bg-transparent text-sm shadow-none focus-visible:ring-0"
          disabled={isSaving}
        />
        <div className="flex items-center justify-between gap-2 pl-2">
          <p className="text-[10px] text-muted-foreground">
            Edits remove all responses after this message.
          </p>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={onCancel}
              disabled={isSaving}
              className="h-7 cursor-pointer text-xs"
            >
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={submit}
              disabled={isSaving || !value.trim()}
              className="h-7 cursor-pointer text-xs"
            >
              {isSaving ? (
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              ) : (
                <Check className="mr-1 h-3 w-3" />
              )}
              Save & resend
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
