import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how NexusAI collects, uses, shares, and protects your personal information when you use our platform and services.",
};

const lastUpdated = "April 1, 2026";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Account Information",
        text: "When you create a NexusAI account, we collect your name, email address, and authentication credentials through our third-party auth provider (Clerk). If you subscribe to a paid plan, payment information is processed securely by Stripe — we never store your full credit card number.",
      },
      {
        subtitle: "Usage Data",
        text: "We collect information about how you interact with our platform, including the AI tools you use, number of generations, conversation metadata (not content), timestamps, and device/browser information. This helps us improve performance and personalize your experience.",
      },
      {
        subtitle: "Generated Content",
        text: "Content you generate using NexusAI (text, images, code, audio, video) is stored on our servers to provide conversation history and gallery features. You own all content you generate.",
      },
      {
        subtitle: "Uploaded Files",
        text: "If you upload documents for the AI Summarizer or RAG features, files are processed and stored securely. You can delete uploaded files at any time from your dashboard.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        text: "We use your information to:",
      },
      {
        text: "• Provide and maintain the NexusAI platform and all AI tools\n• Process your subscriptions and manage billing\n• Send transactional emails (receipts, usage alerts, security notifications)\n• Improve our AI models and platform performance through aggregated, anonymized usage analytics\n• Enforce our Terms of Service and prevent abuse\n• Respond to support requests\n• Send product updates and marketing emails (with your consent, and you can unsubscribe anytime)",
      },
    ],
  },
  {
    title: "3. How We Share Your Information",
    content: [
      {
        text: "We do not sell your personal information. We share data only with:",
      },
      {
        text: "• **Service providers**: Clerk (authentication), Stripe (payments), Vercel (hosting), Neon (database), OpenAI/Anthropic/Groq (AI model providers), Resend (email), Upstash (rate limiting), UploadThing (file storage)\n• **AI model providers**: Prompts and inputs are sent to AI providers to generate responses. We do not send your personal information — only the content you submit for generation\n• **Legal requirements**: We may disclose information if required by law, regulation, or legal process\n• **Business transfers**: In the event of a merger, acquisition, or sale of assets, your information may be transferred",
      },
    ],
  },
  {
    title: "4. Data Security",
    content: [
      {
        text: "We implement industry-standard security measures including:",
      },
      {
        text: "• Encryption in transit (TLS 1.3) and at rest (AES-256)\n• SOC 2 compliant infrastructure through our hosting providers\n• Regular security audits and penetration testing\n• Role-based access controls for internal systems\n• Automatic session expiration and secure token management",
      },
    ],
  },
  {
    title: "5. Data Retention",
    content: [
      {
        text: "We retain your data for as long as your account is active. After account deletion:",
      },
      {
        text: "• Personal information is deleted within 30 days\n• Generated content is deleted within 30 days\n• Uploaded files are deleted immediately\n• Anonymized usage analytics may be retained indefinitely\n• Billing records are retained as required by tax law (typically 7 years)",
      },
    ],
  },
  {
    title: "6. Your Rights",
    content: [
      {
        text: "Depending on your jurisdiction, you may have the right to:",
      },
      {
        text: "• Access the personal information we hold about you\n• Correct inaccurate information\n• Delete your account and associated data\n• Export your data in a portable format\n• Opt out of marketing communications\n• Object to certain processing activities\n• Lodge a complaint with your local data protection authority",
      },
      {
        text: "To exercise any of these rights, contact us at privacy@nexusai.com or use the data management tools in your account settings.",
      },
    ],
  },
  {
    title: "7. Cookies & Tracking",
    content: [
      {
        text: "We use essential cookies for authentication and session management. We use analytics cookies (with your consent) to understand how the platform is used. We do not use advertising trackers. You can manage cookie preferences in your browser settings.",
      },
    ],
  },
  {
    title: "8. Children's Privacy",
    content: [
      {
        text: "NexusAI is not intended for users under 16 years of age. We do not knowingly collect personal information from children. If we discover that a child under 16 has created an account, we will delete it promptly.",
      },
    ],
  },
  {
    title: "9. International Data Transfers",
    content: [
      {
        text: "Your data may be processed in the United States and other countries where our service providers operate. We ensure appropriate safeguards are in place for international transfers, including Standard Contractual Clauses where applicable.",
      },
    ],
  },
  {
    title: "10. Changes to This Policy",
    content: [
      {
        text: "We may update this Privacy Policy from time to time. We will notify you of material changes via email or a prominent notice on the platform. Continued use of NexusAI after changes constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    title: "11. Contact Us",
    content: [
      {
        text: "If you have questions about this Privacy Policy or our data practices, contact us at:\n\n• Email: privacy@nexusai.com\n• Address: NexusAI Inc., 548 Market St, Suite 36879, San Francisco, CA 94104",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative pt-28 md:pt-36 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-sm text-primary">
              <Shield className="h-3.5 w-3.5" />
              Legal
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              At NexusAI, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, share, and protect your personal
              information when you use our platform and services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-xl font-bold mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((block, j) => (
                    <div key={j}>
                      {"subtitle" in block && block.subtitle && (
                        <h3 className="font-semibold text-[15px] mb-1.5">
                          {block.subtitle}
                        </h3>
                      )}
                      <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {block.text.split("\n").map((line, k) => {
                          // Handle bold markdown
                          if (line.includes("**")) {
                            return (
                              <span
                                key={k}
                                className="block"
                                dangerouslySetInnerHTML={{
                                  __html: line.replace(
                                    /\*\*(.*?)\*\*/g,
                                    '<strong class="text-foreground">$1</strong>'
                                  ),
                                }}
                              />
                            );
                          }
                          return (
                            <span key={k} className="block">
                              {line}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-16 rounded-xl border bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Have questions about your data?{" "}
              <Link
                href="/contact"
                className="text-primary hover:underline cursor-pointer"
              >
                Contact our privacy team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
