"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~800px (past the hero)
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        >
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="hidden h-2 w-2 rounded-full bg-emerald-500 animate-pulse sm:block" />
              <p className="text-sm">
                <span className="font-semibold">Start creating with AI today</span>
                <span className="hidden text-muted-foreground sm:inline">
                  {" "}— Free plan, no credit card required
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="group bg-gradient-to-r from-primary to-primary/80 font-semibold shadow-md shadow-primary/20 cursor-pointer"
                >
                  Get Started Free
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <button
                onClick={() => setIsDismissed(true)}
                className="rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
