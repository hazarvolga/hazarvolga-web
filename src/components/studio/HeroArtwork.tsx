"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** The server-rendered artwork stays visible without this scroll enhancement. */
export function HeroArtwork({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const preference = window.matchMedia(
      "(min-width: 721px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let visible = false;
    let frame = 0;
    let listening = false;

    const paint = () => {
      frame = 0;
      const hero = element.closest(".home-hero");
      if (!hero) return;
      const bounds = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -bounds.top / bounds.height));
      element.style.setProperty(
        "--art-drift",
        `${(progress * 18).toFixed(2)}px`,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const sync = () => {
      const active = preference.matches && visible && !document.hidden;
      if (active && !listening) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        listening = true;
        schedule();
      } else if (!active) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        listening = false;
        cancelAnimationFrame(frame);
        frame = 0;
        if (!preference.matches) element.style.removeProperty("--art-drift");
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      element.style.removeProperty("--art-drift");
    };
  }, []);

  return (
    <div ref={root} className="hero-art">
      {children}
    </div>
  );
}
