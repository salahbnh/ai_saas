import { MessageSquare } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { NewChatButton } from "./new-chat-button";

export default async function ChatIndexPage() {
  const user = await requireUser();
  const firstName = user.name?.split(" ")[0] ?? null;

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
        <MessageSquare className="h-5 w-5 text-muted-foreground" />
      </div>
      <h2 className="font-heading text-xl font-semibold">
        {firstName ? `Ready when you are, ${firstName}.` : "Start a conversation"}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Pick up an existing chat from the sidebar, or start a fresh one.
      </p>
      <div className="mt-5">
        <NewChatButton />
      </div>
    </div>
  );
}
