export const appConfig = {
  name: "AI SaaS Starter",
  description: "Production-ready AI SaaS starter template",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  logo: "/logo.svg",
  supportEmail: "support@example.com",
  links: {
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourrepo",
    docs: "https://docs.example.com",
  },
  features: {
    enableBlog: true,
    enableChangelog: true,
    enableChat: true,
    enablePlayground: true,
    enableDocuments: true,
    enableTeamManagement: true,
    enableUsageAnalytics: true,
    enableFeedback: true,
    enableApiKeys: true,
  },
} as const;

export type AppConfig = typeof appConfig;
