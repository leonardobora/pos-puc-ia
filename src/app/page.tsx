"use client";

import { useEffect, useMemo, useState } from "react";
import { Hero } from "@/components/hero";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";
import { CourseModule } from "@/lib/types";

function toDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

export default function HomePage() {
  const { locale } = useLocale();
  const [schedule, setSchedule] = useState<CourseModule[]>([]);

  useEffect(() => {
    fetch("/api/schedule")
      .then((res) => res.json())
      .then((payload) => setSchedule(payload.modules || []))
      .catch(() => setSchedule([]));
  }, []);

  const highlights = [
    t(locale, "highlightsOne"),
    t(locale, "highlightsTwo"),
    t(locale, "highlightsThree"),
  ];

  const upcomingModules = useMemo(() => {
    const now = new Date();
    return schedule
      .filter((courseModule) => toDate(courseModule.endDate) >= now)
      .sort(
        (a, b) => toDate(a.startDate).getTime() - toDate(b.startDate).getTime(),
      )
      .slice(0, 3);
  }, [schedule]);

  const scheduleStats = useMemo(() => {
    const now = new Date();
    const ordered = [...schedule].sort(
      (a, b) => toDate(a.startDate).getTime() - toDate(b.startDate).getTime(),
    );

    return {
      total: ordered.length,
      remaining: ordered.filter((courseModule) => toDate(courseModule.endDate) >= now)
        .length,
      finalDate: ordered.at(-1)?.endDate,
    };
  }, [schedule]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    [locale],
  );

  return (
    <div className="space-y-10">
      <Hero />

      <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
        <h2 className="font-serif text-3xl text-amber-300">
          {t(locale, "dashboardCalendarTitle")}
        </h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          {t(locale, "dashboardCalendarBody")}
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.14em] text-slate-400">
                {t(locale, "scheduleModules")}
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-100">
                {scheduleStats.total}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.14em] text-slate-400">
                {t(locale, "scheduleUpcomingCount")}
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-100">
                {scheduleStats.remaining}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.14em] text-slate-400">
                {t(locale, "scheduleFinalMilestone")}
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-100">
                {scheduleStats.finalDate
                  ? dateFormatter.format(toDate(scheduleStats.finalDate))
                  : "-"}
              </p>
            </article>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <h3 className="text-lg font-semibold text-slate-100">
              {t(locale, "dashboardNextModules")}
            </h3>
            <div className="mt-4 space-y-3">
              {upcomingModules.length > 0 ? (
                upcomingModules.map((courseModule) => (
                  <article
                    key={courseModule.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="font-semibold text-amber-300">
                        {locale === "pt-BR"
                          ? courseModule.titlePt
                          : courseModule.titleEn}
                      </h4>
                      <span className="text-sm text-slate-400">
                        {dateFormatter.format(toDate(courseModule.startDate))}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                      {courseModule.professor}
                    </p>
                  </article>
                ))
              ) : (
                <p className="text-slate-400">{t(locale, "dashboardNoUpcoming")}</p>
              )}
            </div>
          </div>
        </div>
      </section>

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