import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";
import type { AIProvider, AIModel, SubscriptionPlan } from "@/types";

// Lazy provider instances — built on first use so missing keys only fail
// when that specific provider is actually invoked.
const providers = {
  openai: () => createOpenAI({ apiKey: process.env.OPENAI_API_KEY }),
  anthropic: () => createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),
  groq: () => createGroq({ apiKey: process.env.GROQ_API_KEY }),
  google: () =>
    createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY }),
};

/**
 * Canonical registry of every model the template supports.
 *
 * `plans` gates who can pick the model from the UI.
 * `byok` means the buyer of the template must provide their own key
 *   (we ship the wiring but can't test with a $0 budget). Starter users
 *   never see BYOK models unless the corresponding env var is set.
 */
export const availableModels: AIModel[] = [
  // --- Groq (free tier, no card required — default for all plans) ---
  {
    id: "llama-3.1-8b-instant",
    name: "Llama 3.1 8B",
    provider: "groq",
    maxTokens: 8192,
    plans: ["STARTER", "PRO", "TEAM"],
    description: "Fast & free. Great for everyday chat.",
  },
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B",
    provider: "groq",
    maxTokens: 32768,
    plans: ["PRO", "TEAM"],
    description: "Smarter reasoning, still fast.",
  },

  // --- Google Gemini (free tier, no card required) ---
  // Note: gemini-2.0-flash moved off the new-project free tier when it went
  // GA. gemini-1.5-flash-latest stays reliably on free tier across regions
  // and is effectively identical for chat use cases (multimodal, 1M ctx).
  {
    id: "gemini-1.5-flash-latest",
    name: "Gemini 1.5 Flash",
    provider: "google",
    maxTokens: 8192,
    plans: ["PRO", "TEAM"],
    description: "Multimodal, 1M context window.",
  },

  // --- BYOK (buyer supplies key in production) ---
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    maxTokens: 16384,
    plans: ["TEAM"],
    byok: true,
    description: "OpenAI's small model. Requires OPENAI_API_KEY.",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    maxTokens: 4096,
    plans: ["TEAM"],
    byok: true,
    description: "OpenAI flagship. Requires OPENAI_API_KEY.",
  },
  {
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    maxTokens: 8192,
    plans: ["TEAM"],
    byok: true,
    description: "Anthropic flagship. Requires ANTHROPIC_API_KEY.",
  },
];

export const DEFAULT_MODEL_ID = "llama-3.1-8b-instant";

function isByokAvailable(model: AIModel): boolean {
  if (!model.byok) return true;
  switch (model.provider) {
    case "openai":
      return Boolean(process.env.OPENAI_API_KEY);
    case "anthropic":
      return Boolean(process.env.ANTHROPIC_API_KEY);
    default:
      return true;
  }
}

export function getModelsForPlan(plan: SubscriptionPlan): AIModel[] {
  return availableModels.filter((m) => {
    const planAllowed = !m.plans || m.plans.includes(plan);
    return planAllowed && isByokAvailable(m);
  });
}

export function getModelDefinition(modelId: string): AIModel | undefined {
  return availableModels.find((m) => m.id === modelId);
}

export function getModelsByProvider(provider: AIProvider): AIModel[] {
  return availableModels.filter((m) => m.provider === provider);
}

/**
 * Resolve a model id → a LanguageModel instance from the AI SDK.
 * Throws on unknown model id or missing provider key.
 *
 * The cast at the return site works around a TypeScript dual-package hazard:
 * each `@ai-sdk/*` provider pins its own copy of `@ai-sdk/provider`, so the
 * emitted `LanguageModelV1` shapes are structurally identical but nominally
 * different. Runtime behavior is unaffected.
 */
export function getModel(modelId: string): LanguageModel {
  const modelDef = getModelDefinition(modelId);
  if (!modelDef) throw new Error(`Unknown model: ${modelId}`);

  const build = providers[modelDef.provider];
  if (!build) throw new Error(`No provider for: ${modelDef.provider}`);

  return build()(modelDef.id) as LanguageModel;
}

/**
 * Validate that a user's plan allows a given model. Returns a safe model id,
 * falling back to the plan's default when the requested model isn't allowed.
 */
export function resolveModelForPlan(
  requestedId: string | undefined,
  plan: SubscriptionPlan,
): string {
  const allowed = getModelsForPlan(plan);
  if (requestedId && allowed.some((m) => m.id === requestedId)) {
    return requestedId;
  }
  return allowed[0]?.id ?? DEFAULT_MODEL_ID;
}
