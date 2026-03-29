"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";
import { PROFILE } from "@/lib/profile";

export function SiteFooter() {
  const { locale } = useLocale();

  return (
    <footer className="border-t border-amber-300/20 bg-slate-950/95">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 text-sm text-slate-300">
        <p>
          {PROFILE.name} · {locale === "pt-BR" ? PROFILE.rolePt : PROFILE.roleEn}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="hover:text-amber-300">
            {t(locale, "navContact")}
          </Link>
          <a href={PROFILE.githubUser} target="_blank" rel="noreferrer" className="hover:text-amber-300">
            GitHub
          </a>
          <a href={PROFILE.githubRepo} target="_blank" rel="noreferrer" className="hover:text-amber-300">
            Repo
          </a>
          <a href={PROFILE.projectUrl} target="_blank" rel="noreferrer" className="hover:text-amber-300">
            Vercel
          </a>
        </div>
      </div>
    </footer>
  );
}
