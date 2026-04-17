"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  PenLine,
  Image as ImageIcon,
  Code2,
  Languages,
  FileText,
  Mic,
  Video,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/marketing/aurora-background";

const tools = [
  {
    name: "AI Chat",
    description:
      "Multi-turn conversations with GPT-4, Claude, and Llama. Context-aware, with memory across sessions.",
    icon: MessageSquare,
    badge: "Popular",
    color: "from-emerald-500 to-green-600",
    href: "/dashboard/tools/chat",
  },
  {
    name: "AI Writer",
    description:
      "Generate blog posts, emails, ad copy, and more with customizable templates and tone control.",
    icon: PenLine,
    badge: "New",
    color: "from-teal-500 to-cyan-500",
    href: "/dashboard/tools/writer",
  },
  {
    name: "AI Image",
    description:
      "Create stunning visuals from text prompts. Supports DALL-E, Stable Diffusion, and more.",
    icon: ImageIcon,
    badge: "Hot",
    color: "from-violet-500 to-indigo-600",
    href: "/dashboard/tools/image",
  },
  {
    name: "AI Code",
    description:
      "Generate, debug, and explain code in 50+ languages. Built-in syntax highlighting and diff view.",
    icon: Code2,
    badge: null,
    color: "from-green-500 to-lime-600",
    href: "/dashboard/tools/code",
  },
  {
    name: "AI Translator",
    description:
      "Translate text between 100+ languages with tone and formality controls. Preserves context.",
    icon: Languages,
    badge: null,
    color: "from-sky-500 to-blue-600",
    href: "/dashboard/tools/translator",
  },
  {
    name: "AI Summarizer",
    description:
      "Summarize articles, PDFs, and documents into structured, actionable key points instantly.",
    icon: FileText,
    badge: null,
    color: "from-slate-500 to-zinc-600",
    href: "/dashboard/tools/summarizer",
  },
  {
    name: "AI Voice",
    description:
      "Convert text to natural speech or transcribe audio to text. Multiple voices and accents.",
    icon: Mic,
    badge: "New",
    color: "from-pink-500 to-rose-600",
    href: "/dashboard/tools/voice",
  },
  {
    name: "AI Video",
    description:
      "Generate short videos from text prompts or images. Perfect for social content and ads.",
    icon: Video,
    badge: "Hot",
    color: "from-amber-500 to-orange-600",
    href: "/dashboard/tools/video",
  },
];

export function ToolsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="tools" className="relative py-24">
      <AuroraBackground />
      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-sm text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            8 Powerful Tools
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need.{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
              One Platform.
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop juggling between apps. Access all cutting-edge AI tools from a
            single, unified workspace.
          </p>
        </motion.div>

        {/* Tools grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <Link href={tool.href} className="group block cursor-pointer">
                <div className="relative h-full overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                  {/* Badge */}
                  {tool.badge && (
                    <div className="absolute top-4 right-4">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                          tool.badge === "Hot" &&
                            "bg-orange-500/10 text-orange-500",
                          tool.badge === "New" &&
                            "bg-emerald-500/10 text-emerald-500",
                          tool.badge === "Popular" &&
                            "bg-primary/10 text-primary"
                        )}
                      >
                        {tool.badge}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={cn(
                      "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-200 group-hover:scale-110",
                      tool.color
                    )}
                  >
                    <tool.icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-lg font-semibold">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-all duration-200 group-hover:opacity-100">
                    Try it now
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
