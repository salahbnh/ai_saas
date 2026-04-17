import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your access to and use of the NexusAI platform, tools, and services.",
};

const lastUpdated = "April 1, 2026";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      'By accessing or using NexusAI ("the Platform", "the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these terms.',
  },
  {
    title: "2. Description of Service",
    content:
      "NexusAI is an AI-powered platform that provides access to multiple artificial intelligence tools including text generation, image generation, code generation, translation, summarization, voice synthesis, and video generation. The Service is provided on a subscription basis with free and paid tiers.",
  },
  {
    title: "3. Account Registration",
    content:
      "You must create an account to use NexusAI. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration and keep it updated. You must be at least 16 years old to create an account.",
  },
  {
    title: "4. Subscriptions & Billing",
    content:
      "NexusAI offers free (Starter) and paid (Pro, Team) subscription plans. Paid subscriptions are billed monthly or annually through Stripe. Prices are listed on our pricing page and may change with 30 days' notice. You can upgrade, downgrade, or cancel your subscription at any time from your account settings.\n\nRefunds: We offer a 14-day money-back guarantee on all paid plans. After 14 days, refunds are provided at our discretion. Contact support@nexusai.com for refund requests.\n\nFree trials: Pro and Team plans include a 7-day free trial. You will not be charged until the trial period ends. You can cancel before the trial expires to avoid charges.",
  },
  {
    title: "5. Usage Limits",
    content:
      "Each subscription plan has defined usage limits including message quotas, conversation limits, document upload caps, and API rate limits. These limits are detailed on our pricing page and in your account dashboard. Exceeding your plan limits will result in temporary restrictions until your next billing cycle or until you upgrade your plan. We will notify you at 80% and 100% of your usage limits.",
  },
  {
    title: "6. Acceptable Use",
    content:
      "You agree not to use NexusAI to:\n\n• Generate content that is illegal, harmful, threatening, abusive, defamatory, or violates any applicable law\n• Create deepfakes, non-consensual intimate imagery, or content designed to deceive or defraud\n• Harass, impersonate, or harm other individuals\n• Attempt to reverse-engineer, decompile, or extract the AI models used by the platform\n• Circumvent usage limits, rate limits, or security measures\n• Use automated scripts, bots, or scrapers to access the Service beyond the provided API\n• Redistribute, resell, or sublicense access to the Service without written permission\n• Upload malicious files, viruses, or content designed to compromise system security\n\nViolation of these terms may result in immediate account suspension or termination.",
  },
  {
    title: "7. Content Ownership & License",
    content:
      "Your Content: You retain full ownership of all content you create using NexusAI, including generated text, images, code, audio, and video. You may use this content for any purpose, including commercial use, without additional licensing fees.\n\nLicense to Us: By using the Service, you grant NexusAI a limited, non-exclusive license to process your inputs and prompts solely for the purpose of generating outputs and providing the Service. We do not use your content to train AI models.\n\nFeedback: If you provide feedback, suggestions, or ideas about the Service, we may use them without obligation to you.",
  },
  {
    title: "8. AI-Generated Content Disclaimer",
    content:
      "AI-generated content may contain errors, inaccuracies, or biases. NexusAI does not guarantee the accuracy, completeness, or suitability of any generated content. You are responsible for reviewing and validating all AI outputs before use, especially in professional, legal, medical, or financial contexts. AI-generated code should be reviewed and tested before deployment to production systems.",
  },
  {
    title: "9. API Usage",
    content:
      "Pro and Team plan subscribers may access the NexusAI API subject to rate limits defined by their plan. API keys are confidential and must not be shared publicly. You are responsible for all API usage under your keys. We reserve the right to revoke API access if usage patterns indicate abuse or violation of these terms.",
  },
  {
    title: "10. Privacy",
    content:
      "Your use of NexusAI is also governed by our Privacy Policy, which describes how we collect, use, and protect your information. By using the Service, you consent to our data practices as described in the Privacy Policy.",
  },
  {
    title: "11. Intellectual Property",
    content:
      'The NexusAI platform, including its design, code, branding, documentation, and proprietary technology, is owned by NexusAI Inc. and protected by intellectual property laws. "NexusAI" and associated logos are trademarks of NexusAI Inc. Nothing in these terms grants you rights to use our trademarks without prior written consent.',
  },
  {
    title: "12. Third-Party Services",
    content:
      "NexusAI integrates with third-party AI model providers (OpenAI, Anthropic, Google, Meta, Groq, ElevenLabs, Stability AI) and service providers (Clerk, Stripe, Vercel, Neon). Your use of NexusAI may be subject to additional terms from these providers. We are not responsible for third-party service availability or performance.",
  },
  {
    title: "13. Service Availability",
    content:
      "We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We may perform scheduled maintenance with advance notice. We are not liable for downtime caused by factors beyond our control, including third-party outages, network issues, or force majeure events.",
  },
  {
    title: "14. Limitation of Liability",
    content:
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEXUSAI AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY. OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.",
  },
  {
    title: "15. Indemnification",
    content:
      "You agree to indemnify and hold harmless NexusAI from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from your use of the Service, violation of these terms, or infringement of any third-party rights.",
  },
  {
    title: "16. Termination",
    content:
      "You may terminate your account at any time from your account settings. We may suspend or terminate your account if you violate these terms, engage in fraudulent activity, or fail to pay subscription fees. Upon termination, your right to use the Service ceases immediately. We will retain your data for 30 days after account deletion, after which it will be permanently removed.",
  },
  {
    title: "17. Changes to Terms",
    content:
      "We may modify these Terms of Service at any time. Material changes will be communicated via email or a prominent notice on the platform at least 30 days before they take effect. Continued use of the Service after changes constitutes acceptance of the updated terms.",
  },
  {
    title: "18. Governing Law",
    content:
      "These terms are governed by the laws of the State of California, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of San Francisco County, California.",
  },
  {
    title: "19. Contact",
    content:
      "For questions about these Terms of Service, contact us at:\n\n• Email: legal@nexusai.com\n• Address: NexusAI Inc., 548 Market St, Suite 36879, San Francisco, CA 94104",
  },
];

export default function TermsPage() {
  return (
    <div className="relative pt-28 md:pt-36 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-sm text-primary">
              <FileText className="h-3.5 w-3.5" />
              Legal
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Please read these Terms of Service carefully before using NexusAI.
              These terms govern your access to and use of our platform, tools,
              and services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-xl font-bold mb-4">
                  {section.title}
                </h2>
                <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 rounded-xl border bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Questions about these terms?{" "}
              <Link
                href="/contact"
                className="text-primary hover:underline cursor-pointer"
              >
                Contact our legal team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
