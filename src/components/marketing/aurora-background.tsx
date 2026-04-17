"use client";

import { cn } from "@/lib/utils";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/8 blur-[120px] animate-float" />
      <div
        className="absolute -top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-violet-500/6 blur-[120px] animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[120px] animate-float"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 h-[350px] w-[350px] rounded-full bg-sky-500/6 blur-[120px] animate-float"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
}
