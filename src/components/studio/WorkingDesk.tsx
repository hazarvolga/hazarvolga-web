"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { deskPieces, type DeskController } from "./desk/layout";

export function WorkingDesk({locale = "tr"}: {locale?: "tr" | "en" | "de"}) {
  const lang = locale === "en" ? {heading:"Pieces from the desk",group:"Visual pieces from our work", move:"Use the arrow keys to move or click to rearrange.", hint:"Drag, click or use the arrow keys to arrange.", still:"Different work, one desk.",reset:"Reset", titles:["Travel Cafe","Agency poster","JHM Studio","AffeXAI"], kinds:["Visual identity","Typography","Visual identity","Digital product"], alts:["A piece from the Travel Cafe visual identity","A typographic poster Hülya created for the agency","JHM Studio packaging and label design","The interface of Hazar’s independent product AffeXAI"]} : locale === "de" ? {heading:"Fundstücke vom Tisch",group:"Visuelle Ausschnitte unserer Arbeiten",move:"Mit den Pfeiltasten bewegen oder zum Verschieben klicken.",hint:"Ziehen, klicken oder mit den Pfeiltasten anordnen.",still:"Verschiedene Arbeiten, ein Tisch.",reset:"Zurücksetzen",titles:["Travel Cafe","Agenturplakat","JHM Studio","AffeXAI"],kinds:["Visuelle Identität","Typografie","Visuelle Identität","Digitales Produkt"],alts:["Ein Ausschnitt aus der visuellen Identität von Travel Cafe","Ein typografisches Plakat, das Hülya für die Agentur gestaltete","Verpackungs- und Etikettendesign für JHM Studio","Die Oberfläche von Hazars eigenständigem Produkt AffeXAI"]} : null;
  const surfaceRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<DeskController | null>(null);
  const [interactive, setInteractive] = useState(false);
  const hintId = useId();

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const capability = window.matchMedia(
      "(min-width: 761px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let visible = false;
    let disposed = false;
    let generation = 0;
    let loading = false;

    const sync = async () => {
      if (!capability.matches) {
        generation += 1;
        loading = false;
        controllerRef.current?.destroy();
        controllerRef.current = null;
        setInteractive(false);
        return;
      }
      const active = visible && !document.hidden;
      if (controllerRef.current) {
        if (active) controllerRef.current.resume();
        else controllerRef.current.pause();
        return;
      }
      if (!active || loading) return;
      loading = true;
      const token = ++generation;
      try {
        const { createDesk } = await import("./desk/physics");
        if (disposed || token !== generation) return;
        loading = false;
        if (!capability.matches || !visible || document.hidden) return;
        controllerRef.current = createDesk(surface);
        setInteractive(true);
      } catch (error) {
        if (disposed || token !== generation) return;
        loading = false;
        console.error("Çalışma masası etkileşimi yüklenemedi.", error);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        void sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(surface);
    const resize = new ResizeObserver(() => controllerRef.current?.resize());
    resize.observe(surface);
    const syncVisibility = () => void sync();
    capability.addEventListener("change", syncVisibility);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      disposed = true;
      generation += 1;
      observer.disconnect();
      resize.disconnect();
      capability.removeEventListener("change", syncVisibility);
      document.removeEventListener("visibilitychange", syncVisibility);
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, []);

  return (
    <div className="working-desk" data-interactive={interactive}>
      <div className="desk-heading">
        <span>{lang?.heading ?? "Masadan parçalar"}</span>
        <span aria-hidden="true">01 — 04</span>
      </div>
      <div
        className="desk-surface"
        ref={surfaceRef}
        role="group"
        aria-label={lang?.group ?? "Çalışmalarımızdan görsel parçalar"}
        aria-describedby={hintId}
      >
        <span className="desk-print" aria-hidden="true">
          h<span>&</span>h.
        </span>
        {deskPieces.map((piece, index) => (
          <button
            className="desk-piece"
            key={piece.title}
            type="button"
            disabled={!interactive}
            aria-label={`${lang?.titles[index] ?? piece.title}, ${lang?.kinds[index] ?? piece.kind}${interactive ? `. ${lang?.move ?? "Ok tuşlarıyla taşıyın veya tıklayarak yerini değiştirin."}` : ""}`}
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              transform: `translate(-50%, -50%) rotate(${piece.angle}deg)`,
            }}
          >
            <Image
              src={piece.image}
              alt={lang?.alts[index] ?? piece.alt}
              width={index === 3 ? 1440 : 700}
              height={index === 3 ? 1000 : 500}
              unoptimized
              loading="lazy"
              draggable={false}
            />
            <span className="desk-piece-caption">
              <span>{lang?.titles[index] ?? piece.title}</span>
              <span aria-hidden="true">0{index + 1}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="desk-toolbar">
        <p id={hintId}>
          {interactive
            ? (lang?.hint ?? "Sürükleyin, tıklayın ya da ok tuşlarıyla yerleştirin.")
            : (lang?.still ?? "Farklı işler, aynı masa.")}
        </p>
        {interactive && (
          <button type="button" onClick={() => controllerRef.current?.reset()}>
            {lang?.reset ?? "Yerine koy"} <span aria-hidden="true">↺</span>
          </button>
        )}
      </div>
    </div>
  );
}
