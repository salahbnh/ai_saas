"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { blogPosts, blogCategories } from "@/config/blog";
import { AuroraBackground } from "@/components/marketing/aurora-background";

export function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featured = blogPosts.filter((p) => p.featured);

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
              Blog
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Insights &{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
                Updates
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Product updates, engineering deep dives, tutorials, and AI
              industry insights from the NexusAI team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-2xl border bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl cursor-pointer h-full"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl",
                          post.categoryColor
                        )}
                      >
                        <post.icon className="h-5 w-5" />
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          post.categoryColor
                        )}
                      >
                        {post.category.charAt(0).toUpperCase() +
                          post.category.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Featured
                      </span>
                    </div>
                    <h2 className="font-heading text-xl font-bold leading-tight transition-colors duration-200 group-hover:text-primary sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${post.author.avatarColor} text-xs font-bold text-white`}
                        >
                          {post.author.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {post.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category filter + grid */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="container relative mx-auto px-4 lg:px-8">
          {/* Category tabs */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Post grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 * i }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg cursor-pointer h-full"
                >
                  {/* Category + read time */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        post.categoryColor
                      )}
                    >
                      {post.category.charAt(0).toUpperCase() +
                        post.category.slice(1)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold leading-snug transition-colors duration-200 group-hover:text-primary">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author + arrow */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${post.author.avatarColor} text-[10px] font-bold text-white`}
                      >
                        {post.author.initials}
                      </div>
                      <div>
                        <p className="text-xs font-medium">
                          {post.author.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {post.date}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:text-primary group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              No posts found in this category yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
