"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { deskPieces, type DeskController } from "./desk/layout";

export function WorkingDesk() {
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
        <span>Masadan parçalar</span>
        <span aria-hidden="true">01 — 04</span>
      </div>
      <div
        className="desk-surface"
        ref={surfaceRef}
        role="group"
        aria-label="Çalışmalarımızdan görsel parçalar"
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
            aria-label={`${piece.title}, ${piece.kind}${interactive ? ". Ok tuşlarıyla taşıyın veya tıklayarak yerini değiştirin." : ""}`}
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              transform: `translate(-50%, -50%) rotate(${piece.angle}deg)`,
            }}
          >
            <Image
              src={piece.image}
              alt={piece.alt}
              width={index === 3 ? 1440 : 700}
              height={index === 3 ? 1000 : 500}
              unoptimized
              loading="lazy"
              draggable={false}
            />
            <span className="desk-piece-caption">
              <span>{piece.title}</span>
              <span aria-hidden="true">0{index + 1}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="desk-toolbar">
        <p id={hintId}>
          {interactive
            ? "Sürükleyin, tıklayın ya da ok tuşlarıyla yerleştirin."
            : "Farklı işler, aynı masa."}
        </p>
        {interactive && (
          <button type="button" onClick={() => controllerRef.current?.reset()}>
            Yerine koy <span aria-hidden="true">↺</span>
          </button>
        )}
      </div>
    </div>
  );
}
