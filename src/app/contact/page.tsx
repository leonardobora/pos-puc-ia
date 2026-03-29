"use client";

import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";
import { PROFILE } from "@/lib/profile";

export default function ContactPage() {
  const { locale } = useLocale();

  return (
    <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
      <h1 className="font-serif text-3xl text-amber-300">{t(locale, "contactTitle")}</h1>
      <p className="mt-3 max-w-2xl text-slate-300">{t(locale, "contactIntro")}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
          <h2 className="text-lg font-semibold text-slate-100">GitHub</h2>
          <p className="mt-2 text-sm text-slate-300">{t(locale, "contactGithubBody")}</p>
          <a className="mt-3 inline-block text-amber-300 hover:underline" href={PROFILE.githubUser} target="_blank" rel="noreferrer">
            {PROFILE.githubUser}
          </a>
        </article>

        <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
          <h2 className="text-lg font-semibold text-slate-100">Email</h2>
          <p className="mt-2 text-sm text-slate-300">{t(locale, "contactEmailBody")}</p>
          <a className="mt-3 inline-block text-amber-300 hover:underline" href={PROFILE.contactEmail}>
            {PROFILE.contactEmail.replace("mailto:", "")}
          </a>
        </article>

        <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5 sm:col-span-2">
          <h2 className="text-lg font-semibold text-slate-100">LinkedIn</h2>
          <p className="mt-2 text-sm text-slate-300">{t(locale, "contactLinkedinBody")}</p>
          <a className="mt-3 inline-block text-amber-300 hover:underline" href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">
            {PROFILE.linkedinUrl}
          </a>
        </article>
      </div>
    </section>
  );
}
