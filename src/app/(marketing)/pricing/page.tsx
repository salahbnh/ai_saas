import type { Metadata } from "next";
import { PricingPageClient } from "@/components/marketing/pricing-page-client";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for NexusAI. Start free, scale as you grow. All plans include access to our core AI tools with no hidden fees.",
  openGraph: {
    title: "NexusAI Pricing",
    description:
      "Free, Pro, and Team plans. Start free — no credit card required.",
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
