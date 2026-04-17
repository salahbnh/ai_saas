"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  X as XIcon,
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle,
  MessageSquare,
  PenLine,
  Image as ImageIcon,
  Code2,
  Languages,
  FileText,
  Mic,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/marketing/aurora-background";

const plans = [
  {
    name: "Starter",
    description: "For individuals getting started with AI",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "100 messages per month",
      "10 conversations",
      "5 document uploads",
      "GPT-4o Mini access",
      "Community support",
      "1 API key",
    ],
    cta: "Get Started Free",
    popular: false,
    gradient: "from-slate-500 to-zinc-600",
  },
  {
    name: "Pro",
    description: "For professionals who need more power",
    monthlyPrice: 29,
    yearlyPrice: 23,
    features: [
      "2,000 messages per month",
      "100 conversations",
      "50 document uploads",
      "GPT-4o & Claude access",
      "All 8 AI tools",
      "API access (5 keys)",
      "Priority support",
      "25 MB file uploads",
    ],
    cta: "Start Pro Trial",
    popular: true,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    name: "Team",
    description: "For teams that need collaboration and scale",
    monthlyPrice: 79,
    yearlyPrice: 63,
    features: [
      "10,000 messages per month",
      "Unlimited conversations",
      "500 document uploads",
      "All AI models",
      "Team collaboration (10 seats)",
      "API access (20 keys)",
      "Dedicated support",
      "Advanced analytics",
      "100 MB file uploads",
      "Custom API limits",
    ],
    cta: "Start Team Trial",
    popular: false,
    gradient: "from-violet-500 to-indigo-600",
  },
];

const comparisonFeatures = [
  {
    category: "AI Tools",
    features: [
      { name: "AI Chat", starter: true, pro: true, team: true, icon: MessageSquare },
      { name: "AI Writer", starter: true, pro: true, team: true, icon: PenLine },
      { name: "AI Image", starter: true, pro: true, team: true, icon: ImageIcon },
      { name: "AI Code", starter: true, pro: true, team: true, icon: Code2 },
      { name: "AI Translator", starter: true, pro: true, team: true, icon: Languages },
      { name: "AI Summarizer", starter: true, pro: true, team: true, icon: FileText },
      { name: "AI Voice", starter: false, pro: true, team: true, icon: Mic },
      { name: "AI Video", starter: false, pro: true, team: true, icon: Video },
    ],
  },
  {
    category: "Models",
    features: [
      { name: "GPT-4o Mini", starter: true, pro: true, team: true },
      { name: "GPT-4o", starter: false, pro: true, team: true },
      { name: "Claude 3.5 Sonnet", starter: false, pro: true, team: true },
      { name: "Llama 3.1 70B", starter: false, pro: false, team: true },
      { name: "DALL-E 3", starter: false, pro: true, team: true },
      { name: "Stable Diffusion XL", starter: false, pro: true, team: true },
    ],
  },
  {
    category: "Limits",
    features: [
      { name: "Messages / month", starter: "100", pro: "2,000", team: "10,000" },
      { name: "Conversations", starter: "10", pro: "100", team: "Unlimited" },
      { name: "Document uploads", starter: "5", pro: "50", team: "500" },
      { name: "Max file size", starter: "5 MB", pro: "25 MB", team: "100 MB" },
      { name: "API keys", starter: "1", pro: "5", team: "20" },
      { name: "Team members", starter: "1", pro: "1", team: "10" },
    ],
  },
  {
    category: "Support & Extras",
    features: [
      { name: "Community support", starter: true, pro: true, team: true },
      { name: "Priority support", starter: false, pro: true, team: true },
      { name: "Dedicated support", starter: false, pro: false, team: true },
      { name: "Usage analytics", starter: false, pro: true, team: true },
      { name: "Advanced analytics", starter: false, pro: false, team: true },
      { name: "Custom API limits", starter: false, pro: false, team: true },
    ],
  },
];

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes. Upgrade instantly, downgrade at the end of your billing cycle. Your data and conversations are never deleted when switching plans.",
  },
  {
    q: "What happens when I hit my message limit?",
    a: "You'll get a notification at 80% and 100%. Once reached, you can upgrade instantly or wait for the next cycle. We never cut you off mid-generation.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes — Pro and Team plans include a 7-day free trial. No credit card required to start the trial.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund.",
  },
  {
    q: "Can I use NexusAI for commercial projects?",
    a: "Absolutely. All content generated through NexusAI is yours to use commercially — text, images, code, audio, and video. No additional licensing fees.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex), debit cards, and select digital wallets through Stripe. Invoicing is available for Team plans.",
  },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium">{value}</span>;
  }
  return value ? (
    <Check className="mx-auto h-4.5 w-4.5 text-emerald-500" />
  ) : (
    <XIcon className="mx-auto h-4 w-4 text-muted-foreground/30" />
  );
}

