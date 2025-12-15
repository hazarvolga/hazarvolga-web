"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>© {new Date().getFullYear()} Hazar Volga. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <a href="mailto:hello@hazarvolga.com">hello@hazarvolga.com</a>
        </div>
      </div>

      <style jsx>{`
        .footer {
          padding: var(--spacing-lg) var(--spacing-md);
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          position: relative;
          z-index: var(--z-content);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          max-width: 1400px; /* Max content width */
          margin: 0 auto;
        }

        p, a {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        a:hover {
          color: var(--color-text-primary);
        }
      `}</style>
    </footer>
  );
}
