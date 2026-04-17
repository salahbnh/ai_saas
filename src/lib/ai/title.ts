import { generateText } from "ai";
import { db } from "@/lib/db";
import { getModel } from "./models";

/**
 * Generate a concise title (<= 6 words) for a conversation from its
 * opening exchange, using a small/fast model. Fire-and-forget from the
 * chat route — failures are swallowed.
 */
export async function generateConversationTitle({
  conversationId,
  firstMessage,
  firstResponse,
}: {
  conversationId: string;
  firstMessage: string;
  firstResponse: string;
}) {
  try {
    const { text } = await generateText({
      model: getModel("llama-3.1-8b-instant"),
      system:
        "You generate 3–6 word conversation titles. Reply with only the title, no quotes, no punctuation at the end.",
      prompt: `User: ${firstMessage.slice(0, 500)}\nAssistant: ${firstResponse.slice(0, 500)}\n\nTitle:`,
      maxTokens: 20,
    });

    const clean = text.trim().replace(/^["']|["']$/g, "").slice(0, 80);
    if (!clean) return;

    await db.conversation.update({
      where: { id: conversationId },
      data: { title: clean },
    });
  } catch (err) {
    console.error("[generateConversationTitle]", err);
  }
}
