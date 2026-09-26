export const languages = ["hi", "en"] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "en";

/**
 * Shared by the cookie (read on the server) and localStorage (read on the client).
 * Bumped (v2) so visitors who saved "hi" before the default changed to English get the new
 * default instead of their stale preference.
 */
export const languageStorageKey = "sobaran-language-v2";

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (languages as readonly string[]).includes(value);
}

/** Bilingual value used by data files (products, cities) that live outside the dictionaries. */
export type Localized<T = string> = Record<Language, T>;
