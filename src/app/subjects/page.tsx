"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";
import { Subject } from "@/lib/types";

export default function SubjectsPage() {
  const { locale } = useLocale();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    fetch("/api/subjects")
      .then((res) => res.json())
      .then((payload) => setSubjects(payload.subjects || []))
      .catch(() => setSubjects([]));
  }, []);

  const levelLabel = useMemo(
    () => ({
      foundation: locale === "pt-BR" ? "Fundação" : "Foundation",
      intermediate: locale === "pt-BR" ? "Intermediário" : "Intermediate",
      advanced: locale === "pt-BR" ? "Avançado" : "Advanced",
    }),
    [locale],
  );

  return (
    <div className="space-y-8">
      {subjects.map((subject) => (
        <section
          key={subject.id}
          className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7"
        >
          <h1 className="font-serif text-3xl text-amber-300">
            {locale === "pt-BR" ? subject.namePt : subject.nameEn}
          </h1>
          <p className="mt-2 text-slate-300">
            {locale === "pt-BR" ? subject.summaryPt : subject.summaryEn}
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-700 text-sm uppercase tracking-[0.12em] text-slate-400">
                  <th className="px-3 py-3">{t(locale, "tableRepo")}</th>
                  <th className="px-3 py-3">{t(locale, "tableWhy")}</th>
                  <th className="px-3 py-3">{t(locale, "tableLevel")}</th>
                </tr>
              </thead>
              <tbody>
                {subject.repositories.map((repo) => (
                  <tr key={repo.id} className="border-b border-slate-800 align-top">
                    <td className="px-3 py-4">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-amber-300 hover:underline"
                      >
                        {repo.fullName}
                      </a>
                      <p className="text-sm text-slate-400">
                        {repo.language} · {repo.stars.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-slate-200">
                      {locale === "pt-BR" ? repo.whyPt : repo.whyEn}
                    </td>
                    <td className="px-3 py-4 text-slate-300">
                      {levelLabel[repo.level]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
