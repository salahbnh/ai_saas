"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  { value: 50000, suffix: "+", label: "Active Users", format: true },
  { value: 10000000, suffix: "+", label: "Generations", format: true },
  { value: 8, suffix: "", label: "AI Tools", format: false },
  { value: 99.9, suffix: "%", label: "Uptime", format: false },
];

function AnimatedCounter({
  value,
  suffix,
  format,
  isInView,
}: {
  value: number;
  suffix: string;
  format: boolean;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  const display = format
    ? count >= 1000000
      ? `${(count / 1000000).toFixed(count >= 10000000 ? 0 : 1)}M`
      : count >= 1000
        ? `${(count / 1000).toFixed(0)}K`
        : Math.floor(count).toString()
    : value === 99.9
      ? count >= 99.9
        ? "99.9"
        : count.toFixed(1)
      : Math.floor(count).toString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

const badges = [
  { icon: Zap, text: "Lightning Fast" },
  { icon: Shield, text: "Enterprise Secure" },
  { icon: Globe, text: "Multi-Language" },
];

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/50 dark:bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-4 py-1.5 text-sm backdrop-blur-md"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-3 w-3 text-primary" />
            </span>
            <span className="text-muted-foreground">
              Now with <span className="font-semibold text-foreground">AI Video Generation</span>
            </span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            One Platform.{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-[length:200%_auto] animate-shimmer">
              Every AI Tool
            </span>{" "}
            You Need.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl"
          >
            Generate text, images, code, voice, and video with cutting-edge AI
            models. No switching between apps — everything in one powerful
            workspace.
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4"
          >
            {badges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-background/30 px-3 py-1 text-sm backdrop-blur-sm"
              >
                <badge.icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-foreground/80">{badge.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/sign-up">
              <Button
                size="lg"
                className="group h-12 min-w-[200px] bg-gradient-to-r from-primary to-primary/80 text-base font-semibold shadow-xl shadow-primary/25 transition-all duration-200 hover:shadow-2xl hover:shadow-primary/30 cursor-pointer"
              >
                Start Creating Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="group h-12 min-w-[200px] text-base font-medium cursor-pointer"
            >
              <Play className="mr-2 h-4 w-4 text-primary" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-background/40 px-4 py-4 text-center backdrop-blur-md">
                <div className="font-heading text-2xl font-bold md:text-3xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    format={stat.format}
                    isInView={isInView}
                  />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          {/* Glow effects */}
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-green-400/20 to-emerald-500/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl">
            {/* ASSET NEEDED: /images/hero-dashboard.png
               Description: Dark-themed AI dashboard showing multiple tool panels — chat on left, image generation gallery center, analytics charts on right. Modern glassmorphism UI with emerald/green accents.
               Dimensions: 1920x1080
               Style: 3D UI mockup render with depth, glass morphism cards, subtle gradients
               AI Prompt: "Futuristic dark AI SaaS dashboard interface mockup, glass morphism panels, chat conversation on left, AI image generation gallery in center, analytics charts on right, emerald green accent colors, dark navy background, clean typography, 4K, professional UI design, Figma quality render"
               Filename: hero-dashboard.png
            */}
            {/* Rich placeholder — simulated dashboard UI */}
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-card via-card to-primary/5 p-8 pt-14">
              <div className="grid h-full grid-cols-12 gap-3">
                {/* Sidebar */}
                <div className="col-span-2 rounded-lg border border-border/50 bg-muted/30 p-3">
                  <div className="mb-4 h-6 w-16 rounded bg-primary/20" />
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={cn("h-4 rounded", i === 0 ? "bg-primary/30 w-full" : "bg-muted/50 w-3/4")} />
                    ))}
                  </div>
                </div>
                {/* Main content */}
                <div className="col-span-7 space-y-3">
                  {/* Chat messages */}
                  <div className="rounded-lg border border-border/50 bg-muted/20 p-4 h-[55%]">
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="h-6 w-6 shrink-0 rounded-full bg-primary/30" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3 w-3/4 rounded bg-muted/50" />
                          <div className="h-3 w-1/2 rounded bg-muted/50" />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <div className="space-y-1.5">
                          <div className="h-3 w-48 rounded bg-primary/20" />
                          <div className="h-3 w-32 rounded bg-primary/20" />
                        </div>
                        <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-500/30" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 w-6 shrink-0 rounded-full bg-primary/30" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3 w-full rounded bg-muted/50" />
                          <div className="h-3 w-2/3 rounded bg-muted/50" />
                          <div className="h-3 w-1/3 rounded bg-muted/50" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Input bar */}
                  <div className="flex gap-2">
                    <div className="h-10 flex-1 rounded-lg border border-border/50 bg-muted/20" />
                    <div className="h-10 w-10 rounded-lg bg-primary/30" />
                  </div>
                  {/* Image grid */}
                  <div className="grid grid-cols-3 gap-2 h-[25%]">
                    <div className="rounded-lg bg-violet-500/10 border border-violet-500/20" />
                    <div className="rounded-lg bg-amber-500/10 border border-amber-500/20" />
                    <div className="rounded-lg bg-pink-500/10 border border-pink-500/20" />
                  </div>
                </div>
                {/* Right panel — analytics */}
                <div className="col-span-3 space-y-3">
                  <div className="rounded-lg border border-border/50 bg-muted/20 p-3 h-[40%]">
                    <div className="mb-2 h-3 w-20 rounded bg-muted/50" />
                    <div className="flex items-end gap-1 h-[calc(100%-20px)]">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t bg-emerald-500/30" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-muted/20 p-3 space-y-2">
                    <div className="h-3 w-16 rounded bg-muted/50" />
                    <div className="h-8 w-24 rounded bg-primary/20" />
                    <div className="h-2 w-full rounded-full bg-muted/30">
                      <div className="h-2 w-2/3 rounded-full bg-emerald-500/40" />
                    </div>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-muted/20 p-3 space-y-2">
                    <div className="h-3 w-20 rounded bg-muted/50" />
                    {[
                      { label: "Chat", color: "bg-emerald-500/40", w: "w-4/5" },
                      { label: "Image", color: "bg-violet-500/40", w: "w-3/5" },
                      { label: "Code", color: "bg-lime-500/40", w: "w-2/5" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className={cn("h-2 rounded-full", item.color, item.w)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top bar decoration */}
            <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 border-b bg-card/80 px-4 py-3 backdrop-blur-sm">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
              <div className="ml-4 h-5 flex-1 max-w-xs rounded bg-muted/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
