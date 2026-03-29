"use client";

import { Hero } from "@/components/hero";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";

export default function HomePage() {
  const { locale } = useLocale();

  const highlights = [
    t(locale, "highlightsOne"),
    t(locale, "highlightsTwo"),
    t(locale, "highlightsThree"),
  ];

  return (
    <div className="space-y-10">
      <Hero />

      <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
        <h2 className="font-serif text-3xl text-amber-300">
          {t(locale, "sectionHighlights")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item}
              className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5 text-slate-200"
            >
              {item}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
