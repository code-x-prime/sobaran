import { AboutContent } from "@/components/pages/about";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata() {
  return pageMetadata("about", "/about");
}

export default function AboutPage() {
  return <AboutContent />;
}
