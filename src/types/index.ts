export type UserRole = "USER" | "ADMIN";

export type SubscriptionPlan = "STARTER" | "PRO" | "TEAM";

export type SubscriptionStatus =
  | "ACTIVE"
  | "CANCELED"
  | "PAST_DUE"
  | "TRIALING"
  | "UNPAID";

export type MessageRole = "USER" | "ASSISTANT" | "SYSTEM";

export type DocumentStatus = "PROCESSING" | "READY" | "FAILED";

export type FeedbackType = "BUG" | "FEATURE" | "GENERAL";

export type FeedbackStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type AIProvider = "openai" | "anthropic" | "groq" | "google";

export type AIModel = {
  id: string;
  name: string;
  provider: AIProvider;
  maxTokens: number;
  /** Plans allowed to use this model. Defaults to all if omitted. */
  plans?: SubscriptionPlan[];
  /** If true, requires user to supply their own API key via buyer config. */
  byok?: boolean;
  /** Short description shown in the model selector. */
  description?: string;
};
