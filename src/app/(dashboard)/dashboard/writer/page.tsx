import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getModelsForPlan } from "@/lib/ai/models";
import { WriterUI } from "./writer-ui";

export default async function WriterPage() {
  const user = await requireUser();
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });
  const plan = subscription?.plan ?? "STARTER";
  const models = getModelsForPlan(plan);

  return <WriterUI models={models} />;
}
