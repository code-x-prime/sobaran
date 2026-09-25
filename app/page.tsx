import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ProductShowcase } from "@/components/home/product-showcase";
import {
  BrandPromise,
  BrandStatement,
  BrandValues,
  BusinessCTA,
  FinalCampaign,
  FoodMoments,
  Hero,
  IngredientStory,
  SignatureProduct,
  SocialGallery,
  StorySection,
  WhereToBuy,
} from "@/components/home/sections";
import { Marquee } from "@/components/home/marquee";
import { ScrollEffects } from "@/components/home/scroll-effects";
import { QualityTimeline } from "@/components/home/quality-timeline";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata() {
  return pageMetadata("default", "/");
}

/**
 * Rhythm: cinematic → strip → minimal → promise → editorial products → dark campaign →
 * photography → timeline → story → lifestyle → trust → location → CTA → social → finale.
 */
export default function HomePage() {
  return (
    <>
      <ScrollEffects />
      <SiteHeader overlay />
      <main className="bg-ivory text-brown overflow-x-clip">
        <Hero />
        <Marquee />
        <BrandStatement />
        <BrandPromise />
        <ProductShowcase />
        <SignatureProduct />
        <IngredientStory />
        <QualityTimeline />
        <StorySection />
        <FoodMoments />
        <BrandValues />
        <WhereToBuy />
        <BusinessCTA />
        <SocialGallery />
        <FinalCampaign />
      </main>
      <SiteFooter />
    </>
  );
}
