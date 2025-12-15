"use client";

import IntensitySensor from "@/components/utility/IntensitySensor";

const services = [
  {
    title: "Web Design & Frontend",
    description: "Component-driven architectures using React/Next.js. Kinetic interfaces with WebGL.",
    tags: ["Development", "React", "WebGL"]
  },
  {
    title: "Graphic Design & Systems",
    description: "Comprehensive visual identity systems and technical layout design.",
    tags: ["Visual Identity", "UI Kits", "Art Direction"]
  },
  {
    title: "Social Media Management",
    description: "Data-driven content strategy and growth operations.",
    tags: ["Analytics", "Strategy", "Operations"]
  },
  {
    title: "Microsoft 365 Solutions",
    description: "Enterprise licensing, setup, and technical support technical support.",
    tags: ["Enterprise", "Licensing", "Support"]
  },
  {
    title: "Server & Infrastructure",
    description: "Linux/Unix administration, secure deployment pipelines, and cloud management.",
    tags: ["DevOps", "Linux", "Security"]
  },
  {
    title: "Software Development",
    description: "Custom Python/Node.js automation scripts and backend API architectural design.",
    tags: ["Backend", "Python", "API Design"]
  },
  {
    title: "Brand & Digital Consultancy",
    description: "Technical audit and strategic positioning for digital transformation.",
    tags: ["Audit", "Strategy", "Transformation"]
  }
];

export default function Services() {
  return (
    <section className="services" id="services">
      <IntensitySensor intensity="medium" />
      <div className="section-header">
        <h2 className="section-title">CAPABILITIES</h2>
        <span className="section-number">01</span>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <div className="tags">
              {service.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .services {
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

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          border-top: 1px solid var(--color-border);
          border-left: 1px solid var(--color-border);
        }

        .service-card {
           padding: var(--spacing-md);
           border-right: 1px solid var(--color-border);
           border-bottom: 1px solid var(--color-border);
           transition: background-color 0.2s ease;
           display: flex;
           flex-direction: column;
           justify-content: space-between;
           min-height: 200px;
        }

        .service-card:hover {
            background-color: rgba(255,255,255,0.02);
        }

        .service-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
        }

        .service-description {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: var(--spacing-md);
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
          margin-top: auto;
        }

        .tag {
          font-size: 0.75rem;
          font-family: monospace;
          color: var(--color-accent);
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 6px;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}
