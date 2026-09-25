"use client";

import { useLanguage } from "@/components/language";
import { whatsappUrl } from "@/data/site";

/** WhatsApp link with a greeting in the visitor's language (or /contact until a number exists). */
export function useWhatsappHref() {
  const { dict } = useLanguage();
  return whatsappUrl(dict.common.whatsappMessage);
}
