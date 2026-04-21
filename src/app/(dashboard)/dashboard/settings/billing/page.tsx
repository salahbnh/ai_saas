import { CheckCircle2, CreditCard, Zap } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { plans, getPlan } from "@/config/plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { startCheckout, openBillingPortal } from "./actions";
import { SyncSubscriptionButton } from "./sync-button";

export default async function BillingSettingsPage({
  searchParams,
}: {
  searchParams?: { success?: string; canceled?: string };
}) {
  const user = await requireUser();
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });

  const currentPlanId = subscription?.plan ?? "STARTER";
  const currentPlan = getPlan(currentPlanId);
  const status = subscription?.status ?? "ACTIVE";
  const hasPaidSubscription = Boolean(subscription?.stripeSubscriptionId);

  const statusColor: Record<string, string> = {
    ACTIVE: "text-emerald-600 bg-emerald-500/10",
    TRIALING: "text-blue-600 bg-blue-500/10",
    CANCELED: "text-muted-foreground bg-muted",
    PAST_DUE: "text-amber-600 bg-amber-500/10",
    UNPAID: "text-destructive bg-destructive/10",
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Billing</h1>
          <p className="text-sm text-muted-foreground">
            Manage your plan, payment method, and billing history.
          </p>
        </div>
        {hasPaidSubscription && <SyncSubscriptionButton />}
      </div>

      {searchParams?.success && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-emerald-700">
          Payment successful — your plan will update within a few seconds.
        </div>
      )}
      {searchParams?.canceled && (
        <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
          Checkout canceled. No changes were made.
        </div>
      )}

      {/* Current plan */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                Current plan — {currentPlan.name}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColor[status] ?? "bg-muted"}`}
                >
                  {status}
                </span>
              </CardTitle>
              <CardDescription>{currentPlan.description}</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-2xl font-heading font-semibold">
                ${currentPlan.price.monthly}
                <span className="text-sm font-normal text-muted-foreground">/mo</span>
              </p>
              {subscription?.currentPeriodEnd && (
                <p className="text-[11px] text-muted-foreground">
                  {subscription.cancelAtPeriodEnd ? "Ends" : "Renews"}{" "}
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {currentPlan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Plan options */}
      <div>
        <h2 className="mb-3 font-heading text-lg font-semibold">Available plans</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {Object.values(plans).map((plan) => {
            const isCurrent = plan.id === currentPlanId;
            const isUpgrade = plan.price.monthly > currentPlan.price.monthly;
            const isFree = plan.id === "STARTER";
            const isConfigured = Boolean(plan.stripePriceId) || isFree;

            return (
              <Card
                key={plan.id}
                className={isCurrent ? "border-primary/60 shadow-sm" : ""}
              >
                <CardHeader>
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-xl font-semibold text-foreground">
                      ${plan.price.monthly}
                    </span>
                    /mo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {isCurrent ? (
                    <Button disabled variant="outline" className="w-full">
                      Current plan
                    </Button>
                  ) : isFree ? (
                    // Downgrade to free — route through portal to cancel subscription
                    <form action={openBillingPortal}>
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full cursor-pointer"
                        disabled={!hasPaidSubscription}
                      >
                        Downgrade to Starter
                      </Button>
                    </form>
                  ) : hasPaidSubscription ? (
                    // Already paying — send them to portal to switch plans
                    <form action={openBillingPortal}>
                      <Button type="submit" className="w-full cursor-pointer">
                        <Zap className="mr-1.5 h-3.5 w-3.5" />
                        {isUpgrade ? "Upgrade" : "Downgrade"}
                      </Button>
                    </form>
                  ) : (
                    // First upgrade from Starter → Checkout
                    <form action={startCheckout}>
                      <input type="hidden" name="plan" value={plan.id} />
                      <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={!isConfigured}
                      >
                        <Zap className="mr-1.5 h-3.5 w-3.5" />
                        Upgrade to {plan.name}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Payment method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment method</CardTitle>
          <CardDescription>
            Opens the Stripe billing portal to manage card, invoices, and tax info.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={openBillingPortal}>
            <Button
              type="submit"
              variant="outline"
              className="cursor-pointer"
              disabled={!hasPaidSubscription}
            >
              Manage via Stripe
            </Button>
          </form>
          {!hasPaidSubscription && (
            <p className="mt-2 text-[11px] text-muted-foreground">
              Available after your first upgrade.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
