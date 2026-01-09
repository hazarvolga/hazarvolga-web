"use client";

import IntensitySensor from "@/components/utility/IntensitySensor";

const projects = [
  {
    title: "Enterprise Inventory Logic",
    tech: "Next.js • PostgreSQL • Redis",
    description:
      "Designed a high-throughput inventory management system for a multi-warehouse logistics firm. Reduced query latency by 40% via optimized caching layers.",
    role: "Full-Stack Architecture",
  },
  {
    title: "FinTech Dashboard Architecture",
    tech: "React • TypeScript • D3.js",
    description:
      "Built a real-time financial analytics dashboard handling websocket streams for 50k+ concurrent users. Implemented strict type safety and component modularity.",
    role: "Frontend Engineering",
  },
  {
    title: "Headless Content Delivery System",
    tech: "Node.js • GraphQL • AWS Lambda",
    description:
      "Architected a scalable headless CMS middleware for a global media publisher. Distinct microservices for content ingestion and distribution.",
    role: "Backend Architecture",
  },
];

export default function Work() {
  return (
    <section className="work" id="work">
      <IntensitySensor intensity="low" />

      <div className="section-header">
        <div className="header-content">
          <span className="section-number">02</span>
          <h2 className="section-title">SELECTED WORK</h2>
        </div>
        <div className="header-line"></div>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="card-meta">
              <span className="card-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="card-role">{project.role}</span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              <span className="tech-label">STACK</span>
              <span className="tech-value">{project.tech}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .work {
          padding: var(--spacing-xl) var(--spacing-md);
          max-width: 1600px;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: var(--spacing-lg);
        }

        .header-content {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-sm);
        }

        .section-number {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-accent);
          letter-spacing: 0.2em;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
        }

        .header-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            var(--color-accent),
            var(--color-border),
            transparent
          );
        }

        .projects-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .project-card {
          padding: var(--spacing-md);
          border: 1px solid var(--color-border);
          background-color: var(--color-void);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          transition: all var(--transition-smooth);
          position: relative;
        }

        .project-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 0;
          background: var(--color-accent);
          transition: height var(--transition-smooth);
        }

        .project-card:hover::before {
          height: 100%;
        }

        .project-card:hover {
          background-color: var(--color-surface);
          border-color: var(--color-accent-dim);
          transform: translateX(8px);
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
        }

        .card-index {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--color-text-muted);
          letter-spacing: 0.1em;
        }

        .card-role {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .project-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.2;
          margin-bottom: var(--spacing-xs);
        }

        .project-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.8;
          max-width: 800px;
          margin-bottom: var(--spacing-sm);
        }

        .project-tech {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-sm);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--color-border);
        }

        .tech-label {
          font-family: var(--font-body);
          font-size: 0.7rem;
          color: var(--color-text-muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .tech-value {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-accent);
          letter-spacing: 0.02em;
        }

        /* Staggered layout on larger screens */
        @media (min-width: 1024px) {
          .project-card:nth-child(even) {
            margin-left: var(--spacing-xl);
          }
        }

        @media (max-width: 768px) {
          .work {
            padding: var(--spacing-lg) var(--spacing-sm);
          }

          .projects-container {
            gap: var(--spacing-md);
          }

          .project-card:hover {
            transform: translateX(4px);
          }
        }
      `}</style>
    </section>
  );
}
