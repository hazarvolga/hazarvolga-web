"use client";

import { useRef, useEffect } from "react";
import IntensitySensor from "@/components/utility/IntensitySensor";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered reveal sequence
    const elements = containerRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, 200 + index * 300);
    });
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      <IntensitySensor intensity="high" />
      <div className="content-container">
        <div className="title-block">
          <h1 className="title reveal">
            HAZAR VOLGA
          </h1>
          <div className="metadata reveal">
            <span className="label">EST. 2020</span>
            <span className="separator">—</span>
            <span className="label">DIGITAL STUDIO</span>
          </div>
        </div>

        <div className="subtitle-block reveal">
          <p className="subtitle">
            Multidisciplinary technical studio.
            <br />
            Systems, infrastructure, and design converge.
          </p>
        </div>

        <div className="scroll-indicator reveal">
          <span className="scroll-text">SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 var(--spacing-md);
          position: relative;
          overflow: hidden;
        }

        .content-container {
          max-width: 1600px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: var(--spacing-lg);
          align-items: start;
        }

        .title-block {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .title {
          font-family: var(--font-display);
          font-size: clamp(4rem, 15vw, 12rem);
          font-weight: 700;
          line-height: 0.85;
          text-transform: uppercase;
          color: var(--color-text-primary);
          margin-left: -0.03em;
          letter-spacing: -0.02em;
        }

        .metadata {
          font-family: var(--font-body);
          font-size: clamp(0.75rem, 1.2vw, 0.875rem);
          color: var(--color-text-muted);
          display: flex;
          gap: var(--spacing-xs);
          align-items: center;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-top: var(--spacing-sm);
        }

        .separator {
          color: var(--color-border);
        }

        .subtitle-block {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding-bottom: var(--spacing-md);
        }

        .subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          max-width: 400px;
          text-align: right;
          color: var(--color-text-muted);
          line-height: 1.8;
        }

        .scroll-indicator {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-xl);
        }

        .scroll-text {
          font-family: var(--font-body);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }

        .scroll-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(
            to right,
            var(--color-accent),
            transparent
          );
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        /* Reveal Animation */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity var(--transition-slow),
            transform var(--transition-slow);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .content-container {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .title-block {
            grid-column: 1 / 2;
          }

          .subtitle-block {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
            justify-content: flex-start;
            align-items: flex-start;
            padding-bottom: 0;
          }

          .subtitle {
            text-align: left;
          }

          .scroll-indicator {
            grid-row: 3 / 4;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 0 var(--spacing-sm);
          }

          .metadata {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }

          .separator {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
