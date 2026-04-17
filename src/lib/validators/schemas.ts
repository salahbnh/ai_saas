import { z } from "zod";

export const chatMessageSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().min(1).max(10000),
  model: z.string().optional(),
});

export const feedbackSchema = z.object({
  type: z.enum(["BUG", "FEATURE", "GENERAL"]),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export const apiKeySchema = z.object({
  name: z.string().min(1).max(100),
  expiresAt: z.string().datetime().optional(),
});

export const onboardingSchema = z.object({
  name: z.string().min(1).max(100),
  useCase: z.string().min(1).max(200),
  projectName: z.string().min(1).max(100),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type ApiKeyInput = z.infer<typeof apiKeySchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
