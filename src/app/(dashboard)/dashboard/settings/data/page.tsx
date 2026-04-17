import { requireUser } from "@/lib/auth";
import { getUserDataSummary } from "./actions";
import { DataPanel } from "./data-panel";

export default async function DataPrivacyPage() {
  const user = await requireUser();
  const summary = await getUserDataSummary();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h2 className="font-heading text-xl font-semibold">Data & Privacy</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Export your data or permanently delete your account. These actions
          comply with GDPR Articles 17 and 20.
        </p>
      </div>

      <DataPanel
        summary={summary}
        userEmail={user.email}
        userName={user.name}
      />
    </div>
  );
}
