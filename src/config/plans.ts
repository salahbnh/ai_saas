import type { SubscriptionPlan } from "@/types";

export type PlanDefinition = {
  id: SubscriptionPlan;
  name: string;
  description: string;
  stripePriceId: string | null;
  price: {
    monthly: number;
    yearly: number;
  };
  limits: {
    messagesPerMonth: number;
    conversationsPerMonth: number;
    documentsTotal: number;
    maxFileSize: number; // in MB
    apiKeysTotal: number;
    teamMembers: number;
    models: string[];
  };
  features: string[];
};

export const plans: Record<SubscriptionPlan, PlanDefinition> = {
  STARTER: {
    id: "STARTER",
    name: "Starter",
    description: "For individuals getting started with AI",
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID ?? null,
    price: {
      monthly: 0,
      yearly: 0,
    },
    limits: {
      messagesPerMonth: 100,
      conversationsPerMonth: 10,
      documentsTotal: 5,
      maxFileSize: 5,
      apiKeysTotal: 1,
      teamMembers: 1,
      models: ["llama-3.1-8b-instant"],
    },
    features: [
      "100 messages per month",
      "10 conversations",
      "5 document uploads",
      "Llama 3.1 8B (fast & free)",
      "Community support",
    ],
  },
  PRO: {
    id: "PRO",
    name: "Pro",
    description: "For professionals who need more power",
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
    price: {
      monthly: 29,
      yearly: 290,
    },
    limits: {
      messagesPerMonth: 2000,
      conversationsPerMonth: 100,
      documentsTotal: 50,
      maxFileSize: 25,
      apiKeysTotal: 5,
      teamMembers: 1,
      models: [
        "llama-3.1-8b-instant",
        "llama-3.3-70b-versatile",
        "gemini-2.0-flash",
      ],
    },
    features: [
      "2,000 messages per month",
      "100 conversations",
      "50 document uploads",
      "Llama 3.3 70B & Gemini 2.0 Flash",
      "Priority support",
      "API access",
    ],
  },
  TEAM: {
    id: "TEAM",
    name: "Team",
    description: "For teams that need collaboration and scale",
    stripePriceId: process.env.STRIPE_TEAM_PRICE_ID ?? null,
    price: {
      monthly: 79,
      yearly: 790,
    },
    limits: {
      messagesPerMonth: 10000,
      conversationsPerMonth: -1, // unlimited
      documentsTotal: 500,
      maxFileSize: 100,
      apiKeysTotal: 20,
      teamMembers: 10,
      models: [
        "llama-3.1-8b-instant",
        "llama-3.3-70b-versatile",
        "gemini-2.0-flash",
        "gpt-4o-mini",
        "gpt-4o",
        "claude-3-5-sonnet-20241022",
      ],
    },
    features: [
      "10,000 messages per month",
      "Unlimited conversations",
      "500 document uploads",
      "All AI models",
      "Team collaboration (up to 10)",
      "Dedicated support",
      "Advanced analytics",
      "Custom API limits",
    ],
  },
};

export function getPlan(plan: SubscriptionPlan): PlanDefinition {
  return plans[plan];
}

export function getPlanLimits(plan: SubscriptionPlan) {
  return plans[plan].limits;
}
