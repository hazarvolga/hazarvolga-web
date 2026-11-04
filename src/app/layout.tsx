import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import { StudioHeader, StudioFooter } from "@/components/studio/Shell";
import "./globals.css";
import "./studio.css";
import "./studio-pages.css";
import "./studio-responsive.css";

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
  // Local design review only. Remove noindex only for an approved release.
  robots: { index: false, follow: false },
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
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${syne.variable} ${manrope.variable} studio-body`}>
        <a className="skip-link" href="#main-content">
          İçeriğe geç
        </a>
        <StudioHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <StudioFooter />
      </body>
    </html>
  );
}
