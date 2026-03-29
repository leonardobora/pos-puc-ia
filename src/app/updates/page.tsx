"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";
import { RepoUpdate } from "@/lib/types";

export default function UpdatesPage() {
  const { locale } = useLocale();
  const [updates, setUpdates] = useState<RepoUpdate[]>([]);

  useEffect(() => {
    fetch("/api/updates")
      .then((res) => res.json())
      .then((payload) => setUpdates(payload.updates || []))
      .catch(() => setUpdates([]));
  }, []);

  return (
    <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
      <h1 className="font-serif text-3xl text-amber-300">
        {t(locale, "updatesTitle")}
      </h1>
      <div className="mt-6 space-y-4">
        {updates.map((update) => (
          <article
            key={update.id}
            className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <a
                href={update.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-amber-300 hover:underline"
              >
                {update.repoFullName}
              </a>
              <time className="text-sm text-slate-400">
                {new Date(update.updatedAt).toLocaleString(
                  locale === "pt-BR" ? "pt-BR" : "en-US",
                )}
              </time>
            </div>
            <p className="mt-2 text-slate-200">
              {locale === "pt-BR" ? update.summaryPt : update.summaryEn}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
