import { EnquiryContent } from "@/components/pages/enquiry";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata() {
  return pageMetadata("enquiry", "/enquiry");
}

export default function EnquiryPage() {
  return <EnquiryContent />;
}
