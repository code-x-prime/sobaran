import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  defaultLanguage,
  dictionaries,
  isLanguage,
  languageStorageKey,
  type Dictionary,
  type Language,
} from "@/lib/i18n";

/** Reads the visitor's language from the cookie the client sets when switching. */
export async function getLanguage(): Promise<Language> {
  const value = (await cookies()).get(languageStorageKey)?.value;
  return isLanguage(value) ? value : defaultLanguage;
}

export async function getDictionary() {
  const language = await getLanguage();
  return { language, dict: dictionaries[language] };
}

type MetaKey = Exclude<keyof Dictionary["meta"], "siteName" | "product">;

/** Localized page metadata; `path` becomes the canonical URL. */
export async function pageMetadata(key: MetaKey, path: string): Promise<Metadata> {
  const { language, dict } = await getDictionary();
  const { title, description } = dict.meta[key];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, locale: language === "hi" ? "hi_IN" : "en_IN" },
    twitter: { title, description },
  };
}
