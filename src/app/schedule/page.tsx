"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";
import { CourseModule } from "@/lib/types";

function toDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

export default function SchedulePage() {
  const { locale } = useLocale();
  const [modules, setModules] = useState<CourseModule[]>([]);

  useEffect(() => {
    fetch("/api/schedule")
      .then((res) => res.json())
      .then((payload) => setModules(payload.modules || []))
      .catch(() => setModules([]));
  }, []);

  const now = useMemo(() => new Date(), []);

  const orderedModules = useMemo(
    () =>
      [...modules].sort(
        (a, b) => toDate(a.startDate).getTime() - toDate(b.startDate).getTime(),
      ),
    [modules],
  );

  const stats = useMemo(
    () => ({
      total: orderedModules.length,
      upcoming: orderedModules.filter(
        (courseModule) => toDate(courseModule.endDate) >= now,
      ).length,
      finalDate: orderedModules.at(-1)?.endDate,
    }),
    [now, orderedModules],
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    [locale],
  );

  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
        month: "long",
        year: "numeric",
      }),
    [locale],
  );

  const groupedModules = useMemo(() => {
    const groups = new Map<string, CourseModule[]>();

    for (const courseModule of orderedModules) {
      const key = courseModule.startDate.slice(0, 7);
      const current = groups.get(key) || [];
      current.push(courseModule);
      groups.set(key, current);
    }

    return Array.from(groups.entries()).map(([key, value]) => ({
      key,
      label: monthFormatter.format(toDate(`${key}-01`)),
      modules: value,
    }));
  }, [monthFormatter, orderedModules]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
        <h1 className="font-serif text-3xl text-amber-300">
          {t(locale, "scheduleTitle")}
        </h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          {t(locale, "scheduleIntro")}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.14em] text-slate-400">
              {t(locale, "scheduleModules")}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{stats.total}</p>
          </article>
          <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.14em] text-slate-400">
              {t(locale, "scheduleUpcomingCount")}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{stats.upcoming}</p>
          </article>
          <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.14em] text-slate-400">
              {t(locale, "scheduleFinalMilestone")}
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-100">
              {stats.finalDate ? dateFormatter.format(toDate(stats.finalDate)) : "-"}
            </p>
          </article>
        </div>
      </section>

      {groupedModules.map((group) => (
        <section
          key={group.key}
          className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7"
        >
          <h2 className="font-serif text-2xl capitalize text-amber-300">{group.label}</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {group.modules.map((courseModule) => (
              <article
                key={courseModule.id}
                className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">
                      {locale === "pt-BR"
                        ? courseModule.titlePt
                        : courseModule.titleEn}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {t(locale, "scheduleCohort")}: {courseModule.cohort}
                    </p>
                  </div>
                  <span className="rounded-full border border-amber-300/30 px-3 py-1 text-xs uppercase tracking-[0.14em] text-amber-200">
                    {courseModule.status === "concluido"
                      ? t(locale, "scheduleStatusDone")
                      : t(locale, "scheduleStatusUpcoming")}
                  </span>
                </div>

                <dl className="mt-4 space-y-2 text-sm text-slate-300">
                  <div>
                    <dt className="text-slate-400">{t(locale, "scheduleProfessor")}</dt>
                    <dd>{courseModule.professor}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">{t(locale, "scheduleDuration")}</dt>
                    <dd>
                      {dateFormatter.format(toDate(courseModule.startDate))} - {dateFormatter.format(toDate(courseModule.endDate))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">{t(locale, "scheduleCredits")}</dt>
                    <dd>{courseModule.credits}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">{t(locale, "scheduleClassHours")}</dt>
                    <dd>{courseModule.classHours}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">{t(locale, "scheduleClockHours")}</dt>
                    <dd>{courseModule.clockHours}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}