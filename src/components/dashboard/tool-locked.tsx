"use client";

import { Lock, Mail } from "lucide-react";
import { appConfig } from "@/config/app";

type Props = {
  name: string;
  description?: string;
};

/**
 * Frosted overlay banner for tools that are UI-only (no backend).
 * Renders a top banner + a floating overlay card on the form area.
 */
export function ToolLockedBanner({ name, description }: Props) {
  return (
    <div className="mx-4 mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent px-5 py-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
          <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
            {name} — Premium Add-on
          </p>
          <p className="mt-0.5 text-xs text-amber-600/80 dark:text-amber-400/70">
            {description ||
              "This tool is a visual preview only. The backend is not included in the base template."}
          </p>
        </div>
      </div>
      <a
        href={`mailto:${appConfig.supportEmail}?subject=Activate ${name} Tool&body=Hi, I'd like to get the ${name} tool implemented for my project. Please share pricing and timeline.`}
        className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:bg-amber-700 hover:shadow-md cursor-pointer"
      >
        <Mail className="h-3.5 w-3.5" />
        Contact to Activate
      </a>
    </div>
  );
}

