import { LegalContent } from "@/components/pages/legal";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata() {
  return pageMetadata("privacy", "/privacy");
}

export default function Page() {
  return <LegalContent page="privacy" />;
}
