import { WhereContent } from "@/components/pages/where";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata() {
  return pageMetadata("where", "/where-to-buy");
}

export default function WherePage() {
  return <WhereContent />;
}
