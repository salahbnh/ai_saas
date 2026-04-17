import type { Metadata } from "next";
import { ChangelogPageClient } from "@/components/marketing/changelog-page-client";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "All the latest features, improvements, and fixes shipped to NexusAI.",
  openGraph: {
    title: "NexusAI Changelog",
    description: "Latest features, improvements, and fixes shipped to NexusAI.",
  },
};

export default function ChangelogPage() {
  return <ChangelogPageClient />;
}