export function PricingPageClient() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative pt-28 md:pt-36">
      {/* Hero */}
      <section className="relative pb-16">
        <AuroraBackground />
        <div className="container relative mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-sm text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Pricing
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Simple Pricing,{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
                Powerful AI
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Start free, scale as you grow. All plans include access to our core
              AI tools with no hidden fees.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border bg-card p-1.5 shadow-sm">
              <button
                onClick={() => setIsAnnual(false)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
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
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
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
        </div>
      </section>

      {/* Plan cards */}
      <section className="relative pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className={cn(
                  "relative rounded-2xl border p-8 transition-all duration-300",
                  plan.popular
                    ? "border-primary bg-card shadow-2xl shadow-primary/10 scale-[1.03] z-10"
                    : "bg-card hover:border-primary/20 hover:shadow-lg"
                )}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25">
                      <Zap className="h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan icon */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${plan.gradient} shadow-lg`}>
                  <span className="text-lg font-bold text-white">{plan.name.charAt(0)}</span>
                </div>

                <h2 className="font-heading text-xl font-bold">{plan.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-heading text-5xl font-bold">
                    {plan.monthlyPrice === 0
                      ? "Free"
                      : `$${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}`}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                {isAnnual && plan.monthlyPrice > 0 && (
                  <div className="mt-1.5 flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground line-through">
                      ${plan.monthlyPrice}/mo
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-500">
                      Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/yr
                    </span>
                  </div>
                )}

                {/* Features */}
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className={cn(
                        "w-full cursor-pointer font-semibold",
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25"
                          : ""
                      )}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                      {plan.popular && (
                        <ArrowRight className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guarantee */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            14-day money-back guarantee on all paid plans. No questions asked.
          </motion.p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Compare{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
                All Features
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A detailed breakdown of what&apos;s included in each plan.
            </p>
          </div>

          <div className="mx-auto max-w-5xl overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Header */}
              <thead>
                <tr className="border-b">
                  <th className="py-4 pr-4 text-left text-sm font-medium text-muted-foreground w-[40%]">
                    Feature
                  </th>
                  {["Starter", "Pro", "Team"].map((name) => (
                    <th key={name} className="py-4 px-4 text-center">
                      <span className={cn(
                        "font-heading text-sm font-bold",
                        name === "Pro" && "text-primary"
                      )}>
                        {name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <>
                    {/* Category header */}
                    <tr key={category.category}>
                      <td
                        colSpan={4}
                        className="pt-8 pb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {/* Feature rows */}
                    {category.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-b border-border/50 transition-colors hover:bg-muted/20"
                      >
                        <td className="py-3.5 pr-4 text-sm">
                          <div className="flex items-center gap-2">
                            {"icon" in feature && feature.icon && (
                              <feature.icon className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                            {feature.name}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <FeatureCell value={feature.starter} />
                        </td>
                        <td className="py-3.5 px-4 text-center bg-primary/[0.02]">
                          <FeatureCell value={feature.pro} />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <FeatureCell value={feature.team} />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Pricing FAQ
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Common questions about billing and plans.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="rounded-xl border bg-card p-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b last:border-b-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between py-5 text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <HelpCircle className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm font-medium transition-colors duration-150 group-hover:text-primary">
                        {faq.q}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "shrink-0 text-muted-foreground transition-transform duration-200",
                        openFaq === i && "rotate-45"
                      )}
                    >
                      <span className="text-lg leading-none">+</span>
                    </div>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pl-7 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

            <div className="relative px-8 py-14 text-center md:px-16">
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                Still not sure? Start free.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/80">
                No credit card required. Upgrade or cancel anytime.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="group min-w-[200px] bg-white text-primary hover:bg-white/90 font-semibold shadow-xl cursor-pointer"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/#tools">
                  <Button
                    variant="outline"
                    size="lg"
                    className="min-w-[200px] border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 cursor-pointer"
                  >
                    Explore Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
