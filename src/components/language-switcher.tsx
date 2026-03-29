"use client";

import { t } from "@/lib/i18n";
import { useLocale } from "@/components/locale-provider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-sm text-slate-100">
      <span className="text-xs uppercase tracking-[0.18em] opacity-80">
        {t(locale, "language")}
      </span>
      <button
        className={`rounded-full px-3 py-1 transition ${
          locale === "pt-BR" ? "bg-amber-300 text-slate-900" : "bg-white/10"
        }`}
        onClick={() => setLocale("pt-BR")}
        type="button"
      >
        PT-BR
      </button>
      <button
        className={`rounded-full px-3 py-1 transition ${
          locale === "en" ? "bg-amber-300 text-slate-900" : "bg-white/10"
        }`}
        onClick={() => setLocale("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
