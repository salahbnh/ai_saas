# 🤖 AI SaaS Platform

A production-style, multi-model **AI SaaS** built with Next.js 14 — a full suite of AI tools behind authentication, subscription billing, and per-user usage metering. One workspace for chat, code, image, voice, document and writing tools, powered by multiple LLM providers through a unified interface.

> **Stack:** Next.js 14 (App Router) · TypeScript · Prisma + Neon Postgres · Clerk · Stripe · Vercel AI SDK + LangChain · Tailwind / shadcn-ui

<!-- TODO: add a hero screenshot or 30s demo GIF here — see "Demo" below -->

---

## ✨ Features

**AI tools (dashboard)**
- 💬 **Chat** — multi-conversation assistant with persisted history and model selection
- 🖼️ **Image generation** — text-to-image with stored generation history
- 🎙️ **Voice** & 🎬 **Video** tools
- ✍️ **Writer**, **Summarizer**, **Translator** — content generation utilities
- 💻 **Code** assistant and an interactive **Playground**
- 📄 **Documents** — upload & parse PDF / DOCX (pdf-parse, mammoth) for AI Q&A

**Platform**
- 🔐 **Auth & onboarding** via Clerk, with role-based access (user / admin)
- 💳 **Subscription billing** via Stripe — plans, checkout, and webhook-driven sync
- 📊 **Usage metering & rate limiting** (Upstash Redis) per user and plan
- 🔑 **API keys** management for programmatic access
- 🛠️ **Admin panel** — user management and feedback review
- 🌐 **Marketing site** — pricing, blog, docs, changelog, contact, legal pages

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Framework | Next.js 14 (App Router, Server Actions), React 18, TypeScript |
| AI | Vercel AI SDK, LangChain — OpenAI, Anthropic, Google, Groq |
| Auth | Clerk (incl. webhooks) |
| Payments | Stripe (Checkout + webhooks) |
| Database | Neon Postgres + Prisma ORM |
| Infra | Upstash Redis (rate limiting), UploadThing (uploads), Resend (email) |
| UI | Tailwind CSS, shadcn-ui / Radix, Framer Motion, Lucide |

## 🏗️ Architecture

- **Route groups** split the app into `(marketing)`, `(auth)`, `(dashboard)` and `(admin)` for clean separation of concerns.
- **API routes** (`/api/chat`, `/api/image`, `/api/documents`, `/api/writer`, …) stream model responses; **webhooks** (`/api/webhooks/clerk`, `/api/webhooks/stripe`) keep users and subscriptions in sync.
- **Prisma models:** `User`, `Subscription`, `Conversation`, `Message`, `Document`, `ApiKey`, `ImageGeneration`, `Feedback` — with enums for roles, plans and statuses.
- **Server Actions** handle billing, onboarding, profile and chat mutations.

## 🚀 Getting Started

```bash
git clone https://github.com/salahbnh/ai_saas.git
cd ai_saas
npm install            # runs prisma generate via postinstall
cp .env.example .env   # fill in the keys below
npm run db:push        # sync schema to your database
npm run dev            # http://localhost:3000
```

### Environment variables
```env
DATABASE_URL=                 # Neon Postgres connection string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
GROQ_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
UPLOADTHING_TOKEN=
RESEND_API_KEY=
```

## 📸 Demo

<!-- Add screenshots of the dashboard, chat, and pricing page, or a short demo video here. -->

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run db:push` | Push Prisma schema to the database |
| `npm run db:studio` | Open Prisma Studio |

---

Built by [Salah Bounouh](https://github.com/salahbnh) · [Portfolio](https://github.com/salahbnh) · [LinkedIn](https://www.linkedin.com/in/salah-bounouh-1426ba27b/)
