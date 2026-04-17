import {
  MessageSquare,
  PenLine,
  Image,
  Code2,
  Sparkles,
  Zap,
  TrendingUp,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryColor: string;
  author: {
    name: string;
    role: string;
    initials: string;
    avatarColor: string;
  };
  date: string;
  readTime: string;
  featured?: boolean;
  icon: LucideIcon;
};

export const blogCategories = [
  { name: "All", value: "all" },
  { name: "Product", value: "product" },
  { name: "Engineering", value: "engineering" },
  { name: "Tutorials", value: "tutorials" },
  { name: "Company", value: "company" },
  { name: "AI Trends", value: "ai-trends" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-nexusai-video-generation",
    title: "Introducing AI Video Generation — Create Stunning Videos from Text",
    excerpt:
      "Our newest AI tool lets you generate professional-quality videos from simple text prompts. No editing skills required.",
    content: `We're thrilled to announce the launch of AI Video Generation, the eighth tool in the NexusAI platform. This feature brings state-of-the-art text-to-video capabilities directly into your workspace.

## What You Can Create

With AI Video Generation, you can produce:

- **Product demos** — Showcase your product features with AI-generated walkthroughs
- **Social media content** — Create eye-catching short-form videos for Instagram, TikTok, and YouTube Shorts
- **Explainer videos** — Turn complex concepts into visual narratives
- **Marketing clips** — Generate promotional content in minutes, not hours

## How It Works

Simply describe what you want to see, and our AI handles the rest. The model understands natural language descriptions and translates them into fluid, high-quality video sequences.

\`\`\`
Prompt: "A modern laptop on a minimalist desk, camera slowly zooming in,
warm golden hour lighting, cinematic depth of field"
\`\`\`

The AI processes your prompt and generates a 4–6 second video clip at up to 1440p resolution. You can iterate on the result by refining your prompt or adjusting parameters like duration, aspect ratio, and style.

## Available on Pro and Team Plans

AI Video Generation is available immediately for all Pro and Team plan subscribers. Starter plan users can try it with 3 free generations to experience the quality firsthand.

We're just getting started with video — expect longer durations, audio integration, and style transfer features in the coming months.`,
    category: "product",
    categoryColor: "text-emerald-500 bg-emerald-500/10",
    author: {
      name: "Sarah Chen",
      role: "Product Lead",
      initials: "SC",
      avatarColor: "from-emerald-500 to-green-600",
    },
    date: "Apr 10, 2026",
    readTime: "4 min read",
    featured: true,
    icon: Sparkles,
  },
  {
    slug: "how-we-built-real-time-ai-streaming",
    title: "How We Built Real-Time AI Streaming with Vercel AI SDK",
    excerpt:
      "A deep dive into our streaming architecture — how we deliver token-by-token responses with sub-100ms latency.",
    content: `One of the most important aspects of any AI application is perceived speed. Users don't want to wait 10 seconds staring at a loading spinner. They want to see the AI thinking in real time.

## The Challenge

Traditional request-response patterns don't work well for LLM outputs. A typical GPT-4 response might take 8–15 seconds to fully generate. Making users wait that long feels broken.

## Our Solution: Streaming with Vercel AI SDK

We use the Vercel AI SDK's \`streamText\` function to pipe tokens directly to the client as they're generated:

\`\`\`typescript
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
\`\`\`

On the client, we use the \`useChat\` hook which handles the streaming protocol automatically:

\`\`\`typescript
const { messages, input, handleSubmit } = useChat({
  api: "/api/chat",
});
\`\`\`

## Results

- **Time to first token**: ~200ms (down from 8s full response wait)
- **Perceived latency**: Near-instant for users
- **Server costs**: Same — streaming doesn't increase compute, just changes delivery

## Key Takeaways

Streaming isn't just a nice-to-have — it fundamentally changes how users perceive your AI product. The same model, same quality, same cost — but the experience feels 10x faster.`,
    category: "engineering",
    categoryColor: "text-violet-500 bg-violet-500/10",
    author: {
      name: "Marcus Rivera",
      role: "Senior Engineer",
      initials: "MR",
      avatarColor: "from-violet-500 to-indigo-600",
    },
    date: "Apr 5, 2026",
    readTime: "6 min read",
    featured: true,
    icon: Code2,
  },
  {
    slug: "10-prompts-for-better-ai-writing",
    title: "10 Prompt Techniques That Will Transform Your AI Writing",
    excerpt:
      "Master these prompt engineering patterns to get dramatically better results from the AI Writer tool.",
    content: `After analyzing millions of prompts from NexusAI users, we've identified the patterns that consistently produce the best writing outputs. Here are the top 10 techniques.

## 1. The Role Framework

Instead of: "Write a blog post about productivity"
Try: "You are a productivity coach who has helped 500+ executives. Write a blog post sharing your top 3 unconventional productivity tips."

## 2. The Constraint Method

Add specific constraints to force creativity:
- Word count limits
- Target audience
- Tone requirements
- Format specifications

## 3. Chain of Thought

Break complex writing into steps:
1. "First, outline 5 key points about [topic]"
2. "Now expand point #3 into a full section with examples"
3. "Add a compelling introduction that hooks the reader"

## 4. The Example Pattern

Provide an example of the style you want, then ask the AI to match it. This works especially well for matching brand voice.

## 5. Iterative Refinement

Don't try to get perfect output in one shot. Start broad, then refine:
- Draft → Feedback → Revision → Polish

## 6. Audience Specification

"Write this for a technical audience who understands APIs but not machine learning" produces much more targeted content than generic requests.

## 7. Anti-Patterns

Tell the AI what NOT to do: "Don't use clichés, avoid buzzwords like 'leverage' and 'synergy', don't start sentences with 'In today's fast-paced world.'"

## 8. Structure Templates

Provide the structure upfront: "Write a blog post with: Hook → Problem → 3 Solutions → Case Study → CTA"

## 9. Tone Anchoring

Reference specific styles: "Write in the style of a New York Times feature article — authoritative but accessible, with data to back claims."

## 10. The Revision Prompt

After getting output: "Rewrite this to be 30% shorter, punchier, and add a specific example in paragraph 2."

## Put It Into Practice

Open the AI Writer tool and try combining 2–3 of these techniques in your next prompt. The quality difference is immediate.`,
    category: "tutorials",
    categoryColor: "text-amber-500 bg-amber-500/10",
    author: {
      name: "Emily Zhang",
      role: "Content Strategist",
      initials: "EZ",
      avatarColor: "from-amber-500 to-orange-600",
    },
    date: "Mar 28, 2026",
    readTime: "8 min read",
    icon: PenLine,
  },
  {
    slug: "nexusai-series-a-announcement",
    title: "NexusAI Raises $12M Series A to Build the Future of AI Tools",
    excerpt:
      "We're excited to announce our Series A funding to accelerate product development and expand our AI model partnerships.",
    content: `Today we're announcing that NexusAI has raised $12M in Series A funding led by Gradient Ventures, with participation from Y Combinator and several strategic angel investors.

## Why This Matters

Since launching 18 months ago, NexusAI has grown to over 50,000 active users who rely on our platform daily. This funding will help us:

- **Expand our model partnerships** — Integrate more frontier models from leading AI labs
- **Build team collaboration features** — Real-time co-creation, shared workspaces, and team analytics
- **Launch the NexusAI API** — Let developers build on top of our platform
- **Scale infrastructure** — Ensure sub-second response times as we grow

## Our Vision

We believe the future of creative and technical work is AI-augmented. But today, professionals juggle 5–10 different AI tools, each with its own interface, billing, and learning curve.

NexusAI solves this by bringing every AI capability into one unified platform. One subscription, one interface, one workflow.

## What's Next

Over the next 6 months, expect:
- 3 new AI tools (Music, Presentation, and Data Analysis)
- Enterprise plan with SSO, audit logs, and custom model fine-tuning
- Mobile apps for iOS and Android
- Plugin marketplace for community-built extensions

We're grateful to every user who has been part of this journey. The best is yet to come.`,
    category: "company",
    categoryColor: "text-sky-500 bg-sky-500/10",
    author: {
      name: "Alex Nakamura",
      role: "CEO & Co-founder",
      initials: "AN",
      avatarColor: "from-sky-500 to-blue-600",
    },
    date: "Mar 20, 2026",
    readTime: "4 min read",
    icon: TrendingUp,
  },
  {
    slug: "ai-image-generation-tips",
    title: "Create Stunning AI Images: A Complete Guide to Prompt Crafting",
    excerpt:
      "Learn how to write prompts that produce professional-quality images every time with our AI Image tool.",
    content: `The difference between a mediocre AI image and a stunning one almost always comes down to the prompt. Here's everything you need to know.

## Anatomy of a Great Image Prompt

A strong prompt has four components:

1. **Subject** — What's in the image
2. **Style** — The artistic approach
3. **Composition** — How elements are arranged
4. **Technical details** — Lighting, camera angle, quality modifiers

## Example Breakdown

**Weak prompt:** "A cat sitting on a desk"

**Strong prompt:** "A fluffy orange tabby cat sitting on a minimalist white desk, warm afternoon sunlight streaming through a window, shallow depth of field, shot on Canon EOS R5, editorial photography style, 4K, highly detailed"

## Style Keywords That Work

- **Photography**: editorial, candid, portrait, macro, aerial, street
- **Digital Art**: concept art, matte painting, digital illustration, 3D render
- **Traditional**: oil painting, watercolor, pencil sketch, charcoal drawing
- **Modern**: minimalist, flat design, isometric, vaporwave, cyberpunk

## Composition Tips

- Specify camera angles: "bird's eye view", "low angle", "eye level"
- Mention lighting: "golden hour", "studio lighting", "neon-lit", "dramatic shadows"
- Add atmosphere: "foggy", "rain-soaked", "sun-drenched", "moody"

## Negative Prompts

Tell the AI what to avoid:
- "No text, no watermarks, no distorted faces"
- "Avoid cluttered backgrounds"
- "No oversaturated colors"

## Pro Tip: The Iteration Loop

1. Generate with your first prompt
2. Identify what's close but not right
3. Add specificity to fix those elements
4. Regenerate and compare

Most professional users iterate 2–3 times before getting their ideal result. Don't expect perfection on the first try — treat it as a creative conversation.`,
    category: "tutorials",
    categoryColor: "text-amber-500 bg-amber-500/10",
    author: {
      name: "Priya Sharma",
      role: "Design Lead",
      initials: "PS",
      avatarColor: "from-pink-500 to-rose-600",
    },
    date: "Mar 15, 2026",
    readTime: "7 min read",
    icon: Image,
  },
  {
    slug: "state-of-ai-2026",
    title: "The State of AI in 2026: What Builders Need to Know",
    excerpt:
      "A practical overview of where AI stands today — the models, the tools, the opportunities, and the pitfalls.",
    content: `The AI landscape has evolved dramatically. Here's what matters for builders and creators right now.

## Models Have Commoditized

The gap between frontier models is shrinking. GPT-4o, Claude 3.5 Sonnet, and Llama 3.1 all produce excellent results for most use cases. The differentiator is no longer "which model" but "how you use it."

## Multimodal Is the New Baseline

Text-only AI feels dated. Users expect tools that handle text, images, code, audio, and video natively. Platforms that offer a single capability are being replaced by unified suites.

## Key Trends

### 1. AI Agents
Autonomous agents that can plan, execute, and iterate are moving from research demos to production tools. Expect AI that doesn't just answer questions but completes multi-step tasks.

### 2. Personalization
Generic AI outputs are a commodity. The value is in AI that understands your style, your brand, your preferences — and adapts accordingly.

### 3. Real-Time Collaboration
AI is becoming a team member, not just a tool. Real-time co-editing, AI suggestions during meetings, and collaborative AI workspaces are the next frontier.

### 4. Cost Reduction
Inference costs have dropped 90% in the last 18 months. What cost $10 per 1M tokens now costs under $1. This makes AI accessible to startups and individual creators.

## What This Means for You

If you're building products, integrating AI isn't optional anymore — it's expected. If you're creating content, AI tools can 10x your output without sacrificing quality.

The winners in 2026 won't be the people who avoid AI. They'll be the ones who learn to use it as a force multiplier.`,
    category: "ai-trends",
    categoryColor: "text-teal-500 bg-teal-500/10",
    author: {
      name: "David Kim",
      role: "Head of AI Research",
      initials: "DK",
      avatarColor: "from-teal-500 to-cyan-600",
    },
    date: "Mar 8, 2026",
    readTime: "5 min read",
    icon: Lightbulb,
  },
  {
    slug: "building-ai-chatbot-30-minutes",
    title: "Build an AI Chatbot in 30 Minutes with NexusAI API",
    excerpt:
      "A step-by-step guide to integrating NexusAI's chat API into your own application.",
    content: `Want to add AI chat to your product? Here's how to do it in 30 minutes using the NexusAI API.

## Prerequisites

- A NexusAI account (Pro or Team plan for API access)
- An API key from your dashboard settings
- Node.js 18+ installed

## Step 1: Install the SDK

\`\`\`bash
npm install @nexusai/sdk
\`\`\`

## Step 2: Initialize the Client

\`\`\`typescript
import { NexusAI } from "@nexusai/sdk";

const nexus = new NexusAI({
  apiKey: process.env.NEXUSAI_API_KEY,
});
\`\`\`

## Step 3: Create a Chat Completion

\`\`\`typescript
const response = await nexus.chat.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "What is machine learning?" },
  ],
});

console.log(response.message.content);
\`\`\`

## Step 4: Add Streaming

For a real-time typing effect:

\`\`\`typescript
const stream = await nexus.chat.stream({
  model: "gpt-4o",
  messages: [
    { role: "user", content: "Explain quantum computing simply." },
  ],
});

for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}
\`\`\`

## Step 5: Connect to Your Frontend

Expose the API through a server route and connect it to your chat UI. The NexusAI SDK handles token counting, rate limiting, and error retries automatically.

## Rate Limits

- **Pro plan**: 60 requests/minute
- **Team plan**: 300 requests/minute
- All plans include automatic retry with exponential backoff

## What's Next

Check out our full API documentation for advanced features like function calling, RAG integration, and multi-model routing.`,
    category: "tutorials",
    categoryColor: "text-amber-500 bg-amber-500/10",
    author: {
      name: "James Cooper",
      role: "Developer Advocate",
      initials: "JC",
      avatarColor: "from-lime-500 to-green-600",
    },
    date: "Mar 1, 2026",
    readTime: "6 min read",
    icon: MessageSquare,
  },
  {
    slug: "why-we-chose-multi-model-architecture",
    title: "Why We Built NexusAI on a Multi-Model Architecture",
    excerpt:
      "The technical and strategic reasoning behind supporting multiple AI providers instead of betting on a single model.",
    content: `When we started building NexusAI, we made a deliberate decision: we would never lock ourselves — or our users — into a single AI model provider. Here's why.

## The Problem with Single-Model Lock-In

Every AI model has strengths and weaknesses:

- **GPT-4o** excels at creative writing and general knowledge
- **Claude 3.5 Sonnet** shines at analysis, coding, and following complex instructions
- **Llama 3.1** offers strong performance with full data privacy
- **DALL-E 3** produces the most prompt-adherent images
- **Stable Diffusion XL** gives you more artistic control and customization

Locking into one model means accepting its weaknesses for every use case.

## Our Approach: Model Routing

NexusAI uses an intelligent routing layer that selects the best model for each task:

\`\`\`
User Request → Task Analysis → Model Selection → Generation → Response
\`\`\`

For code generation, we might route to Claude. For creative writing, to GPT-4o. For image generation with specific style requirements, to Stable Diffusion.

## The Benefits

1. **Best output quality** — Always using the strongest model for the task
2. **Cost optimization** — Routing simple tasks to cheaper models
3. **Resilience** — If one provider has an outage, we failover automatically
4. **Future-proof** — New models can be added without changing the user experience

## Technical Implementation

We use a provider abstraction layer built on the Vercel AI SDK:

\`\`\`typescript
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

const models = {
  "gpt-4o": openai("gpt-4o"),
  "claude-3.5-sonnet": anthropic("claude-3-5-sonnet-20241022"),
};
\`\`\`

This abstraction means swapping or adding models is a one-line change — no refactoring required.

## Lessons Learned

Building multi-model support from day one added maybe 2 weeks to our initial development time. But it's saved us months of migration work as the model landscape has shifted. If you're building an AI product, invest in this abstraction early.`,
    category: "engineering",
    categoryColor: "text-violet-500 bg-violet-500/10",
    author: {
      name: "Marcus Rivera",
      role: "Senior Engineer",
      initials: "MR",
      avatarColor: "from-violet-500 to-indigo-600",
    },
    date: "Feb 22, 2026",
    readTime: "7 min read",
    icon: Zap,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "all") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}
