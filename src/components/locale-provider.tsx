"use client";

import { DEFAULT_LOCALE } from "@/lib/i18n";
import { Locale } from "@/lib/types";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_LOCALE;
    }

    const stored = window.localStorage.getItem("pg_companion_locale");
    return stored === "pt-BR" || stored === "en" ? stored : DEFAULT_LOCALE;
  });

  const value = useMemo(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => {
        localStorage.setItem("pg_companion_locale", nextLocale);
        setLocale(nextLocale);
      },
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return context;
}
