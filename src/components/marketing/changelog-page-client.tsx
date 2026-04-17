"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { changelogEntries } from "@/config/changelog";
import { AuroraBackground } from "@/components/marketing/aurora-background";

const typeBadge = {
  feature: "bg-emerald-500/10 text-emerald-500",
  improvement: "bg-sky-500/10 text-sky-500",
  fix: "bg-amber-500/10 text-amber-500",
};

export function ChangelogPageClient() {
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
              Changelog
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              What&apos;s{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
                New
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              All the latest features, improvements, and fixes shipped to
              NexusAI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Timeline line */}
            <div className="relative">
              <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

              {changelogEntries.map((entry, i) => (
                <motion.div
                  key={entry.version}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 * i }}
                  className={cn(
                    "relative mb-12 last:mb-0",
                    "md:grid md:grid-cols-2 md:gap-8"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl border-2 border-background shadow-md",
                        entry.iconBg
                      )}
                    >
                      <entry.icon
                        className={cn("h-5 w-5", entry.iconColor)}
                      />
                    </div>
                  </div>

                  {/* Date side (left on desktop) */}
                  <div
                    className={cn(
                      "hidden md:flex md:items-start md:pt-3",
                      i % 2 === 0
                        ? "md:justify-end md:text-right"
                        : "md:order-2 md:justify-start"
                    )}
                  >
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {entry.date}
                      </span>
                      <div className="mt-1">
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                          v{entry.version}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div
                    className={cn(
                      "ml-16 md:ml-0",
                      i % 2 === 0 ? "md:order-2" : ""
                    )}
                  >
                    {/* Mobile date */}
                    <div className="mb-2 flex items-center gap-2 md:hidden">
                      <span className="text-xs text-muted-foreground">
                        {entry.date}
                      </span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        v{entry.version}
                      </span>
                    </div>

                    <div className="rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
                            typeBadge[entry.type]
                          )}
                        >
                          {entry.type}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-bold">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {entry.changes.map((change, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
