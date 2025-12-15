"use client";

import IntensitySensor from "@/components/utility/IntensitySensor";

const stack = [
  { category: "Frontend", items: ["React", "Next.js", "Three.js", "WebGL", "TypeScript"] },
  { category: "Design", items: ["Figma", "Blender", "Adobe Suite", "Design Tokens"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "Serverless"] }
];

export default function Process() {
  return (
    <section className="process" id="process">
      <IntensitySensor intensity="low" />
      <div className="section-header">
        <h2 className="section-title">PROCESS & STACK</h2>
        <span className="section-number">03</span>
      </div>

      <div className="grid">
        <div className="methodology">
          <h3 className="block-title">Methodology</h3>
          <p className="text">
            We don’t use templates. Every line of code and pixel is crafted with intent.
            We operate at the intersection of rigorous engineering and avant-garde aesthetics.
          </p>
          <p className="text">
            Our process is iterative, transparent, and systems-focused.
          </p>
        </div>

        <div className="tech-stack">
          {stack.map((group) => (
            <div key={group.category} className="stack-group">
              <h4 className="stack-category">{group.category}</h4>
              <ul className="stack-list">
                {group.items.map((item) => (
                  <li key={item} className="stack-item">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .process {
          padding: var(--spacing-xl) var(--spacing-md);
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }

        .section-title {
          font-family: var(--font-body);
          font-size: 0.875rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
        }

        .section-number {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--color-text-secondary);
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
        }

        .block-title {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-md);
        }

        .text {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-sm);
          max-width: 500px;
        }

        .stack-group {
          margin-bottom: var(--spacing-md);
          border-top: 1px solid var(--color-border);
          padding-top: var(--spacing-sm);
        }

        .stack-category {
          font-family: var(--font-body);
          font-size: 0.875rem;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: var(--spacing-sm);
        }

        .stack-list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
        }

        .stack-item {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--color-text-primary);
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
