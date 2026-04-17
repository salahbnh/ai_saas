import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  // Middleware should prevent reaching here unauthed, but guard anyway.
  if (!user) redirect("/sign-in");
  if (!user.onboarded) redirect("/onboarding");

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
