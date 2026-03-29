"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/components/locale-provider";
import { PROFILE } from "@/lib/profile";

export function TopNav() {
  const { locale } = useLocale();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((payload) => setAuthenticated(Boolean(payload.authenticated)))
      .catch(() => setAuthenticated(false));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    router.push("/");
    router.refresh();
  }

  const links = [
    { href: "/", label: t(locale, "navHome") },
    { href: "/subjects", label: t(locale, "navSubjects") },
    { href: "/schedule", label: t(locale, "navSchedule") },
    { href: "/updates", label: t(locale, "navUpdates") },
    { href: "/progress", label: t(locale, "navProgress") },
    { href: "/contact", label: t(locale, "navContact") },
  ];

  return (
    <header className="border-b border-amber-300/20 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="font-serif text-2xl font-bold tracking-wide text-amber-300">
            Postgrad Companion
          </p>
          <p className="text-sm text-slate-300">{PROFILE.name}</p>
          <p className="text-xs text-slate-500">{locale === "pt-BR" ? PROFILE.rolePt : PROFILE.roleEn}</p>
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

          {authenticated ? (
            <button
              className="rounded-full border border-emerald-500/40 px-4 py-2 text-sm text-emerald-300 transition hover:border-emerald-300"
              type="button"
              onClick={logout}
            >
              {t(locale, "navLogout")}
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-amber-300/40 px-4 py-2 text-sm text-amber-300 transition hover:border-amber-300"
            >
              {t(locale, "navLogin")}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PROFILE.githubRepo}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-amber-300"
          >
            GitHub
          </a>
          <a
            href={PROFILE.projectUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-amber-300"
          >
            Vercel
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
