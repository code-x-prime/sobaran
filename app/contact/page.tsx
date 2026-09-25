import { ContactContent } from "@/components/pages/contact";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata() {
  return pageMetadata("contact", "/contact");
}

export default function ContactPage() {
  return <ContactContent />;
}
