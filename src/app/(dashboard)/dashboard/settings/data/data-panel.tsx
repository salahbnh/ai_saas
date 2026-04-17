"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  Download,
  FileText,
  Key,
  Loader2,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportUserData, deleteAccount } from "./actions";

type Summary = {
  conversations: number;
  messages: number;
  documents: number;
  apiKeys: number;
};

export function DataPanel({
  summary,
  userEmail,
  userName,
}: {
  summary: Summary;
  userEmail: string;
  userName: string | null;
}) {
  return (
    <div className="space-y-8">
      <DataSummaryCard summary={summary} />
      <ExportCard userName={userName} />
      <DeleteCard userEmail={userEmail} />
    </div>
  );
}

function DataSummaryCard({ summary }: { summary: Summary }) {
  const items = [
    {
      label: "Conversations",
      value: summary.conversations,
      icon: MessageSquare,
    },
    { label: "Messages", value: summary.messages, icon: MessageSquare },
    { label: "Documents", value: summary.documents, icon: FileText },
    { label: "API Keys", value: summary.apiKeys, icon: Key },
  ];

  return (
    <div className="rounded-xl border bg-background p-6">
      <h3 className="font-heading text-sm font-semibold">Your Data</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Summary of everything stored under your account.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border bg-muted/30 p-3 text-center"
          >
            <item.icon className="mx-auto mb-1.5 h-4 w-4 text-muted-foreground" />
            <p className="font-heading text-lg font-bold">{item.value}</p>
            <p className="text-[11px] text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExportCard({ userName }: { userName: string | null }) {
  const [isExporting, startExport] = useTransition();

  const handleExport = () => {
    startExport(async () => {
      try {
        const data = await exportUserData();
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `nexusai-export-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        toast.success("Export downloaded successfully");
      } catch {
        toast.error("Failed to export data");
      }
    });
  };

  return (
    <div className="rounded-xl border bg-background p-6">
      <h3 className="font-heading text-sm font-semibold">Export Data</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Download a JSON file containing all your conversations, messages,
        documents metadata, and account info.
      </p>
      <Button
        onClick={handleExport}
        disabled={isExporting}
        variant="outline"
        className="mt-4 cursor-pointer"
      >
        {isExporting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        Export my data
      </Button>
    </div>
  );
}

function DeleteCard({ userEmail }: { userEmail: string }) {
  const [step, setStep] = useState<"idle" | "confirm" | "deleting">("idle");
  const [confirmInput, setConfirmInput] = useState("");

  const handleDelete = async () => {
    setStep("deleting");
    try {
      await deleteAccount();
    } catch {
      toast.error("Failed to delete account. Please try again.");
      setStep("confirm");
    }
  };

  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold text-destructive">
            Delete Account
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Permanently delete your account and all associated data. This
            action cannot be undone. Your Stripe subscription will be canceled
            immediately.
          </p>
        </div>
      </div>

      {step === "idle" && (
        <Button
          variant="destructive"
          size="sm"
          className="mt-4 cursor-pointer"
          onClick={() => setStep("confirm")}
        >
          <Trash2 className="mr-2 h-3.5 w-3.5" />
          Delete my account
        </Button>
      )}

      {(step === "confirm" || step === "deleting") && (
        <div className="mt-4 space-y-3 rounded-lg border border-destructive/20 bg-background p-4">
          <p className="text-xs text-muted-foreground">
            Type <span className="font-mono font-semibold text-foreground">{userEmail}</span> to
            confirm:
          </p>
          <input
            type="text"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            placeholder={userEmail}
            disabled={step === "deleting"}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-destructive focus:ring-1 focus:ring-destructive"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              disabled={confirmInput !== userEmail || step === "deleting"}
              onClick={handleDelete}
              className="cursor-pointer"
            >
              {step === "deleting" ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-3.5 w-3.5" />
              )}
              Permanently delete everything
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={step === "deleting"}
              onClick={() => {
                setStep("idle");
                setConfirmInput("");
              }}
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
