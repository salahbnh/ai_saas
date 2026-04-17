import Link from "next/link";
import {
  Sparkles,
  Twitter,
  Github,
  Linkedin,
  MessageSquare,
  PenLine,
  Image,
  Code2,
  Languages,
  FileText,
  Mic,
  Video,
} from "lucide-react";

const footerSections = [
  {
    title: "AI Tools",
    links: [
      { name: "AI Chat", href: "/dashboard/tools/chat", icon: MessageSquare },
      { name: "AI Writer", href: "/dashboard/tools/writer", icon: PenLine },
      { name: "AI Image", href: "/dashboard/tools/image", icon: Image },
      { name: "AI Code", href: "/dashboard/tools/code", icon: Code2 },
      { name: "AI Translator", href: "/dashboard/tools/translator", icon: Languages },
      { name: "AI Summarizer", href: "/dashboard/tools/summarizer", icon: FileText },
      { name: "AI Voice", href: "/dashboard/tools/voice", icon: Mic },
      { name: "AI Video", href: "/dashboard/tools/video", icon: Video },
    ],
  },
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Changelog", href: "/changelog" },
      { name: "Blog", href: "/blog" },
      { name: "API", href: "/dashboard/settings/api-keys" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "GitHub", href: "#", icon: Github },
  { name: "LinkedIn", href: "#", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="border-t bg-background pb-14">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight">
                Nexus<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              The all-in-one AI platform for creators, developers, and teams.
              Generate text, images, code, voice, and video — all from one
              workspace.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary cursor-pointer"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground cursor-pointer"
                    >
                      {"icon" in link && link.icon && (
                        <link.icon className="h-3.5 w-3.5" />
                      )}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NexusAI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by AI. Built for creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
