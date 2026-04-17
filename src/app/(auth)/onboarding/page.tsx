import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { OnboardingForm } from "./onboarding-form";

export default async function OnboardingPage() {
  const user = await requireUser();
  if (user.onboarded) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="flex items-center justify-center gap-2.5 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-md shadow-emerald-500/25">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight">
            Nexus<span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 space-y-1.5 text-center">
            <h1 className="font-heading text-2xl font-semibold">Welcome</h1>
            <p className="text-sm text-muted-foreground">
              A couple of quick details to personalize your workspace.
            </p>
          </div>
          <OnboardingForm defaults={{ name: user.name }} />
        </div>

        <p className="text-center text-xs text-muted-foreground">
          You can edit these any time in your profile settings.
        </p>
      </div>
    </div>
  );
}
