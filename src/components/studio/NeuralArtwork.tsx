"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { NeuralStill } from "./neural/NeuralStill";

const OriginalNeuralCanvas = dynamic(() => import("./neural/OriginalNeuralCanvas"), { ssr: false });

class CanvasBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function NeuralArtwork({locale = "tr"}: {locale?: "tr" | "en" | "de"}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [viewable, setViewable] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia("(min-width: 721px) and (prefers-reduced-motion: no-preference)");
    let visible = false;
    const sync = () => {
      setEligible(preference.matches);
      setViewable(visible && !document.hidden);
      if (!preference.matches) setReady(false);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.05 });
    observer.observe(root);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const mounted = eligible && !failed;
  const active = mounted && viewable && !paused;
  return (
    <div className="neural-artwork" ref={rootRef}
      data-renderer={ready ? "webgl" : "static"}
      data-motion={!ready ? "static" : active ? "running" : "paused"}>
      <NeuralStill />
      <div className="neural-canvas" aria-hidden="true">
        {mounted && (
          <CanvasBoundary onFailure={onFailure}>
            <OriginalNeuralCanvas active={active} onReady={onReady} onFailure={onFailure} />
          </CanvasBoundary>
        )}
      </div>
      {ready && (
        <button type="button" className="neural-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          {paused ? (locale === "en" ? "Play animation" : locale === "de" ? "Animation abspielen" : "Hareketi oynat") : (locale === "en" ? "Pause animation" : locale === "de" ? "Animation pausieren" : "Hareketi duraklat")}
        </button>
      )}
    </div>
  );
}
