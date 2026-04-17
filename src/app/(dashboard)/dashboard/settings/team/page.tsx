import { UserPlus, Users, Mail, Crown } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/config/plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function TeamSettingsPage() {
  const user = await requireUser();
  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
  });
  const plan = getPlan(subscription?.plan ?? "STARTER");
  const seatsAvailable = plan.limits.teamMembers - 1;
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ||
    user.email[0]?.toUpperCase() ||
    "U";

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Team</h1>
          <p className="text-sm text-muted-foreground">
            Invite collaborators to share workspaces, conversations, and documents.
          </p>
        </div>
        <Button disabled={seatsAvailable <= 0} className="cursor-pointer">
          <UserPlus className="mr-1.5 h-4 w-4" />
          Invite member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Members</CardTitle>
          <CardDescription>
            {seatsAvailable <= 0 ? (
              <>
                The <span className="font-medium text-foreground">{plan.name}</span> plan
                is single-seat. Upgrade to <span className="font-medium">Team</span> to invite
                collaborators.
              </>
            ) : (
              <>
                1 of {plan.limits.teamMembers} seats used on the{" "}
                <span className="font-medium text-foreground">{plan.name}</span> plan
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.imageUrl ?? undefined} alt={user.name ?? user.email} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {user.name ?? "You"}
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                    <Crown className="h-2.5 w-2.5" /> Owner
                  </span>
                </p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <span className="text-[11px] text-muted-foreground">You</span>
          </div>

          {seatsAvailable > 0 && (
            <div className="mt-4 flex flex-col items-center gap-3 rounded-lg border border-dashed py-10 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">No pending invites</p>
              <p className="max-w-xs text-xs text-muted-foreground">
                Team members share plan limits and usage. They sign in with their own email.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-start gap-3 rounded-lg border bg-muted/20 p-4">
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div className="space-y-0.5">
          <p className="text-sm font-medium">Invites are email-based</p>
          <p className="text-xs text-muted-foreground">
            Recipients get a link to sign in and auto-join your workspace. No admin approval
            needed.
          </p>
        </div>
      </div>
    </div>
  );
}
