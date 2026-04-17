import type { Metadata } from "next";
import { BlogPageClient } from "@/components/marketing/blog-page-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Product updates, engineering deep dives, tutorials, and AI industry insights from the NexusAI team.",
  openGraph: {
    title: "NexusAI Blog",
    description:
      "Product updates, tutorials, and AI insights from the NexusAI team.",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
