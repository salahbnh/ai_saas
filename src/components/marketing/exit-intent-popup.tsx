"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFired, setHasFired] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasFired) {
        setIsOpen(true);
        setHasFired(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasFired]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md">
            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
              {/* Gradient top bar */}
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500" />

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 text-center">
                {/* Icon */}
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-primary/25">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>

                <h3 className="font-heading text-2xl font-bold">
                  Wait! Try 3 Free Generations
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Before you go — create 3 free AI generations on us. No sign-up
                  required. See the quality for yourself.
                </p>

                {/* Benefits */}
                <div className="mt-6 space-y-2">
                  {[
                    "No credit card needed",
                    "Access to all 8 AI tools",
                    "Results in under 5 seconds",
                  ].map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center justify-center gap-2 text-sm"
                    >
                      <Zap className="h-3.5 w-3.5 text-primary" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-primary/80 font-semibold shadow-lg shadow-primary/25 cursor-pointer"
                    >
                      Try Free — No Sign Up
                    </Button>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    No thanks, I&apos;ll pass
                  </button>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
