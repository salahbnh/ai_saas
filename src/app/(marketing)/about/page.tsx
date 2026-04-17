import type { Metadata } from "next";
import { AboutPageClient } from "@/components/marketing/about-page-client";

export const metadata: Metadata = {
  title: "About",
  description:
    "NexusAI is building the all-in-one AI workspace that replaces a dozen separate tools. Meet the team, mission, and values behind the platform.",
  openGraph: {
    title: "About NexusAI",
    description:
      "One platform for every AI tool. Meet the team and mission behind NexusAI.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
