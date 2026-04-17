"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
    period: "",
    description: "Perfect for trying out AI tools",
    features: [
      "100 messages per month",
      "10 conversations",
      "5 document uploads",
      "GPT-4o Mini access",
      "Community support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$29",
    yearlyPrice: "$23",
    period: "/month",
    description: "For professionals who need more power",
    features: [
      "2,000 messages per month",
      "100 conversations",
      "50 document uploads",
      "GPT-4o & Claude access",
      "All 8 AI tools",
      "API access",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Team",
    monthlyPrice: "$79",
    yearlyPrice: "$63",
    period: "/month",
    description: "For teams that need scale",
    features: [
      "10,000 messages per month",
      "Unlimited conversations",
      "500 document uploads",
      "All AI models",
      "Team collaboration (10 seats)",
      "Advanced analytics",
      "Dedicated support",
      "Custom API limits",
    ],
    cta: "Start Team Trial",
    popular: false,
  },
];

export function PricingPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section ref={ref} id="pricing" className="relative py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Simple,{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
              Transparent Pricing
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, upgrade when you&apos;re ready. No hidden fees, cancel
            anytime.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border bg-card p-1.5">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer",
                !isAnnual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer",
                isAnnual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual
              <span className="absolute -top-2.5 -right-4 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className={cn(
                "relative rounded-xl border p-8 transition-all duration-300",
                plan.popular
                  ? "border-primary bg-card shadow-xl shadow-primary/10 scale-[1.02]"
                  : "bg-card hover:border-primary/20 hover:shadow-lg"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mt-6">
                <span className="font-heading text-4xl font-bold">
                  {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
                {isAnnual && plan.monthlyPrice !== "Free" && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="line-through">{plan.monthlyPrice}</span>
                    <span className="ml-1.5 text-emerald-500 font-medium">Save 20%</span>
                  </div>
                )}
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/sign-up">
                  <Button
                    className={cn(
                      "w-full cursor-pointer",
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25"
                        : ""
                    )}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 cursor-pointer"
          >
            Compare all features
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
