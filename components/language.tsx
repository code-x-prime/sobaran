"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  format,
  isLanguage,
  languageStorageKey,
  translate,
  type Dictionary,
  type Language,
  type Localized,
  type TranslationKey,
} from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  /** Typed dot-path lookup: t("home.hero.title"), with optional `{placeholder}` values. */
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
  /** Whole dictionary for structured content (lists, nested groups). */
  dict: Dictionary;
  /** Resolves bilingual data values such as product.name. */
  pick: <T>(value: Localized<T>) => T;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function persist(language: Language) {
  document.cookie = `${languageStorageKey}=${language}; path=/; max-age=31536000; samesite=lax`;
  try {
    window.localStorage.setItem(languageStorageKey, language);
  } catch {
    // Storage can be unavailable (private mode); the cookie still carries the choice.
  }
}

/**
 * `initialLanguage` comes from the cookie on the server, so the first render already matches
 * what the client shows — no hydration mismatch and no flash of the wrong language.
 */
export function LanguageProvider({
  initialLanguage,
  children,
}: {
  initialLanguage: Language;
  children: ReactNode;
}) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const wrapper = useRef<HTMLDivElement>(null);

  // Recover a preference saved in localStorage when the cookie is missing (e.g. cleared).
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(languageStorageKey);
    } catch {
      stored = null;
    }
    if (isLanguage(stored) && stored !== initialLanguage) {
      persist(stored);
      setLanguageState(stored);
      router.refresh();
    } else {
      persist(initialLanguage);
    }
  }, [initialLanguage, router]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [language]);

  const setLanguage = useCallback(
    (next: Language) => {
      if (next === language) return;
      persist(next);
      setLanguageState(next);
      // Soft fade so the swap reads as intentional rather than a flicker.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        wrapper.current?.animate([{ opacity: 0.82 }, { opacity: 1 }], {
          duration: 380,
          easing: "ease-out",
        });
      }
      // Re-runs server metadata (document title/description) without a page reload.
      router.refresh();
    },
    [language, router],
  );

  const value = useMemo<LanguageContextValue>(() => {
    const dict = dictionaries[language];
    return {
      language,
      setLanguage,
      dict,
      t: (key, values) => {
        const text = translate(dict, key);
        return values ? format(text, values) : text;
      },
      pick: (localized) => localized[language],
    };
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      <div ref={wrapper}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return context;
}

/** Translation for server components: <T k="home.hero.title" />. */
export function T({ k, values }: { k: TranslationKey; values?: Record<string, string | number> }) {
  return <>{useLanguage().t(k, values)}</>;
}
