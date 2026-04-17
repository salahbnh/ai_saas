import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "highlight.js/styles/github-dark.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "NexusAI — One Platform, Every AI Tool",
    template: "%s | NexusAI",
  },
  description:
    "Generate text, images, code, voice, and video with cutting-edge AI models. All from one powerful workspace.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://nexusai.com"
  ),
  keywords: [
    "AI tools",
    "AI platform",
    "text generation",
    "image generation",
    "code generation",
    "AI chat",
    "AI writer",
    "AI video",
    "AI voice",
    "SaaS",
  ],
  authors: [{ name: "NexusAI" }],
  creator: "NexusAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NexusAI",
    title: "NexusAI — One Platform, Every AI Tool",
    description:
      "Generate text, images, code, voice, and video with cutting-edge AI models. All from one powerful workspace.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusAI — One Platform, Every AI Tool",
    description:
      "Generate text, images, code, voice, and video with cutting-edge AI models. All from one powerful workspace.",
    creator: "@nexusai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${spaceGrotesk.variable} ${dmSans.variable} font-body`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors position="bottom-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
