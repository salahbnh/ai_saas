import type { Metadata } from "next";
import { ContactPageClient } from "@/components/marketing/contact-page-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a question, feedback, or partnership inquiry? Get in touch with the NexusAI team.",
  openGraph: {
    title: "Contact NexusAI",
    description: "Reach the NexusAI team for support, sales, or partnerships.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
