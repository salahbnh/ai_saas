import type { Metadata } from "next";
import { DocsPageClient } from "@/components/marketing/docs-page-client";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Everything you need to customize, extend, and deploy the NexusAI SaaS starter template. Setup guides, architecture overview, and customization recipes.",
  openGraph: {
    title: "NexusAI Documentation",
    description:
      "Setup guides, architecture, and customization recipes for the NexusAI template.",
  },
};

export default function DocsPage() {
  return <DocsPageClient />;
}
