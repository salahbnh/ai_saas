"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Database,
  FolderTree,
  Key,
  Layers,
  Palette,
  Plug,
  Rocket,
  Scale,
  Shield,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Section = {
  id: string;
  title: string;
  icon: typeof BookOpen;
  content: string;
};

const sections: Section[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    content: `## Quick Setup (5 minutes)

1. **Clone the repository**
\`\`\`bash
git clone <your-repo-url> my-saas
cd my-saas
npm install
\`\`\`

2. **Copy the environment file**
\`\`\`bash
cp .env.example .env
\`\`\`

3. **Fill in your API keys** (see the Environment Variables section below)

4. **Push the database schema**
\`\`\`bash
npx prisma db push
\`\`\`

5. **Start the dev server**
\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000 and you're live.`,
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: Layers,
    content: `## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router, TypeScript) |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Auth** | Clerk |
| **Database** | Prisma + Neon Postgres |
| **Payments** | Stripe (subscriptions) |
| **AI** | Vercel AI SDK + OpenAI, Anthropic, Groq, Google |
| **Email** | Resend + React Email |
| **Rate Limiting** | Upstash Redis |
| **File Uploads** | UploadThing |
| **Animations** | Framer Motion |

## Design Principles

- **Modular**: Each AI tool is self-contained. Add or remove without affecting others.
- **Plan-gated**: Features, models, and quotas are controlled by subscription plans.
- **Provider-agnostic**: Swap AI providers by editing \`src/lib/ai/models.ts\`.
- **BYOK-ready**: Users can paste their own API keys to test premium models.`,
  },
  {
    id: "project-structure",
    title: "Project Structure",
    icon: FolderTree,
    content: `## Directory Layout

\`\`\`
src/
  app/
    (marketing)/       Landing, pricing, blog, docs, etc.
    (auth)/            Sign-in, sign-up, onboarding
    (dashboard)/       Protected app area
      dashboard/
        chat/          AI Chat tool (full)
        writer/        AI Writer tool (full)
        image/         AI Image tool (full)
        code/          AI Code (template only)
        translator/    AI Translator (template only)
        summarizer/    AI Summarizer (template only)
        voice/         AI Voice (template only)
        video/         AI Video (template only)
        documents/     Document management
        settings/      Profile, API keys, team
        usage/         Usage analytics
    (admin)/           Admin panel
    api/               API routes
  components/
    ui/                shadcn/ui primitives
    layout/            Navbar, footer, theme
    marketing/         Landing page sections
    dashboard/         Dashboard-specific components
  config/              App config, plans, blog content
  lib/                 Utilities, DB, auth, AI, email
  types/               TypeScript type definitions
\`\`\`

## Key Files

- \`src/config/app.ts\` — App name, links, feature toggles
- \`src/config/plans.ts\` — Subscription plans, limits, pricing
- \`src/lib/ai/models.ts\` — AI model registry
- \`prisma/schema.prisma\` — Database schema
- \`.env.example\` — All required environment variables`,
  },
  {
    id: "env-vars",
    title: "Environment Variables",
    icon: Key,
    content: `## Required Services

| Variable | Service | Free Tier? | Setup Link |
|----------|---------|-----------|------------|
| \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\` | Clerk (Auth) | Yes | dashboard.clerk.com |
| \`CLERK_SECRET_KEY\` | Clerk | Yes | Same as above |
| \`DATABASE_URL\` | Neon Postgres | Yes | console.neon.tech |
| \`STRIPE_SECRET_KEY\` | Stripe | Test mode free | dashboard.stripe.com |
| \`GROQ_API_KEY\` | Groq (AI) | Yes, no card | console.groq.com |
| \`GOOGLE_GENERATIVE_AI_API_KEY\` | Google Gemini | Yes, no card | aistudio.google.com |
| \`UPSTASH_REDIS_REST_URL\` | Upstash Redis | Yes | console.upstash.com |
| \`RESEND_API_KEY\` | Resend (Email) | Yes (100/day) | resend.com |
| \`UPLOADTHING_SECRET\` | UploadThing | Yes (2GB) | uploadthing.com |

## Optional (BYOK Models)

| Variable | Service | Notes |
|----------|---------|-------|
| \`OPENAI_API_KEY\` | OpenAI | For GPT-4o, DALL-E 3 |
| \`ANTHROPIC_API_KEY\` | Anthropic | For Claude models |

The template works fully on free tiers. Groq and Google provide free AI model access with no credit card required.`,
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    icon: Sparkles,
    content: `## Included Tools

### Fully Functional (with backend)
- **AI Chat** — Multi-turn conversation with model switching, message editing, regeneration
- **AI Writer** — 8 content templates (blog post, email, social media, etc.) with tone/length controls
- **AI Image** — DALL-E 3 image generation with gallery, lightbox, and download

### Template Only (UI preview, no backend)
- **AI Code** — Code generation, debugging, explanation, refactoring
- **AI Translator** — Multi-language translation with tone control
- **AI Summarizer** — Text/URL/PDF summarization
- **AI Voice** — Text-to-speech and speech-to-text
- **AI Video** — Text-to-video generation

Template-only tools show a Premium Add-on banner. They have fully designed forms that showcase the UI to your users.

## How to Enable a Template Tool

1. Create the API route at \`src/app/api/<tool>/route.ts\`
2. Add client state and fetch logic to the tool's \`page.tsx\`
3. Remove the \`ToolLockedBanner\` import and component
4. Set \`enable<Tool>: true\` in \`src/config/app.ts\``,
  },
  {
    id: "customization",
    title: "Customization Guide",
    icon: Palette,
    content: `## Branding

1. **App name and links** — Edit \`src/config/app.ts\`
2. **Logo** — Replace \`public/logo.svg\`
3. **Colors** — Edit CSS variables in \`src/app/globals.css\` (uses HSL)
4. **Fonts** — Change in \`src/app/layout.tsx\` (uses next/font)

## Subscription Plans

Edit \`src/config/plans.ts\` to change:
- Plan names and descriptions
- Monthly/yearly pricing
- Feature limits (messages, images, documents, etc.)
- Which AI models each plan can access

Then update Stripe Price IDs in \`.env\` to match.

## Adding a New AI Model

1. Open \`src/lib/ai/models.ts\`
2. Add to the \`availableModels\` array with id, name, provider, maxTokens, plans, description
3. Set the provider env var if needed

## Removing a Tool

1. Delete its folder from \`src/app/(dashboard)/dashboard/<tool>/\`
2. Delete its API route from \`src/app/api/<tool>/\` (if it has one)
3. Set \`enable<Tool>: false\` in \`src/config/app.ts\`
4. Remove from the navbar tools array in \`src/components/layout/navbar.tsx\``,
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    content: `## Schema

The Prisma schema is at \`prisma/schema.prisma\`. Key models:

- **User** — Synced from Clerk via webhooks
- **Subscription** — Stripe subscription status and plan
- **Conversation / Message** — Chat history
- **ImageGeneration** — Generated images gallery
- **Document** — Uploaded files for RAG
- **ApiKey** — User-generated API keys
- **Feedback** — User feedback/bug reports

## Common Commands

\`\`\`bash
npx prisma db push       # Push schema changes to DB
npx prisma generate      # Generate Prisma client
npx prisma studio        # Visual database browser
npx prisma migrate dev   # Create a migration (production)
\`\`\`

## Switching Databases

The template uses Neon Postgres. To switch to another Postgres provider:
1. Update \`DATABASE_URL\` and \`DIRECT_DATABASE_URL\` in \`.env\`
2. Run \`npx prisma db push\`
3. Done. Prisma handles the rest.`,
  },
  {
    id: "payments",
    title: "Payments & Billing",
    icon: Scale,
    content: `## Stripe Setup

1. Create products in Stripe Dashboard for Pro and Team plans
2. Copy the Price IDs into \`.env\`: \`STRIPE_PRO_PRICE_ID\` and \`STRIPE_TEAM_PRICE_ID\`
3. Set up a webhook endpoint pointing to \`/api/webhooks/stripe\`
4. Events to listen for:
- \`checkout.session.completed\`
- \`customer.subscription.updated\`
- \`customer.subscription.deleted\`
- \`invoice.payment_succeeded\`
- \`invoice.payment_failed\`

## How Billing Works

- Users click Upgrade on the pricing page
- They are redirected to Stripe Checkout
- On success, the webhook updates their subscription in the DB
- Plan limits are enforced in API routes via \`getPlan()\`
- Usage is tracked per month and resets automatically`,
  },
  {
    id: "deployment",
    title: "Deployment",
    icon: Terminal,
    content: `## Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to vercel.com and click Add New Project
3. Import your repository
4. Set the root directory to the project folder (if in a monorepo)
5. Add all \`.env\` variables in the Environment Variables section
6. Click Deploy

## Post-Deploy Checklist

- Update \`NEXT_PUBLIC_APP_URL\` to your Vercel domain
- Update Stripe webhook URL to production domain
- Verify email domain in Resend (optional, for custom sender)
- Switch Clerk to production instance (when ready for real users)

## Other Platforms

The template is a standard Next.js app. It can be deployed to:
- **Railway** — Add Postgres addon, set env vars
- **Render** — Static + web service, set env vars
- **AWS Amplify** — Import from Git, set env vars
- **Self-hosted** — \`npm run build && npm start\``,
  },
  {
    id: "scaling",
    title: "Scaling",
    icon: Zap,
    content: `## Performance Out of the Box

- **Edge-ready middleware** — Auth checks run at the edge
- **Rate limiting** — Upstash Redis prevents abuse
- **Connection pooling** — Neon pooler handles concurrent DB connections
- **Streaming** — AI responses stream token-by-token (no waiting)
- **Dynamic imports** — Heavy components load on demand

## Scaling Up

### More Users
- Upgrade Neon plan for more DB connections
- Upgrade Upstash for higher rate limit throughput

### More AI Tools
- Add new tool folders following the existing pattern
- Each tool is isolated and won't affect others
- Share the BYOK pattern for tools needing paid APIs

### More Models
- Add to \`availableModels\` in \`src/lib/ai/models.ts\`
- Gate behind plans as needed
- The AI SDK supports 20+ providers

### Team / Enterprise
- Clerk supports organizations and roles out of the box
- The admin panel at \`/admin\` provides user management
- Add RBAC by extending the middleware`,
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    content: `## Built-in Protections

- **Auth on every route** — Clerk middleware protects all non-public routes
- **Input validation** — Zod schemas on every API endpoint
- **Rate limiting** — Per-user limits on all AI endpoints
- **SQL injection** — Prisma parameterized queries prevent injection
- **XSS** — React auto-escapes all rendered content
- **API keys** — User-provided keys are never stored server-side (BYOK)
- **Secrets** — All sensitive values in env vars, never in client code

## Best Practices

- Never commit \`.env\` to Git (it is in \`.gitignore\`)
- Use Stripe test mode until you are ready for real payments
- Rotate API keys periodically
- Keep dependencies updated`,
  },
  {
    id: "api-reference",
    title: "API Reference",
    icon: Plug,
    content: `## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | \`/api/chat\` | Yes | Stream chat messages |
| POST | \`/api/writer\` | Yes | Stream generated content |
| POST | \`/api/image\` | Yes | Generate an image |
| GET | \`/api/image\` | Yes | List generated images |
| GET | \`/api/documents\` | Yes | List user documents |
| POST | \`/api/documents\` | Yes | Upload a document |
| GET | \`/api/usage\` | Yes | Get usage stats |
| GET/POST | \`/api/api-keys\` | Yes | Manage API keys |
| POST | \`/api/feedback\` | Yes | Submit feedback |
| POST | \`/api/webhooks/stripe\` | Webhook | Stripe events |
| POST | \`/api/uploadthing\` | Yes | File upload handler |

All authenticated endpoints require a valid Clerk session. Rate limits apply to AI generation endpoints.`,
  },
];

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="mb-3 mt-8 first:mt-0 text-lg font-semibold">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="mb-2 mt-6 text-base font-semibold">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={key++}
          className="my-3 overflow-x-auto rounded-lg border bg-muted/50 p-4 text-xs leading-relaxed"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
    } else if (line.startsWith("| ") && lines[i + 1]?.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      i--;
      const headers = tableLines[0]
        .split("|")
        .filter(Boolean)
        .map((h) => h.trim());
      const rows = tableLines.slice(2).map((r) =>
        r
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim())
      );
      elements.push(
        <div key={key++} className="my-3 overflow-x-auto rounded-lg border">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/30">
                {headers.map((h, j) => (
                  <th
                    key={j}
                    className="px-3 py-2 text-left font-medium text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j} className="border-b last:border-0">
                  {row.map((cell, k) => (
                    <td key={k} className="px-3 py-2">
                      <InlineCode text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} className="ml-4 list-disc py-0.5 text-sm text-muted-foreground">
          <InlineCode text={line.slice(2)} />
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      elements.push(
        <li key={key++} className="ml-4 list-decimal py-0.5 text-sm text-muted-foreground">
          <InlineCode text={line.replace(/^\d+\. /, "")} />
        </li>
      );
    } else if (line.trim() === "") {
      // skip blank
    } else {
      elements.push(
        <p key={key++} className="py-1 text-sm text-muted-foreground">
          <InlineCode text={line} />
        </p>
      );
    }
    i++;
  }

  return <div>{elements}</div>;
}

function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground"
          >
            {part.slice(1, -1)}
          </code>
        ) : part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function DocsPageClient() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const current = sections.find((s) => s.id === activeSection) ?? sections[0];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/25">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Documentation</h1>
        <p className="mt-2 text-muted-foreground">
          Everything you need to customize, deploy, and scale this template.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150 cursor-pointer",
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {section.title}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile section selector */}
        <div className="lg:hidden">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm cursor-pointer"
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div className="min-w-0">
          <div className="rounded-xl border bg-background p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <current.icon className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-heading text-xl font-semibold">{current.title}</h2>
            </div>
            <MarkdownContent content={current.content} />
          </div>

          {/* Next/Prev navigation */}
          <div className="mt-6 flex justify-between">
            {(() => {
              const idx = sections.findIndex((s) => s.id === activeSection);
              const prev = idx > 0 ? sections[idx - 1] : null;
              const next = idx < sections.length - 1 ? sections[idx + 1] : null;
              return (
                <>
                  {prev ? (
                    <button
                      onClick={() => setActiveSection(prev.id)}
                      className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-150 hover:border-primary/30 hover:text-foreground cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4 rotate-180" />
                      {prev.title}
                    </button>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <button
                      onClick={() => setActiveSection(next.id)}
                      className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-150 hover:border-primary/30 hover:text-foreground cursor-pointer"
                    >
                      {next.title}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <div />
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
