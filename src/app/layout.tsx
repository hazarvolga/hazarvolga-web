import type { Metadata } from "next";
import { headers } from "next/headers";
import { Syne, Manrope } from "next/font/google";
import { StudioHeader, StudioFooter } from "@/components/studio/Shell";
import "./globals.css";
import "./studio.css";
import "./studio-pages.css";
import "./studio-responsive.css";
import "./studio-motion.css";
import "./studio-desk.css";
import "./studio-neural.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hazarvolga.com.tr"),
  title: {
    default: "Hazar & Hülya — Tasarım ve dijital üretim",
    template: "%s | Hazar & Hülya",
  },
  description:
    "Hazar & Hülya: sanat yönetimi, görsel kimlik, web tasarımı ve AI destekli dijital üretim. Çalışmalarımızı ve birlikte neler yapabileceğimizi keşfedin.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Hazar & Hülya",
    images: [
      {
        url: "/portfolio/tc7.jpg",
        width: 700,
        height: 500,
        alt: "Travel Cafe İstanbul görsel kimlik uygulamaları",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-studio-locale") === "en" ? "en" : (await headers()).get("x-studio-locale") === "de" ? "de" : "tr";
  return (
    <html lang={locale}>
      <body className={`${syne.variable} ${manrope.variable} studio-body`}>
        <a className="skip-link" href="#main-content">
          {locale === "en" ? "Skip to content" : locale === "de" ? "Zum Inhalt" : "İçeriğe geç"}
        </a>
        <StudioHeader locale={locale} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <StudioFooter locale={locale} />
      </body>
    </html>
  );
}
