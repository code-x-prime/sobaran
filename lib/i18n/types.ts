import type { hi } from "@/lib/i18n/dictionaries/hi";

/** Shape every language dictionary must follow (derived from the Hindi source). */
export type Dictionary = typeof hi;

type Join<K, P> = K extends string ? (P extends string ? `${K}.${P}` : never) : never;

/** Dot-paths to every string leaf, e.g. "home.hero.title". Arrays are accessed via `dict`. */
export type TranslationKey<T = Dictionary> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends readonly unknown[]
      ? never
      : Join<K, TranslationKey<T[K]>>;
}[keyof T & string];
