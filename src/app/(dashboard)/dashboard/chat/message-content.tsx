"use client";

import { useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a markdown assistant/user message with syntax-highlighted code
 * blocks and a copy-to-clipboard button on each block.
 */
// Stable component map — extracted to module scope so the object reference
// never changes between renders. Prevents react-markdown from re-diffing its
// AST on every streaming token, which was the primary cause of the
// "Maximum update depth exceeded" error during streaming.
const MD_COMPONENTS: Partial<Components> = {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ className, children }) => (
    <code
      className={cn(
        className,
        !className && "rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]",
      )}
    >
      {children}
    </code>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline-offset-2 hover:underline"
    >
      {children}
    </a>
  ),
};

export function MessageContent({ content }: { content: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-full break-words overflow-hidden prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 prose-code:before:hidden prose-code:after:hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={MD_COMPONENTS}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = extractTextFromChildren(children);
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <div className="group relative my-3 overflow-hidden rounded-lg border bg-muted/40">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded bg-background/80 opacity-0 shadow-sm backdrop-blur transition-opacity duration-150 hover:bg-background group-hover:opacity-100 cursor-pointer"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? (
          <Check className="h-3 w-3 text-emerald-600" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </button>
      <pre className="overflow-x-auto p-3 text-[13px] leading-relaxed">
        {children}
      </pre>
    </div>
  );
}

function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    children.props &&
    typeof children.props === "object" &&
    "children" in children.props
  ) {
    return extractTextFromChildren(
      (children.props as { children: React.ReactNode }).children,
    );
  }
  return "";
}
