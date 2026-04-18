export type WriterTemplate = {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name — resolved in the UI
  /** System prompt fed to the model. Placeholders: {topic}, {tone}, {length}, {audience}, {instructions} */
  systemPrompt: string;
  /** Suggested placeholder for the topic field. */
  topicPlaceholder: string;
};

export const TONES = [
  "professional",
  "casual",
  "persuasive",
  "informative",
  "witty",
  "formal",
  "friendly",
  "inspirational",
] as const;

export type Tone = (typeof TONES)[number];

export const LENGTHS = [
  { id: "short", label: "Short (~200 words)", tokens: 400 },
  { id: "medium", label: "Medium (~500 words)", tokens: 900 },
  { id: "long", label: "Long (~1000 words)", tokens: 1800 },
] as const;

export type Length = (typeof LENGTHS)[number]["id"];

const BASE = `Write in {tone} tone. Target length: approximately {length} words. {audience_line}{instructions_line}`;

function buildSystemPrompt(role: string): string {
  return `You are an expert ${role}. ${BASE}

Output clean, well-structured Markdown. Use headings, bullet points, and bold text where appropriate. Do not include meta-commentary or preamble — jump straight into the content.`;
}

export const templates: WriterTemplate[] = [
  {
    id: "blog-post",
    name: "Blog Post",
    description: "SEO-friendly article with introduction, body, and conclusion",
    icon: "FileText",
    systemPrompt: buildSystemPrompt("blog writer and SEO specialist"),
    topicPlaceholder: "e.g., 10 Tips for Remote Work Productivity",
  },
  {
    id: "marketing-email",
    name: "Marketing Email",
    description: "Conversion-focused email with subject line and CTA",
    icon: "Mail",
    systemPrompt: buildSystemPrompt(
      "email copywriter. Include a compelling subject line, preview text, email body, and a clear call-to-action button text",
    ),
    topicPlaceholder: "e.g., Launch announcement for our new AI features",
  },
  {
    id: "social-post",
    name: "Social Media Post",
    description: "Engaging post optimized for Twitter/X, Instagram, or LinkedIn",
    icon: "Share2",
    systemPrompt: buildSystemPrompt(
      "social media strategist. Write a post optimized for engagement. Include relevant hashtags",
    ),
    topicPlaceholder: "e.g., Announcing our Series A funding round",
  },
  {
    id: "product-description",
    name: "Product Description",
    description: "Benefit-driven copy that converts browsers into buyers",
    icon: "ShoppingBag",
    systemPrompt: buildSystemPrompt(
      "e-commerce copywriter. Highlight key benefits, features, and a compelling reason to buy",
    ),
    topicPlaceholder: "e.g., Wireless noise-canceling headphones under $100",
  },
  {
    id: "linkedin-post",
    name: "LinkedIn Post",
    description: "Thought leadership post that drives engagement",
    icon: "Briefcase",
    systemPrompt: buildSystemPrompt(
      "LinkedIn thought leader. Write a hook-first post with a personal angle, clear takeaways, and a conversation-starting question at the end",
    ),
    topicPlaceholder: "e.g., Why I stopped chasing productivity hacks",
  },
  {
    id: "youtube-script",
    name: "YouTube Script",
    description: "Hook, body, and CTA script with timestamps",
    icon: "Video",
    systemPrompt: buildSystemPrompt(
      "YouTube scriptwriter. Structure: [0:00 Hook], [0:30 Intro], [Body sections with timestamps], [Outro + CTA]. Write conversationally",
    ),
    topicPlaceholder: "e.g., How AI is changing the future of work",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Curated newsletter edition with sections and links placeholders",
    icon: "Newspaper",
    systemPrompt: buildSystemPrompt(
      "newsletter editor. Include a catchy intro, 3-4 curated sections with brief commentary, and a sign-off. Use [Link] placeholders where URLs should go",
    ),
    topicPlaceholder: "e.g., This week in AI — April 2026 edition",
  },
  {
    id: "press-release",
    name: "Press Release",
    description: "Professional announcement following AP style",
    icon: "Megaphone",
    systemPrompt: buildSystemPrompt(
      "PR specialist. Follow AP-style press release format: headline, dateline, lead paragraph, body quotes, boilerplate. Write in third person",
    ),
    topicPlaceholder: "e.g., NexusAI raises $5M to democratize AI tools",
  },
];

export function getTemplate(id: string): WriterTemplate | undefined {
  return templates.find((t) => t.id === id);
}

/**
 * Resolves placeholders in a template's system prompt.
 */
export function resolvePrompt(
  template: WriterTemplate,
  opts: { tone: Tone; length: Length; audience?: string; instructions?: string },
): string {
  const lengthDef = LENGTHS.find((l) => l.id === opts.length) ?? LENGTHS[1];
  const audienceLine = opts.audience?.trim()
    ? `Target audience: ${opts.audience.trim()}. `
    : "";
  const instructionsLine = opts.instructions?.trim()
    ? `Additional instructions: ${opts.instructions.trim()}. `
    : "";

  return template.systemPrompt
    .replace("{tone}", opts.tone)
    .replace("{length}", String(lengthDef.label.match(/\d+/)?.[0] ?? "500"))
    .replace("{audience_line}", audienceLine)
    .replace("{instructions_line}", instructionsLine);
}
