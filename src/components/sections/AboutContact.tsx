"use client";

import IntensitySensor from "@/components/utility/IntensitySensor";

export default function AboutContact() {
  return (
    <section className="about-contact" id="contact">
      <IntensitySensor intensity="medium" />
      <div className="content">
        <h2 className="statement">
          We build digital <br />
          systems that <span className="accent">last.</span>
        </h2>

        <div className="contact-block">
          <p className="contact-label">Start a project</p>
          <a href="mailto:hello@hazarvolga.com" className="email-link">
            hello@hazarvolga.com
          </a>
        </div>

        <div className="locations">
          <p>Istanbul &mdash; Remote Worldwide</p>
        </div>
      </div>

      <style jsx>{`
        .about-contact {
          padding: var(--spacing-xl) var(--spacing-md);
          max-width: 1400px;
          margin: 0 auto;
          min-height: 80vh; /* Large, open feeling */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .statement {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 1.1;
          color: var(--color-text-primary);
        }

        .accent {
          color: var(--color-accent);
          font-style: italic;
        }

        .contact-block {
          margin-top: var(--spacing-md);
        }

        .contact-label {
          font-family: var(--font-body);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-xs);
        }

        .email-link {
          font-family: var(--font-body);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          color: var(--color-text-primary);
          border-bottom: 2px solid var(--color-border);
          padding-bottom: 5px;
          transition: border-color 0.3s ease;
        }

        .email-link:hover {
          border-color: var(--color-accent);
        }

        .locations {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--color-text-secondary);
        }
      `}</style>
    </section>
  );
}
