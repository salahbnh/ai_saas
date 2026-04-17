"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Manager, TechFlow",
    content:
      "NexusAI replaced 4 different AI tools we were paying for separately. The writer alone saved us 20 hours a week on content production.",
    initials: "SC",
    rating: 5,
    avatarColor: "from-emerald-500 to-green-600",
  },
  {
    name: "Marcus Rivera",
    role: "Full-Stack Developer",
    content:
      "The code assistant is insanely good. It understands context across files and suggests fixes before I even know there's a bug. Game changer.",
    initials: "MR",
    rating: 5,
    avatarColor: "from-violet-500 to-indigo-600",
  },
  {
    name: "Emily Zhang",
    role: "Marketing Director, Bloom",
    content:
      "We use the image generator for all our social media now. What used to take a designer 2 hours takes us 2 minutes. The quality is incredible.",
    initials: "EZ",
    rating: 5,
    avatarColor: "from-pink-500 to-rose-600",
  },
  {
    name: "James Cooper",
    role: "Freelance Copywriter",
    content:
      "The translator maintains the tone and nuance of my copy across 12 languages. My international clients are thrilled with the results.",
    initials: "JC",
    rating: 5,
    avatarColor: "from-amber-500 to-orange-600",
  },
  {
    name: "Aisha Patel",
    role: "Startup Founder",
    content:
      "Started on the free plan, now our whole team is on Team. The video generation tool has been a secret weapon for our product demos.",
    initials: "AP",
    rating: 5,
    avatarColor: "from-sky-500 to-blue-600",
  },
  {
    name: "David Kim",
    role: "Product Lead, DataSync",
    content:
      "Finally, one platform that does it all. The API access lets us integrate AI into our own product. Their docs are excellent too.",
    initials: "DK",
    rating: 5,
    avatarColor: "from-teal-500 to-cyan-600",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
              50,000+ Creators
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our users are building with NexusAI.
          </p>

          {/* Aggregate rating */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-card px-5 py-2.5 shadow-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm">
              <span className="font-semibold">4.9/5</span>
              <span className="text-muted-foreground"> from 2,400+ reviews</span>
            </span>
          </div>
        </motion.div>

        {/* Testimonial grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.avatarColor} text-xs font-bold text-white shadow-sm`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
