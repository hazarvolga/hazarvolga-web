"use client";

import { useRef, useEffect } from "react";
import IntensitySensor from "@/components/utility/IntensitySensor";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple stagger fade-in effect on mount
    const elements = containerRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, 100 + index * 200);
    });
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      <IntensitySensor intensity="high" />
      <div className="content-container">
        <h1 className="title fade-in">
          HAZAR <br /> VOLGA
        </h1>
        <div className="subtitle-wrapper fade-in">
          <p className="subtitle">
            Multidisciplinary Technical Studio.<br />
            Systems. Infrastructure. Design.
          </p>
        </div>
        <div className="cta-wrapper fade-in">
          <a href="#work" className="cta-button">
            System Logs
          </a>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 var(--spacing-md);
          position: relative;
        }

        .content-container {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .title {
          font-family: var(--font-display);
          font-size: clamp(4rem, 15vw, 12rem);
          line-height: 0.85;
          text-transform: uppercase;
          color: var(--color-text-primary);
          margin-left: -0.05em; /* Optical alignment */
          mix-blend-mode: difference;
        }

        .subtitle-wrapper {
          display: flex;
          justify-content: flex-end;
          padding-right: var(--spacing-lg);
        }

        .subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.5rem);
          max-width: 400px;
          text-align: right;
          color: var(--color-text-secondary);
        }

        .cta-wrapper {
          margin-top: var(--spacing-lg);
        }

        .cta-button {
          font-family: var(--font-body);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1px solid var(--color-text-primary);
          padding-bottom: 5px;
        }

        /* Animation Classes */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease, transform 1s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .subtitle-wrapper {
            justify-content: flex-start;
            padding-right: 0;
          }
          .subtitle {
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}
