"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link href="/" className="logo">
          FREELANCER
        </Link>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: var(--z-overlay);
          mix-blend-mode: difference;
          color: var(--color-text-primary);
        }

        .logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }
      `}</style>
    </header>
  );
}
