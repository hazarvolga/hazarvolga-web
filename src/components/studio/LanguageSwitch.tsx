"use client";
import { usePathname } from "next/navigation";

export function LanguageSwitch({ locale }: { locale: "tr" | "en" | "de" }) {
  const pathname = usePathname();
  const path = pathname.replace(/^\/(en|de)(?=\/|$)/, "") || "/";
  return <nav aria-label={locale === "tr" ? "Dil seçimi" : locale === "en" ? "Language" : "Sprache"} className="language-switch">
    {(["tr", "en", "de"] as const).map(lang => <a key={lang} href={lang === "tr" ? path : `/${lang}${path === "/" ? "" : path}`} hrefLang={lang} aria-current={lang === locale ? "page" : undefined}>{lang.toUpperCase()}</a>)}
  </nav>;
}
