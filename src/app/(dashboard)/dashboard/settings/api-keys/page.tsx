import { Key, Plus, Lock } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/config/plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ApiKeysSettingsPage() {
  const user = await requireUser();
  const [apiKeys, subscription] = await Promise.all([
    db.apiKey.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    db.subscription.findUnique({ where: { userId: user.id } }),
  ]);
  const plan = getPlan(subscription?.plan ?? "STARTER");

  const maskKey = (key: string) =>
    `${key.slice(0, 6)}${"•".repeat(Math.max(0, key.length - 10))}${key.slice(-4)}`;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold">API Keys</h1>
          <p className="text-sm text-muted-foreground">
            Programmatic access to your workspace. Keep them secret — rotate if exposed.
          </p>
        </div>
        <Button disabled className="cursor-pointer">
          <Plus className="mr-1.5 h-4 w-4" />
          Create key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base">Your keys</CardTitle>
              <CardDescription>
                {apiKeys.length} / {plan.limits.apiKeysTotal} used on the{" "}
                <span className="font-medium text-foreground">{plan.name}</span> plan
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-12 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Key className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">No API keys yet</p>
                <p className="text-xs text-muted-foreground">
                  Create one to call NexusAI from your own app.
                </p>
              </div>
            </div>
          ) : (
            <ul className="divide-y">
              {apiKeys.map((key) => (
                <li key={key.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{key.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {maskKey(key.key)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    {key.lastUsed && (
                      <span>
                        Used {new Date(key.lastUsed).toLocaleDateString()}
                      </span>
                    )}
                    <Button size="sm" variant="ghost" disabled>
                      Revoke
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <div className="space-y-0.5">
          <p className="text-sm font-medium">Store keys securely</p>
          <p className="text-xs text-muted-foreground">
            Keys are shown only once at creation. Treat them like passwords — never commit
            them to git or share them in URLs.
          </p>
        </div>
      </div>
    </div>
  );
}
