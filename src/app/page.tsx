import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/marketing/hero-section";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { ToolsShowcase } from "@/components/marketing/tools-showcase";
import { PromptPlayground } from "@/components/marketing/prompt-playground";
import { FeaturesSection } from "@/components/marketing/features-section";
import { IntegrationsGrid } from "@/components/marketing/integrations-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Testimonials } from "@/components/marketing/testimonials";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { ActivityFeed } from "@/components/marketing/activity-feed";
import { ExitIntentPopup } from "@/components/marketing/exit-intent-popup";
import { StickyCta } from "@/components/marketing/sticky-cta-bar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <LogoMarquee />
        <ToolsShowcase />
        <PromptPlayground />
        <FeaturesSection />
        <IntegrationsGrid />
        <HowItWorks />
        <Testimonials />
        <PricingPreview />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
      <ActivityFeed />
      <StickyCta />
      <ExitIntentPopup />
    </>
  );
}
