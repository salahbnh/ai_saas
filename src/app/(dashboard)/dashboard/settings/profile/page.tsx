import { requireUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "./profile-form";

export default async function ProfileSettingsPage() {
  const user = await requireUser();

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Update your personal information and how you show up in the app.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
          <CardDescription>
            These details are stored with your NexusAI account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            defaults={{
              name: user.name,
              email: user.email,
              imageUrl: user.imageUrl,
              useCase: user.useCase,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
