"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Heart,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/marketing/aurora-background";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Zap,
    title: "Speed Over Complexity",
    description:
      "We believe AI tools should be fast, intuitive, and accessible. No steep learning curves, no unnecessary complexity.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data belongs to you. We never use your content to train models, and we give you full control over your information.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Globe,
    title: "Open & Multi-Model",
    description:
      "We aren't locked to a single AI provider. We integrate the best models from multiple labs to give you the best results.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    icon: Heart,
    title: "Creator-Centric",
    description:
      "Every feature we build starts with the creator's workflow. We build tools for makers, not demos for investors.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "10M+", label: "AI Generations" },
  { value: "8", label: "AI Tools" },
  { value: "99.9%", label: "Uptime" },
];

const team = [
  {
    name: "Alex Nakamura",
    role: "CEO & Co-founder",
    initials: "AN",
    gradient: "from-emerald-500 to-green-600",
    bio: "Previously ML engineer at Google. Believes AI should amplify human creativity, not replace it.",
  },
  {
    name: "Sarah Chen",
    role: "CTO & Co-founder",
    initials: "SC",
    gradient: "from-violet-500 to-indigo-600",
    bio: "Ex-Stripe infrastructure lead. Obsessed with building fast, reliable systems at scale.",
  },
  {
    name: "Marcus Rivera",
    role: "Head of Engineering",
    initials: "MR",
    gradient: "from-sky-500 to-blue-600",
    bio: "Full-stack engineer with 12 years of experience. Loves developer tools and clean APIs.",
  },
  {
    name: "Emily Zhang",
    role: "Head of Product",
    initials: "EZ",
    gradient: "from-amber-500 to-orange-600",
    bio: "Product leader from Figma. Passionate about design systems and seamless user experiences.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    initials: "PS",
    gradient: "from-pink-500 to-rose-600",
    bio: "Award-winning designer. Turns complex AI workflows into beautiful, intuitive interfaces.",
  },
  {
    name: "David Kim",
    role: "Head of AI Research",
    initials: "DK",
    gradient: "from-teal-500 to-cyan-600",
    bio: "PhD in NLP from Stanford. Leads model evaluation, prompt engineering, and multi-model routing.",
  },
];

export function AboutPageClient() {
  return (
    <div className="relative pt-28 md:pt-36">
      {/* Hero */}
      <section className="relative pb-20">
        <AuroraBackground />
        <div className="container relative mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-sm text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              About
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              One Platform for{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
                Every AI Tool
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              We&apos;re building the all-in-one AI workspace that replaces a
              dozen separate tools. One subscription, one interface, unlimited
              creativity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl grid gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Our Mission
                </span>
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                Democratize AI for every creator and team
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Today, professionals juggle 5–10 different AI tools, each with
                its own subscription, interface, and learning curve. We believe
                that&apos;s broken.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                NexusAI brings text, image, code, voice, and video generation
                into a single, beautifully designed workspace. Whether
                you&apos;re a solo creator or a team of 50, every AI capability
                you need is one click away.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-card p-6 text-center transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                >
                  <div className="font-heading text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              What We{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
                Believe In
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide every decision we make.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
              >
                <div
                  className={cn(
                    "mb-4 flex h-11 w-11 items-center justify-center rounded-xl",
                    value.bg
                  )}
                >
                  <value.icon className={cn("h-5 w-5", value.color)} />
                </div>
                <h3 className="font-heading text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Meet the Team</span>
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Built by{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
                Makers
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A small, focused team obsessed with building the best AI platform.
            </p>
          </motion.div>

          <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 * i }}
                className="rounded-xl border bg-card p-6 text-center transition-all duration-300 hover:border-primary/20 hover:shadow-md"
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${member.gradient} text-lg font-bold text-white shadow-lg`}
                >
                  {member.initials}
                </div>
                <h3 className="mt-4 font-heading text-base font-bold">
                  {member.name}
                </h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            <div className="relative px-8 py-14 text-center md:px-16">
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                Join 50,000+ creators using NexusAI
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/80">
                Start free, no credit card required. See why teams and creators
                love NexusAI.
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
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="min-w-[200px] border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 cursor-pointer"
                  >
                    View Pricing
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
