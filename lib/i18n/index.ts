import { en } from "@/lib/i18n/dictionaries/en";
import { hi } from "@/lib/i18n/dictionaries/hi";
import type { Language } from "@/lib/i18n/config";
import type { Dictionary, TranslationKey } from "@/lib/i18n/types";

export * from "@/lib/i18n/config";
export type { Dictionary, TranslationKey } from "@/lib/i18n/types";

export const dictionaries: Record<Language, Dictionary> = { hi, en };

export function translate(dict: Dictionary, key: TranslationKey): string {
  let value: unknown = dict;
  for (const part of key.split(".")) value = (value as Record<string, unknown>)[part];
  return typeof value === "string" ? value : key;
}

/** Replaces `{name}` placeholders: format("{count} products", { count: 4 }). */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );
}
