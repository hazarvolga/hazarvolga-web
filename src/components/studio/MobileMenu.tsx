"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export function MobileMenu({
  links,
}: {
  links: readonly { href: string; label: string }[];
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
        {open ? "Kapat −" : "Menü +"}
      </button>
      <nav id="mobile-nav" hidden={!open} aria-label="Mobil gezinme">
        {[...links, { href: "/iletisim", label: "Projenizi konuşalım ↗" }].map(
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
