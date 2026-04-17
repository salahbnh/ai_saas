"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What AI models are available?",
    answer:
      "NexusAI supports GPT-4o, GPT-4o Mini, Claude 3.5 Sonnet, Llama 3.1, DALL-E 3, Stable Diffusion, and more. We continuously add new models as they become available. Pro and Team plans unlock access to all models.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! The Starter plan is completely free and includes 100 messages per month, access to GPT-4o Mini, and all 8 AI tools. No credit card required to sign up.",
  },
  {
    question: "Can I use NexusAI for commercial projects?",
    answer:
      "Absolutely. All content generated through NexusAI is yours to use commercially. This includes text, images, code, translations, audio, and video. There are no additional licensing fees.",
  },
  {
    question: "How does team collaboration work?",
    answer:
      "The Team plan supports up to 10 members with shared workspaces, centralized billing, usage analytics per member, and role-based permissions. Team admins can set usage limits and manage access to specific tools.",
  },
  {
    question: "Do you offer an API?",
    answer:
      "Yes, Pro and Team plans include API access with dedicated API keys. You can integrate NexusAI capabilities directly into your own applications. Full API documentation is available in the dashboard.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "You'll receive a notification when you're approaching your limit. Once reached, you can upgrade your plan instantly or wait for the next billing cycle. We never cut you off mid-generation.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll retain access to your current plan features until the end of your billing period. All your generated content remains accessible.",
  },
];

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-sm font-medium pr-4 transition-colors duration-150 group-hover:text-primary">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about NexusAI.
            </p>
          </motion.div>

          {/* FAQ list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 rounded-xl border bg-card p-6"
          >
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
