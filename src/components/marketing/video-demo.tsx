"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause } from "lucide-react";

export function VideoDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={ref} className="relative py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            See NexusAI{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
              in Action
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Watch how creators use NexusAI to produce content 10x faster across
            all 8 tools.
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto mt-12 max-w-4xl"
        >
          {/* Glow */}
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-green-400/10 to-emerald-500/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl">
            {/* ASSET NEEDED: /videos/nexusai-demo.mp4
               Description: Screen recording showing a user navigating the NexusAI dashboard — opening AI Chat, sending a message, switching to AI Image generator, typing a prompt and seeing an image generate, then switching to AI Code and generating a React component. Fast-paced, 60-90 seconds.
               Dimensions: 1920x1080 @ 30fps
               Style: Screen recording with subtle zoom transitions, dark UI theme
               AI Prompt (for Runway/Synthesia): "Product demo video of a modern AI SaaS dashboard, user clicks through chat, image generation, and code tools, dark theme with emerald accents, professional screen recording style"
               Filename: nexusai-demo.mp4
            */}

            {/* Video placeholder with rich thumbnail */}
            <div className="relative aspect-video w-full bg-gradient-to-br from-card via-card to-primary/5">
              {/* Simulated video thumbnail — tool showcase grid */}
              <div className="absolute inset-0 p-8 pt-12">
                <div className="grid h-full grid-cols-3 gap-4">
                  {/* Chat panel */}
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-emerald-500/30" />
                      <div className="h-3 w-16 rounded bg-emerald-500/20" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2.5 w-full rounded bg-muted/40" />
                      <div className="h-2.5 w-3/4 rounded bg-muted/40" />
                      <div className="mt-3 h-2.5 w-full rounded bg-emerald-500/15" />
                      <div className="h-2.5 w-1/2 rounded bg-emerald-500/15" />
                    </div>
                  </div>
                  {/* Image panel */}
                  <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-violet-500/30" />
                      <div className="h-3 w-16 rounded bg-violet-500/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="aspect-square rounded bg-violet-500/10" />
                      <div className="aspect-square rounded bg-violet-500/15" />
                      <div className="aspect-square rounded bg-violet-500/8" />
                      <div className="aspect-square rounded bg-violet-500/12" />
                    </div>
                  </div>
                  {/* Code panel */}
                  <div className="rounded-lg border border-lime-500/20 bg-lime-500/5 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-lime-500/30" />
                      <div className="h-3 w-16 rounded bg-lime-500/20" />
                    </div>
                    <div className="space-y-1.5">
                      {[80, 60, 90, 45, 70, 55, 85].map((w, i) => (
                        <div
                          key={i}
                          className="h-2 rounded bg-lime-500/10"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Play button overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all duration-300 hover:bg-black/20 cursor-pointer group"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-transform duration-200 group-hover:scale-110">
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-foreground" />
                  ) : (
                    <Play className="ml-1 h-8 w-8 text-foreground" />
                  )}
                </div>
              </button>

              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 border-b bg-card/80 px-4 py-2.5 backdrop-blur-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                <div className="ml-3 h-4 w-48 rounded bg-muted/40" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
