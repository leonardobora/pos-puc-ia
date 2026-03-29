import type { Metadata } from "next";
import { Nunito_Sans, Playfair_Display } from "next/font/google";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Postgrad Companion",
  description:
    "Hub de estudos para IA e Ciência de Dados com curadoria de repositórios e progresso acadêmico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunitoSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">
        <LocaleProvider>
          <div className="flex min-h-screen flex-col">
            <TopNav />
            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>
            <SiteFooter />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
