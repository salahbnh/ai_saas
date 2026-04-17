"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const demoPrompts = [
  {
    prompt: "Write a catchy headline for my SaaS product",
    response:
      "Here are 3 headlines for your SaaS product:\n\n1. \"Ship Faster, Scale Smarter — Your All-in-One Dev Platform\"\n2. \"From Idea to Production in Minutes, Not Months\"\n3. \"The Last Tool Your Engineering Team Will Ever Need\"",
  },
  {
    prompt: "Generate a product description for wireless earbuds",
    response:
      "Experience sound without boundaries. Our AirPulse Pro earbuds deliver crystal-clear audio with adaptive noise cancellation that adjusts to your environment. 36 hours of battery life, IPX5 water resistance, and a custom-tuned driver that makes every beat feel alive.",
  },
  {
    prompt: "Explain quantum computing in simple terms",
    response:
      "Think of a regular computer as reading a book one page at a time. A quantum computer reads all pages simultaneously. Instead of bits (0 or 1), it uses qubits that can be both at once — like a coin spinning in the air. This lets it solve certain complex problems exponentially faster.",
  },
];

export function PromptPlayground() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeDemo, setActiveDemo] = useState(0);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startTyping = useCallback(() => {
    setDisplayedResponse("");
    setIsTyping(true);
    setHasStarted(true);
    const response = demoPrompts[activeDemo].response;
    let i = 0;

    const interval = setInterval(() => {
      if (i < response.length) {
        setDisplayedResponse(response.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [activeDemo]);

  useEffect(() => {
    if (isInView && !hasStarted) {
      const timeout = setTimeout(startTyping, 800);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasStarted, startTyping]);

  const handleSwitch = (index: number) => {
    setActiveDemo(index);
    setDisplayedResponse("");
    setIsTyping(false);
    setHasStarted(false);
    setTimeout(() => {
      setDisplayedResponse("");
      setIsTyping(true);
      setHasStarted(true);
      const response = demoPrompts[index].response;
      let i = 0;
      const interval = setInterval(() => {
        if (i < response.length) {
          setDisplayedResponse(response.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 18);
    }, 200);
  };

  return (
    <section ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-sm text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Try It Live
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            See the{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
              Magic
            </span>{" "}
            in Action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Watch how NexusAI responds to prompts in real-time. No sign-up needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto mt-12 max-w-3xl"
        >
          {/* Glow behind chat window */}
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-primary/5 to-emerald-500/10 blur-xl -z-10" />

          {/* Prompt tabs */}
          <div className="mb-4 flex flex-wrap gap-2">
            {demoPrompts.map((demo, i) => (
              <button
                key={i}
                onClick={() => handleSwitch(i)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer",
                  activeDemo === i
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {demo.prompt.slice(0, 35)}...
              </button>
            ))}
          </div>

          {/* Chat window */}
          <div className="overflow-hidden rounded-xl border bg-card shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">
                  NexusAI Chat — GPT-4o
                </span>
              </div>
              <button
                onClick={() => handleSwitch(activeDemo)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="p-5 space-y-4 min-h-[280px]">
              {/* User message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  {demoPrompts[activeDemo].prompt}
                </div>
              </div>

              {/* AI response */}
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl rounded-tl-md bg-muted/50 px-4 py-3">
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {displayedResponse}
                      {isTyping && (
                        <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse rounded-sm" />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div className="border-t px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm text-muted-foreground">
                  Type a message...
                </div>
                <Button size="sm" className="h-9 w-9 p-0 cursor-pointer">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
