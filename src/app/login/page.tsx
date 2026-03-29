"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";

export default function LoginPage() {
  const { locale } = useLocale();
  const router = useRouter();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || "Login failed");
      }

      router.push("/progress");
      router.refresh();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-lg rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
      <h1 className="font-serif text-3xl text-amber-300">{t(locale, "loginTitle")}</h1>
      <p className="mt-3 text-slate-300">{t(locale, "loginIntro")}</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block">
          <span className="text-sm text-slate-300">{t(locale, "loginUsername")}</span>
          <input
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">{t(locale, "loginPassword")}</span>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button
          type="submit"
          className="rounded-xl bg-amber-300 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-200"
        >
          {loading ? t(locale, "loginLoading") : t(locale, "loginAction")}
        </button>

        {error && <p className="text-sm text-rose-300">{error}</p>}
      </form>
    </section>
  );
}
