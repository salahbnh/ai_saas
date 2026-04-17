"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Sparkles,
  BarChart3,
  Settings,
  User as UserIcon,
  CreditCard,
  Key,
  Shield,
  Users as UsersIcon,
  Zap,
} from "lucide-react";
import type { User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const mainNav = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Playground", href: "/dashboard/playground", icon: Sparkles },
  { name: "Usage", href: "/dashboard/usage", icon: BarChart3 },
];

const settingsNav = [
  { name: "Profile", href: "/dashboard/settings/profile", icon: UserIcon },
  { name: "Billing", href: "/dashboard/settings/billing", icon: CreditCard },
  { name: "API Keys", href: "/dashboard/settings/api-keys", icon: Key },
  { name: "Team", href: "/dashboard/settings/team", icon: UsersIcon },
  { name: "Data & Privacy", href: "/dashboard/settings/data", icon: Shield },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLink({
  href,
  name,
  icon: Icon,
  active,
}: {
  href: string;
  name: string;
  icon: typeof LayoutDashboard;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      {name}
    </Link>
  );
}

export function DashboardShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex h-[72px] items-center gap-2.5 border-b px-6 cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-md shadow-emerald-500/25">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight">
            Nexus<span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
          <div>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Workspace
            </p>
            <div className="space-y-1">
              {mainNav.map((item) => (
                <NavLink
                  key={item.href}
                  {...item}
                  active={isActive(pathname, item.href, item.exact)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              <Settings className="h-3 w-3" />
              Settings
            </p>
            <div className="space-y-1">
              {settingsNav.map((item) => (
                <NavLink
                  key={item.href}
                  {...item}
                  active={isActive(pathname, item.href)}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t p-3">
          <Link
            href="/dashboard/settings/billing"
            className="flex items-center justify-between rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/5 p-3 transition-colors hover:from-emerald-500/15 hover:to-green-500/10 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold">Upgrade plan</p>
                <p className="text-[11px] text-muted-foreground">
                  Unlock all tools
                </p>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-xl">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">
              Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}
            </p>
            <h1 className="truncate font-heading text-lg font-semibold">
              {pageTitle(pathname)}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserButton
              appearance={{
                elements: { avatarBox: "h-9 w-9" },
              }}
              afterSignOutUrl="/"
            />
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

function pageTitle(pathname: string): string {
  const last = pathname.split("/").filter(Boolean).pop() ?? "dashboard";
  const map: Record<string, string> = {
    dashboard: "Overview",
    chat: "Chat",
    documents: "Documents",
    playground: "Playground",
    usage: "Usage & Analytics",
    profile: "Profile",
    billing: "Billing",
    "api-keys": "API Keys",
    team: "Team",
    data: "Data & Privacy",
  };
  return map[last] ?? last.replace(/-/g, " ");
}
