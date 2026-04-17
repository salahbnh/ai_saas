import { MessageSquare, Sparkles, FileText, Key, Zap } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/config/plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Metric = {
  name: string;
  value: number;
  limit: number;
  icon: typeof MessageSquare;
  hint: string;
};

export default async function UsageAnalyticsPage() {
  const user = await requireUser();
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });
  const plan = getPlan(subscription?.plan ?? "STARTER");

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const [messagesThisMonth, conversationsThisMonth, documentsTotal, apiKeysTotal, tokenAgg] =
    await Promise.all([
      db.message.count({
        where: {
          conversation: { userId: user.id },
          createdAt: { gte: monthStart },
        },
      }),
      db.conversation.count({
        where: { userId: user.id, createdAt: { gte: monthStart } },
      }),
      db.document.count({ where: { userId: user.id } }),
      db.apiKey.count({ where: { userId: user.id } }),
      db.message.aggregate({
        where: {
          conversation: { userId: user.id },
          createdAt: { gte: monthStart },
        },
        _sum: { tokenCount: true },
      }),
    ]);

  const tokensUsed = tokenAgg._sum.tokenCount ?? 0;

  const metrics: Metric[] = [
    {
      name: "Messages",
      value: messagesThisMonth,
      limit: plan.limits.messagesPerMonth,
      icon: MessageSquare,
      hint: "Resets monthly",
    },
    {
      name: "Conversations",
      value: conversationsThisMonth,
      limit: plan.limits.conversationsPerMonth,
      icon: Sparkles,
      hint: "New threads this month",
    },
    {
      name: "Documents",
      value: documentsTotal,
      limit: plan.limits.documentsTotal,
      icon: FileText,
      hint: "Total uploaded",
    },
    {
      name: "API keys",
      value: apiKeysTotal,
      limit: plan.limits.apiKeysTotal,
      icon: Key,
      hint: "Active keys",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Usage & Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Live counters for the current billing period.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border bg-muted/30 px-3 py-1.5 text-xs">
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium">{plan.name}</span>
          <span className="text-muted-foreground">plan limits shown</span>
        </div>
      </div>

      {/* Token summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tokens processed this month</CardTitle>
          <CardDescription>
            Sum of tokens across all models for conversations started this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold">
            {tokensUsed.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            Tracked per message once providers return usage data
          </p>
        </CardContent>
      </Card>

      {/* Per-resource counters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const unlimited = m.limit === -1;
          const pct = unlimited ? 0 : Math.min(100, (m.value / m.limit) * 100);
          const over = !unlimited && m.value >= m.limit;
          return (
            <Card key={m.name}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <m.icon className="h-4 w-4" />
                  </div>
                  {over && (
                    <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">
                      At limit
                    </span>
                  )}
                </div>
                <p className="mt-4 text-xl font-heading font-semibold">
                  {m.value.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" / "}
                    {unlimited ? "∞" : m.limit.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm">{m.name}</p>
                <p className="text-[11px] text-muted-foreground">{m.hint}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      over
                        ? "bg-destructive"
                        : "bg-gradient-to-r from-emerald-500 to-green-600"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
