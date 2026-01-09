"use client";

import IntensitySensor from "@/components/utility/IntensitySensor";

export default function AboutContact() {
  return (
    <section className="about-contact" id="contact">
      <IntensitySensor intensity="medium" />
      <div className="content">
        <h2 className="statement">
          We build digital
          <br />
          systems that <span className="accent">endure.</span>
        </h2>

        <div className="contact-block">
          <p className="contact-label">START A PROJECT</p>
          <a href="mailto:hello@hazarvolga.com" className="email-link">
            hello@hazarvolga.com
          </a>
        </div>

        <div className="locations">
          <p>Istanbul — Remote Worldwide</p>
        </div>
      </div>

      <style jsx>{`
        .about-contact {
          padding: var(--spacing-xxl) var(--spacing-md);
          max-width: 1600px;
          margin: 0 auto;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xl);
        }

        .statement {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 600;
          line-height: 1.1;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
        }

        .accent {
          color: var(--color-accent);
          font-style: italic;
        }

        .contact-block {
          margin-top: var(--spacing-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .contact-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--color-text-muted);
        }

        .email-link {
          font-family: var(--font-body);
          font-size: clamp(1.25rem, 3vw, 2rem);
          color: var(--color-text-primary);
          position: relative;
          padding-bottom: 8px;
          transition: color var(--transition-smooth);
        }

        .email-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--color-border);
          transition: background var(--transition-smooth);
        }

        .email-link:hover {
          color: var(--color-accent);
        }

        .email-link:hover::after {
          background: var(--color-accent);
        }

        .locations {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .about-contact {
            padding: var(--spacing-xl) var(--spacing-sm);
            min-height: 70vh;
          }

          .content {
            gap: var(--spacing-lg);
          }
        }
      `}</style>
    </section>
  );
}
