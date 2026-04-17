"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layers,
  Gauge,
  Lock,
  Palette,
  BarChart3,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Layers,
    title: "Multi-Model Support",
    description:
      "Access GPT-4, Claude, Llama, DALL-E, and more from a single interface. Switch models mid-conversation.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Gauge,
    title: "Blazing Fast",
    description:
      "Optimized streaming responses with edge computing. Get results 8x faster than traditional setups.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "SOC 2 ready architecture. End-to-end encryption, role-based access, and audit logging built in.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description:
      "White-label ready with configurable themes, branding, and feature flags. Make it yours in minutes.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description:
      "Track token usage, costs, and performance across all tools. Set budgets and alerts per team member.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Shared workspaces, team billing, and permission controls. Built for teams of any size.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="features" className="relative py-24">
      {/* Background accent */}
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-accent/5 px-3 py-1 text-sm text-accent dark:text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Why NexusAI
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Built for{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
              Scale & Speed
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Production-grade infrastructure that grows with you. No compromises
            on performance or security.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="group relative overflow-hidden rounded-xl border bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Glassmorphism highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className={cn("mb-4 flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-200", feature.bg, feature.color)}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
