"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Floating particles */}
          <div className="absolute top-8 left-[15%] h-2 w-2 rounded-full bg-white/20 animate-float" />
          <div className="absolute top-16 right-[20%] h-1.5 w-1.5 rounded-full bg-white/30 animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-12 left-[25%] h-1 w-1 rounded-full bg-white/25 animate-float" style={{ animationDelay: "2.5s" }} />
          <div className="absolute top-1/2 right-[10%] h-2.5 w-2.5 rounded-full bg-white/15 animate-float" style={{ animationDelay: "3.5s" }} />
          <div className="absolute bottom-20 right-[35%] h-1.5 w-1.5 rounded-full bg-white/20 animate-float" style={{ animationDelay: "4s" }} />

          {/* Content */}
          <div className="relative px-8 py-16 text-center md:px-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
            >
              <Sparkles className="h-7 w-7 text-white" />
            </motion.div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to Create with AI?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
              Join 50,000+ creators using NexusAI to produce content 10x faster.
              Start free, no credit card required.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="group h-12 min-w-[220px] bg-white text-primary hover:bg-white/90 text-base font-semibold shadow-xl cursor-pointer"
                >
                  Start Creating Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 min-w-[220px] border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 text-base cursor-pointer"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
