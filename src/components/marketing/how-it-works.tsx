"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Wand2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/marketing/aurora-background";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up in seconds with email or social login. No credit card required to start.",
    color: "text-sky-500",
    borderColor: "border-sky-500/20",
    bgGlow: "bg-sky-500/10",
  },
  {
    number: "02",
    icon: Wand2,
    title: "Choose Your AI Tool",
    description:
      "Pick from 8 powerful tools — chat, write, generate images, code, translate, summarize, voice, or video.",
    color: "text-violet-500",
    borderColor: "border-violet-500/20",
    bgGlow: "bg-violet-500/10",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Create & Export",
    description:
      "Generate content instantly and export in any format. Scale with Pro or Team plans as you grow.",
    color: "text-emerald-500",
    borderColor: "border-emerald-500/20",
    bgGlow: "bg-emerald-500/10",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24">
      <AuroraBackground />
      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Up and Running in{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
              3 Steps
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From sign-up to your first AI generation in under a minute.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 * i }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-12 left-[60%] hidden h-px w-[80%] bg-gradient-to-r from-border to-transparent md:block" />
              )}

              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                {/* Glow ring */}
                <div className={cn("absolute inset-0 rounded-full animate-pulse-glow", step.bgGlow)} />
                <div className={cn("relative flex h-20 w-20 items-center justify-center rounded-full border-2 bg-card", step.borderColor)}>
                  <step.icon className={cn("h-8 w-8", step.color)} />
                </div>
                <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.number}
                </div>
              </div>

              <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
