"use client";

import Link from "next/link";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/components/locale-provider";

export function TopNav() {
  const { locale } = useLocale();

  const links = [
    { href: "/", label: t(locale, "navHome") },
    { href: "/subjects", label: t(locale, "navSubjects") },
    { href: "/updates", label: t(locale, "navUpdates") },
    { href: "/progress", label: t(locale, "navProgress") },
  ];

  return (
    <header className="border-b border-amber-300/20 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="font-serif text-2xl font-bold tracking-wide text-amber-300">
            Postgrad Companion
          </p>
          <p className="text-sm text-slate-300">Leonardo Bora da Costa</p>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-100 transition hover:border-amber-300 hover:text-amber-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
