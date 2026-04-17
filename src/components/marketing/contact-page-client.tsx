"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  Bug,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/marketing/aurora-background";

const contactReasons = [
  {
    icon: HelpCircle,
    label: "General Inquiry",
    value: "general",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: MessageSquare,
    label: "Sales & Pricing",
    value: "sales",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Bug,
    label: "Bug Report",
    value: "bug",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Briefcase,
    label: "Partnership",
    value: "partnership",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@nexusai.com",
    description: "For general inquiries and support",
  },
  {
    icon: MessageSquare,
    label: "Live Chat",
    value: "Available in-app",
    description: "Mon–Fri, 9am–6pm PST",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "San Francisco, CA",
    description: "548 Market St, Suite 36879",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Under 24 hours",
    description: "Priority support for Pro & Team plans",
  },
];

export function ContactPageClient() {
  const [selectedReason, setSelectedReason] = useState("general");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // Template: wire up to your email/support API (e.g. /api/contact → Resend)
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    toast.success("Message sent — we'll reply within 24 hours.");
  };

  const resetForm = () => {
    setFormState({ name: "", email: "", subject: "", message: "" });
    setSelectedReason("general");
    setStatus("idle");
  };

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
              Contact
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Get in{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
                Touch
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Have a question, feedback, or just want to say hello? We&apos;d
              love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="rounded-xl border bg-card p-5 text-center transition-all duration-300 hover:border-primary/20 hover:shadow-md"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-semibold">{info.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border bg-card p-8 shadow-lg md:p-10"
            >
              <h2 className="font-heading text-2xl font-bold mb-6">
                Send us a message
              </h2>

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.05,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10"
                    >
                      <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                    </motion.div>
                    <h3 className="font-heading text-xl font-bold">
                      Message sent!
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Thanks for reaching out. Our team will get back to you
                      within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 cursor-pointer"
                      onClick={resetForm}
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
              {/* Reason selector */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                  What can we help with?
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {contactReasons.map((reason) => (
                    <button
                      key={reason.value}
                      type="button"
                      onClick={() => setSelectedReason(reason.value)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all duration-200 cursor-pointer",
                        selectedReason === reason.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-background text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      <reason.icon className="h-4 w-4" />
                      {reason.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="h-10 w-full rounded-lg border bg-background px-3 text-sm transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="h-10 w-full rounded-lg border bg-background px-3 text-sm transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    className="h-10 w-full rounded-lg border bg-background px-3 text-sm transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="w-full cursor-pointer bg-gradient-to-r from-primary to-primary/80 font-semibold shadow-lg shadow-primary/25 disabled:opacity-80"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ callout */}
      <section className="relative pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-xl border bg-card p-8 text-center">
            <HelpCircle className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h3 className="font-heading text-xl font-bold">
              Looking for quick answers?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Check our FAQ section on the homepage or browse our blog for
              tutorials and guides.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/#faq">
                <Button
                  variant="outline"
                  className="cursor-pointer min-w-[140px]"
                >
                  View FAQ
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="cursor-pointer min-w-[140px]"
                >
                  Read Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
