"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";

export function Hero() {
  const { locale } = useLocale();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 p-8 sm:p-12">
      <div className="absolute -left-14 top-10 h-40 w-40 rounded-full bg-red-500/20 blur-2xl" />
      <div className="absolute right-8 top-6 h-28 w-28 rounded-full bg-amber-300/20 blur-2xl" />

      <div className="relative space-y-6">
        <p className="text-sm uppercase tracking-[0.22em] text-amber-300/90">
          IA e Ciência de Dados 2026/1
        </p>
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-slate-100 sm:text-5xl">
          {t(locale, "heroTitle")}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-300">
          {t(locale, "heroBody")}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/subjects"
            className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-900 transition hover:bg-amber-200"
          >
            {t(locale, "ctaPrimary")}
          </Link>
          <Link
            href="/progress"
            className="rounded-full border border-slate-200/30 px-6 py-3 font-semibold text-slate-100 transition hover:border-amber-300 hover:text-amber-300"
          >
            {t(locale, "ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
