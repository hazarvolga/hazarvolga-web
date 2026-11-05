"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export function MobileMenu({
  links, locale = "tr",
}: {
  links: readonly { href: string; label: string }[];
  locale?: "tr" | "en" | "de";
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="mobile-menu"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? (locale === "en" ? "Close −" : locale === "de" ? "Schließen −" : "Kapat −") : (locale === "en" ? "Menu +" : "Menü +")}
      </button>
      <nav id="mobile-nav" hidden={!open} aria-label={locale === "en" ? "Mobile navigation" : locale === "de" ? "Mobile Navigation" : "Mobil gezinme"}>
        {[...links, { href: `${locale === "tr" ? "" : `/${locale}`}/iletisim`, label: locale === "en" ? "Discuss your project ↗" : locale === "de" ? "Projekt besprechen ↗" : "Projenizi konuşalım ↗" }].map(
          (link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
