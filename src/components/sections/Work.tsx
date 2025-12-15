"use client";

import IntensitySensor from "@/components/utility/IntensitySensor";

const projects = [
  {
    title: "Enterprise Inventory Logic",
    tech: "Next.js • PostgreSQL • Redis",
    description: "Designed a high-throughput inventory management system for a multi-warehouse logistics firm. Reduced query latency by 40% via optimized caching layers.",
  },
  {
    title: "FinTech Dashboard Architecture",
    tech: "React • TypeScript • D3.js",
    description: "Built a real-time financial analytics dashboard handling websocket streams for 50k+ concurrent users. Implemented strict type safety and component modularity.",
  },
  {
    title: "Headless Content Delivery System",
    tech: "Node.js • GraphQL • AWS Lambda",
    description: "Architected a scalable headless CMS middleware for a global media publisher. distinct microservices for content ingestion and distribution.",
  }
];

export default function Work() {
  return (
    <section className="work" id="work">
      <IntensitySensor intensity="low" />

      <div className="section-header">
        <h2 className="section-title">TECHNICAL CASE LOGS</h2>
        <span className="section-number">02</span>
      </div>

      <div className="projects-table">
        <div className="table-header">
          <span>System / Solution</span>
          <span className="hide-mobile">Platform Stack</span>
        </div>

        {projects.map((project, index) => (
          <div key={index} className="project-row">
            <div className="row-main">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
            </div>
            <div className="row-tech">
              <span className="tech-tag">{project.tech}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .work {
           padding: var(--spacing-xl) var(--spacing-md);
           max-width: 1400px;
           margin: 0 auto;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 2px solid var(--color-border);
          padding-bottom: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-primary);
        }

        .section-number {
           font-family: var(--font-display);
           font-size: 1rem;
           font-weight: 700;
           color: var(--color-text-secondary);
        }

        .projects-table {
            display: flex;
            flex-direction: column;
            border-top: 1px solid var(--color-border);
        }

        .table-header {
            display: grid;
            grid-template-columns: 2fr 1fr;
            padding: var(--spacing-sm) 0;
            border-bottom: 1px solid var(--color-border);
            color: var(--color-text-secondary);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }

        .project-row {
            display: grid;
            grid-template-columns: 2fr 1fr;
            padding: var(--spacing-md) 0;
            border-bottom: 1px solid var(--color-border);
            gap: var(--spacing-md);
            transition: background-color 0.2s ease;
        }

        .project-row:hover {
            background-color: rgba(255,255,255,0.02);
        }

        .project-title {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--color-text-primary);
            margin-bottom: var(--spacing-sm);
        }

        .project-desc {
            font-family: var(--font-body);
            font-size: 1rem;
            color: var(--color-text-secondary);
            line-height: 1.6;
            max-width: 600px;
        }

        .row-tech {
            display: flex;
            align-items: flex-start;
        }

        .tech-tag {
            font-family: var(--font-body);
            font-size: 0.875rem;
            color: var(--color-accent);
            font-family: monospace; /* Technical feel */
        }

        @media (max-width: 768px) {
            .table-header, .project-row {
                grid-template-columns: 1fr;
            }
            .hide-mobile {
                display: none;
            }
            .row-tech {
                margin-top: var(--spacing-sm);
            }
        }
      `}</style>
    </section>
  );
}
