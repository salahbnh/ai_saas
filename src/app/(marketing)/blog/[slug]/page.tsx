import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { blogPosts, getBlogPost } from "@/config/blog";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — NexusAI Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Simple markdown-like rendering: split content into paragraphs and handle headings/code
  const blocks = post.content.split("\n\n");

  return (
    <div className="relative pt-28 md:pt-36 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>

        <article className="mx-auto max-w-3xl">
          {/* Category + meta */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                post.categoryColor
              )}
            >
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {/* Author */}
          <div className="mt-8 flex items-center gap-4 border-b pb-8">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${post.author.avatarColor} text-sm font-bold text-white shadow-md`}
            >
              {post.author.initials}
            </div>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {post.author.role}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose-custom mt-10 space-y-5">
            {blocks.map((block, i) => {
              const trimmed = block.trim();

              // Heading 2
              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="font-heading mt-10 mb-4 text-2xl font-bold tracking-tight"
                  >
                    {trimmed.slice(3)}
                  </h2>
                );
              }

              // Heading 3
              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={i}
                    className="font-heading mt-8 mb-3 text-xl font-bold"
                  >
                    {trimmed.slice(4)}
                  </h3>
                );
              }

              // Code block
              if (trimmed.startsWith("```")) {
                const lines = trimmed.split("\n");
                const lang = lines[0].replace("```", "").trim();
                const code = lines.slice(1, -1).join("\n");
                return (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border bg-card"
                  >
                    {lang && (
                      <div className="border-b bg-muted/50 px-4 py-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          {lang}
                        </span>
                      </div>
                    )}
                    <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                      <code>{code}</code>
                    </pre>
                  </div>
                );
              }

              // Unordered list
              if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n").filter((l) => l.trim());
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {items.map((item, j) => {
                      const text = item.replace(/^- /, "").trim();
                      return (
                        <li key={j} className="flex items-start gap-3 text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span
                            className="text-[15px] leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: text
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-foreground font-semibold">$1</strong>'
                                )
                                .replace(
                                  /`(.*?)`/g,
                                  '<code class="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">$1</code>'
                                ),
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                );
              }

              // Ordered list
              if (/^\d+\. /.test(trimmed)) {
                const items = trimmed.split("\n").filter((l) => l.trim());
                return (
                  <ol key={i} className="space-y-2 pl-1">
                    {items.map((item, j) => {
                      const text = item.replace(/^\d+\.\s*/, "").trim();
                      return (
                        <li key={j} className="flex items-start gap-3 text-muted-foreground">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {j + 1}
                          </span>
                          <span
                            className="text-[15px] leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: text
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-foreground font-semibold">$1</strong>'
                                )
                                .replace(
                                  /`(.*?)`/g,
                                  '<code class="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">$1</code>'
                                ),
                            }}
                          />
                        </li>
                      );
                    })}
                  </ol>
                );
              }

              // Regular paragraph
              return (
                <p
                  key={i}
                  className="text-[15px] leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: trimmed
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-foreground font-semibold">$1</strong>'
                      )
                      .replace(
                        /`(.*?)`/g,
                        '<code class="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">$1</code>'
                      ),
                  }}
                />
              );
            })}
          </div>

          {/* Post footer */}
          <div className="mt-16 rounded-xl border bg-card p-8 text-center">
            <h3 className="font-heading text-xl font-bold">
              Try NexusAI Free
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Start creating with all 8 AI tools today. No credit card required.
            </p>
            <Link
              href="/sign-up"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary/90 cursor-pointer"
            >
              Get Started Free
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
