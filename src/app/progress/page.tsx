"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";
import { Milestone } from "@/lib/types";

export default function ProgressPage() {
  const { locale } = useLocale();
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => res.json())
      .then((payload) => setMilestones(payload.milestones || []))
      .catch(() => setMilestones([]));
  }, []);

  const statusLabel = useMemo(
    () => ({
      todo: t(locale, "statusTodo"),
      "in-progress": t(locale, "statusInProgress"),
      done: t(locale, "statusDone"),
    }),
    [locale],
  );

  const statusClass = (status: Milestone["status"]) => {
    if (status === "done") return "bg-emerald-300/20 text-emerald-200";
    if (status === "in-progress") return "bg-amber-300/20 text-amber-200";
    return "bg-slate-400/20 text-slate-200";
  };

  return (
    <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
      <h1 className="font-serif text-3xl text-amber-300">
        {t(locale, "progressTitle")}
      </h1>
      <div className="mt-6 space-y-4">
        {milestones.map((milestone) => (
          <article
            key={milestone.id}
            className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-100">
                {locale === "pt-BR" ? milestone.titlePt : milestone.titleEn}
              </h2>
              <span
                className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.13em] ${statusClass(
                  milestone.status,
                )}`}
              >
                {statusLabel[milestone.status]}
              </span>
            </div>
            <p className="mt-2 text-slate-300">
              {locale === "pt-BR" ? milestone.notesPt : milestone.notesEn}
            </p>
            {milestone.referenceUrl && (
              <a
                className="mt-3 inline-block text-sm text-amber-300 hover:underline"
                href={milestone.referenceUrl}
                target="_blank"
                rel="noreferrer"
              >
                {milestone.referenceUrl}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
