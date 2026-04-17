import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ConversationList } from "./conversation-list";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const conversations = await db.conversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      updatedAt: true,
    },
    take: 50,
  });

  return (
    <div className="flex h-[calc(100vh-72px)] min-h-0">
      <ConversationList conversations={conversations} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
