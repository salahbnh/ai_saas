"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  MessageSquare,
  PenLine,
  Image,
  Code2,
  Languages,
  FileText,
  Mic,
  Video,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const tools = [
  { name: "AI Chat", href: "/dashboard/chat", icon: MessageSquare, badge: "Popular", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "AI Writer", href: "/dashboard/writer", icon: PenLine, badge: "New", color: "text-teal-500", bg: "bg-teal-500/10" },
  { name: "AI Image", href: "/dashboard/image", icon: Image, badge: "Hot", color: "text-violet-500", bg: "bg-violet-500/10" },
  { name: "AI Code", href: "/dashboard/code", icon: Code2, badge: null, color: "text-lime-500", bg: "bg-lime-500/10" },
  { name: "AI Translator", href: "/dashboard/translator", icon: Languages, badge: null, color: "text-sky-500", bg: "bg-sky-500/10" },
  { name: "AI Summarizer", href: "/dashboard/summarizer", icon: FileText, badge: null, color: "text-slate-400", bg: "bg-slate-400/10" },
  { name: "AI Voice", href: "/dashboard/voice", icon: Mic, badge: "New", color: "text-pink-500", bg: "bg-pink-500/10" },
  { name: "AI Video", href: "/dashboard/video", icon: Video, badge: "Hot", color: "text-amber-500", bg: "bg-amber-500/10" },
];

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
  { name: "Blog", href: "/blog" },
  { name: "Changelog", href: "/changelog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-md shadow-emerald-500/25">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">
            Nexus<span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsToolsOpen(true)}
            onMouseLeave={() => setIsToolsOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
              Tools
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  isToolsOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {isToolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
                >
                  <div className="grid w-[520px] grid-cols-2 gap-1 rounded-xl border bg-popover p-2 shadow-xl">
                    {tools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="flex items-center gap-3 rounded-lg p-3 transition-colors duration-150 hover:bg-accent/10 cursor-pointer group"
                      >
                        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-150", tool.bg, tool.color)}>
                          <tool.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{tool.name}</span>
                            {tool.badge && (
                              <span
                                className={cn(
                                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
                                  tool.badge === "Hot" &&
                                    "bg-orange-500/10 text-orange-500",
                                  tool.badge === "New" &&
                                    "bg-emerald-500/10 text-emerald-500",
                                  tool.badge === "Popular" &&
                                    "bg-primary/10 text-primary"
                                )}
                              >
                                {tool.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            {isLoaded && isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="default" className="text-[15px] font-semibold cursor-pointer gap-1.5">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9",
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" size="default" className="text-[15px] font-semibold cursor-pointer">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="default"
                    className="text-[15px] font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 cursor-pointer shadow-lg shadow-primary/25"
                  >
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden cursor-pointer"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b bg-background md:hidden"
          >
            <div className="container space-y-1 px-4 pb-4">
              <p className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                AI Tools
              </p>
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted cursor-pointer"
                >
                  <tool.icon className={cn("h-4 w-4", tool.color)} />
                  <span>{tool.name}</span>
                  {tool.badge && (
                    <span
                      className={cn(
                        "ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                        tool.badge === "Hot" && "bg-orange-500/10 text-orange-500",
                        tool.badge === "New" && "bg-emerald-500/10 text-emerald-500",
                        tool.badge === "Popular" && "bg-primary/10 text-primary"
                      )}
                    >
                      {tool.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="my-2 border-t" />
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <div className="my-2 border-t" />
              <div className="flex gap-2 px-3 pt-1">
                {isLoaded && isSignedIn ? (
                  <Link href="/dashboard" className="flex-1">
                    <Button className="w-full cursor-pointer gap-1.5">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in" className="flex-1">
                      <Button variant="outline" className="w-full cursor-pointer">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up" className="flex-1">
                      <Button className="w-full cursor-pointer">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
