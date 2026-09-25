import { QualityContent } from "@/components/pages/quality";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata() {
  return pageMetadata("quality", "/quality");
}

export default function QualityPage() {
  return <QualityContent />;
}
