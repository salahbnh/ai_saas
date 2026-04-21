"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SyncSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSync() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sync failed");
      toast.success("Subscription synced — plan updated to " + data.plan);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSync}
      disabled={loading}
      className="cursor-pointer text-muted-foreground hover:text-foreground"
    >
      <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
      {loading ? "Syncing…" : "Sync with Stripe"}
    </Button>
  );
}
