import Link from "next/link";
import { MessageSquare, FileText, Sparkles, BarChart3, ArrowRight, Zap } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/config/plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await requireUser();

  const [subscription, messageCount, conversationCount, documentCount] =
    await Promise.all([
      db.subscription.findUnique({ where: { userId: user.id } }),
      db.message.count({
        where: {
          conversation: { userId: user.id },
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      db.conversation.count({ where: { userId: user.id } }),
      db.document.count({ where: { userId: user.id } }),
    ]);

  const plan = getPlan(subscription?.plan ?? "STARTER");

  const stats = [
    {
      name: "Messages this month",
      value: messageCount,
      limit: plan.limits.messagesPerMonth,
      icon: MessageSquare,
    },
    {
      name: "Conversations",
      value: conversationCount,
      limit: plan.limits.conversationsPerMonth,
      icon: Sparkles,
    },
    {
      name: "Documents",
      value: documentCount,
      limit: plan.limits.documentsTotal,
      icon: FileText,
    },
  ];

  const quickLinks = [
    {
      title: "Start a chat",
      description: "Talk with any supported AI model",
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
    {
      title: "Upload documents",
      description: "Add knowledge for RAG responses",
      href: "/dashboard/documents",
      icon: FileText,
    },
    {
      title: "Try the playground",
      description: "Tune prompts and compare models",
      href: "/dashboard/playground",
      icon: Sparkles,
    },
    {
      title: "View usage",
      description: "Track tokens, messages, and costs",
      href: "/dashboard/usage",
      icon: BarChart3,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6 lg:p-8">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const pct = stat.limit === -1 ? 0 : Math.min(100, (stat.value / stat.limit) * 100);
          return (
            <Card key={stat.name}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {plan.name}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-heading font-semibold">
                  {stat.value.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" / "}
                    {stat.limit === -1 ? "∞" : stat.limit.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick links */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Quick actions</h2>
          <Button asChild size="sm" variant="ghost">
            <Link href="/dashboard/settings/billing">
              <Zap className="mr-1.5 h-3.5 w-3.5" /> Upgrade plan
            </Link>
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-sm cursor-pointer"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <link.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{link.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {link.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </div>

      {/* Current plan card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Current plan</CardTitle>
              <CardDescription>
                You are on the <span className="font-medium text-foreground">{plan.name}</span> plan.
              </CardDescription>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/settings/billing">Manage</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {plan.features.slice(0, 6).map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
