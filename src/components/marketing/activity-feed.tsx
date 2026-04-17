"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Image,
  Code2,
  PenLine,
  Mic,
  Video,
  Languages,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  { user: "Sarah C.", action: "generated an image", tool: "AI Image", icon: Image, color: "text-violet-500", bg: "bg-violet-500/10" },
  { user: "Marcus R.", action: "wrote a blog post", tool: "AI Writer", icon: PenLine, color: "text-teal-500", bg: "bg-teal-500/10" },
  { user: "Emily Z.", action: "started a conversation", tool: "AI Chat", icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { user: "James C.", action: "translated a document", tool: "AI Translator", icon: Languages, color: "text-sky-500", bg: "bg-sky-500/10" },
  { user: "Aisha P.", action: "generated a video", tool: "AI Video", icon: Video, color: "text-amber-500", bg: "bg-amber-500/10" },
  { user: "David K.", action: "debugged code", tool: "AI Code", icon: Code2, color: "text-lime-500", bg: "bg-lime-500/10" },
  { user: "Lisa M.", action: "created a voiceover", tool: "AI Voice", icon: Mic, color: "text-pink-500", bg: "bg-pink-500/10" },
  { user: "Tom W.", action: "summarized a PDF", tool: "AI Summarizer", icon: FileText, color: "text-slate-400", bg: "bg-slate-400/10" },
  { user: "Nina F.", action: "generated 4 images", tool: "AI Image", icon: Image, color: "text-violet-500", bg: "bg-violet-500/10" },
  { user: "Alex B.", action: "wrote ad copy", tool: "AI Writer", icon: PenLine, color: "text-teal-500", bg: "bg-teal-500/10" },
  { user: "Chris L.", action: "built an API endpoint", tool: "AI Code", icon: Code2, color: "text-lime-500", bg: "bg-lime-500/10" },
  { user: "Mia R.", action: "created a product demo", tool: "AI Video", icon: Video, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export function ActivityFeed() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [timeLabel, setTimeLabel] = useState("just now");

  const advance = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % activities.length);
      setTimeLabel(`${Math.floor(Math.random() * 55) + 5}s ago`);
      setIsVisible(true);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 4000);
    return () => clearInterval(interval);
  }, [advance]);

  const activity = activities[current];
  const Icon = activity.icon;

  return (
    <div className="fixed bottom-24 left-4 z-50 hidden lg:block">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 rounded-xl border bg-card/95 px-4 py-3 shadow-lg backdrop-blur-md"
          >
            <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", activity.bg)}>
              <Icon className={cn("h-4 w-4", activity.color)} />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground">{timeLabel}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
