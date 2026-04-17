import {
  Sparkles,
  Video,
  Mic,
  Zap,
  Shield,
  Globe,
  Image,
  Code2,
  MessageSquare,
  PenLine,
  type LucideIcon,
} from "lucide-react";

export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  description: string;
  type: "feature" | "improvement" | "fix";
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  changes: string[];
};

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "2.4.0",
    date: "Apr 10, 2026",
    title: "AI Video Generation",
    description:
      "Generate professional-quality videos from text prompts. Our eighth AI tool brings text-to-video capabilities to the platform.",
    type: "feature",
    icon: Video,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    changes: [
      "Text-to-video generation with up to 1440p resolution",
      "4–6 second video clips with customizable aspect ratio",
      "Multiple style presets: cinematic, anime, realistic, abstract",
      "Video gallery with download and sharing options",
      "3 free generations for Starter plan users",
    ],
  },
  {
    version: "2.3.0",
    date: "Mar 25, 2026",
    title: "AI Voice — Text-to-Speech & Transcription",
    description:
      "Convert text to natural-sounding speech in 30+ languages, or transcribe audio files to text with high accuracy.",
    type: "feature",
    icon: Mic,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-500/10",
    changes: [
      "Text-to-speech with 50+ voice options",
      "Speech-to-text transcription with speaker detection",
      "Support for 30+ languages and accents",
      "Adjustable speed, pitch, and tone controls",
      "Batch processing for multiple audio files",
    ],
  },
  {
    version: "2.2.1",
    date: "Mar 15, 2026",
    title: "Performance & Reliability Improvements",
    description:
      "Major infrastructure upgrade delivering faster response times and improved uptime across all tools.",
    type: "improvement",
    icon: Zap,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    changes: [
      "40% faster response times for AI Chat",
      "Reduced image generation latency by 2 seconds",
      "Improved streaming stability for long-form content",
      "Added automatic retry logic for transient API failures",
      "99.9% uptime SLA now backed by infrastructure redundancy",
    ],
  },
  {
    version: "2.2.0",
    date: "Mar 1, 2026",
    title: "Multi-Model Support & Model Routing",
    description:
      "Choose from multiple AI models or let NexusAI automatically select the best model for your task.",
    type: "feature",
    icon: Globe,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
    changes: [
      "Added Claude 3.5 Sonnet support for chat and code generation",
      "Added Llama 3.1 70B for Team plan users",
      "Intelligent model routing — auto-selects the best model per task",
      "Model comparison view to test prompts across providers",
      "Per-conversation model selection with memory",
    ],
  },
  {
    version: "2.1.0",
    date: "Feb 15, 2026",
    title: "Team Plan & Collaboration",
    description:
      "Introducing the Team plan with shared workspaces, team analytics, and collaboration features.",
    type: "feature",
    icon: Shield,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    changes: [
      "Team plan with up to 10 seats",
      "Shared conversation history and templates",
      "Team usage analytics dashboard",
      "Role-based access control (Admin, Member)",
      "Centralized billing and seat management",
    ],
  },
  {
    version: "2.0.0",
    date: "Feb 1, 2026",
    title: "NexusAI 2.0 — Complete Platform Redesign",
    description:
      "A ground-up redesign with a new dashboard, improved navigation, and 3 new AI tools.",
    type: "feature",
    icon: Sparkles,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    changes: [
      "Completely redesigned dashboard with sidebar navigation",
      "New dark mode with emerald accent theme",
      "AI Translator tool — translate content across 50+ languages",
      "AI Summarizer tool — summarize text, PDFs, and URLs",
      "AI Code tool — generate, explain, and debug code",
      "Conversation search and filtering",
      "Keyboard shortcuts for power users",
    ],
  },
  {
    version: "1.5.0",
    date: "Jan 15, 2026",
    title: "API Access & Developer Tools",
    description:
      "Full REST API for programmatic access to all NexusAI tools, plus a developer dashboard for managing API keys.",
    type: "feature",
    icon: Code2,
    iconColor: "text-lime-500",
    iconBg: "bg-lime-500/10",
    changes: [
      "REST API with full documentation",
      "API key management dashboard",
      "Rate limiting with clear usage headers",
      "Webhook support for async operations",
      "SDK packages for Node.js and Python",
    ],
  },
  {
    version: "1.4.0",
    date: "Dec 20, 2025",
    title: "AI Image Generation",
    description:
      "Text-to-image generation powered by DALL-E 3 and Stable Diffusion XL, with a built-in gallery.",
    type: "feature",
    icon: Image,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    changes: [
      "Text-to-image generation with DALL-E 3",
      "Stable Diffusion XL for advanced control",
      "Image gallery with favorites and collections",
      "Multiple aspect ratios and resolution options",
      "Style presets: photorealistic, illustration, 3D, anime",
    ],
  },
  {
    version: "1.2.0",
    date: "Nov 10, 2025",
    title: "AI Writer — Long-Form Content Generation",
    description:
      "Generate blog posts, articles, marketing copy, and more with AI-powered writing templates.",
    type: "feature",
    icon: PenLine,
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/10",
    changes: [
      "15+ writing templates (blog post, email, ad copy, etc.)",
      "Tone and style controls",
      "SEO optimization suggestions",
      "Export to Markdown, HTML, or plain text",
      "Document history with version comparison",
    ],
  },
  {
    version: "1.0.0",
    date: "Oct 1, 2025",
    title: "NexusAI Launch — AI Chat",
    description:
      "The initial launch of NexusAI with multi-model AI Chat as the first tool.",
    type: "feature",
    icon: MessageSquare,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    changes: [
      "Multi-turn AI chat with conversation history",
      "GPT-4o Mini model support",
      "Conversation management (rename, delete, archive)",
      "Markdown rendering with code syntax highlighting",
      "Responsive design with mobile support",
      "Clerk authentication with social login",
      "Stripe subscription billing",
    ],
  },
];
