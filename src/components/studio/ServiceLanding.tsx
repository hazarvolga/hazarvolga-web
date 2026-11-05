import Image from "next/image";
import Link from "next/link";
import { translateProjects } from "@/lib/portfolio-translations";
import {
  getServiceLanding,
  serviceLandingPath,
  type ServiceLandingDefinition,
  type ServiceLandingSlug,
  type StudioLocale,
} from "@/lib/service-landings";

const SITE_URL = "https://hazarvolga.com.tr";

function serviceSchema(
  locale: StudioLocale,
  landing: ServiceLandingDefinition,
) {
  const copy = landing.copy[locale];
  const url = `${SITE_URL}${serviceLandingPath(locale, landing.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: copy.title,
    description: copy.metaDescription,
    url,
    inLanguage: locale,
    provider: {
      "@type": "Person",
      name: landing.provider.name,
      jobTitle: landing.provider.role[locale],
      url: `${SITE_URL}${locale === "tr" ? "" : `/${locale}`}/hakkimizda`,
    },
  };
}

function Deliverables({ landing, locale }: Props) {
  const copy = landing.copy[locale];
  return (
    <section className="service-landing-block" aria-labelledby="service-scope-title">
      <div className="service-landing-section-heading">
        <span aria-hidden="true">02</span>
        <h2 id="service-scope-title">{copy.deliverablesTitle}</h2>
      </div>
      <div className="service-landing-deliverables">
        {copy.deliverables.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

type Props = Readonly<{
  landing: ServiceLandingDefinition;
  locale: StudioLocale;
}>;

function Process({ landing, locale }: Props) {
  const copy = landing.copy[locale];
  return (
    <section className="service-landing-block" aria-labelledby="service-process-title">
      <div className="service-landing-section-heading">
        <span aria-hidden="true">03</span>
        <h2 id="service-process-title">{copy.processTitle}</h2>
      </div>
      <ol className="service-landing-process">
        {copy.process.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Proof({ landing, locale }: Props) {
  const copy = landing.copy[locale];
  const prefix = locale === "tr" ? "" : `/${locale}`;
  const allProjects = translateProjects(locale);
  const projects = landing.projectSlugs.map((slug) => {
    const project = allProjects.find((entry) => entry.slug === slug);
    if (!project) throw new Error(`Missing portfolio project for service landing: ${slug}`);
    return project;
  });

  return (
    <section className="service-landing-block service-landing-proof" aria-labelledby="service-proof-title">
      <div className="service-landing-section-heading">
        <span aria-hidden="true">04</span>
        <div>
          <h2 id="service-proof-title">{copy.proofTitle}</h2>
          <p>{copy.proofIntro}</p>
        </div>
      </div>
      <div className="service-landing-proof-grid">
        {projects.map((project) => (
          <article key={project.slug}>
            <Link href={`${prefix}/calismalar/${project.slug}`}>
              <div className="service-landing-proof-image">
                <Image
                  src={project.cover}
                  alt={project.coverAlt}
                  width={project.website ? 1440 : 700}
                  height={project.website ? 1000 : 500}
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="service-landing-proof-caption">
                <h3>{project.title}</h3>
                <span aria-hidden="true">↗</span>
              </div>
              <p>{copy.proofNotes[project.slug]}</p>
              <span className="service-landing-proof-link">{copy.projectLabel}</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function Faq({ landing, locale }: Props) {
  const copy = landing.copy[locale];
  return (
    <section className="service-landing-block" aria-labelledby="service-faq-title">
      <div className="service-landing-section-heading">
        <span aria-hidden="true">05</span>
        <h2 id="service-faq-title">{copy.faqTitle}</h2>
      </div>
      <div className="service-landing-faq">
        {copy.faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ServiceLanding({
  slug,
  locale = "tr",
}: Readonly<{ slug: ServiceLandingSlug; locale?: StudioLocale }>) {
  const landing = getServiceLanding(slug);
  const copy = landing.copy[locale];
  const prefix = locale === "tr" ? "" : `/${locale}`;
  const jsonLd = serviceSchema(locale, landing);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="service-landing">
        <header className="service-landing-hero wrap">
          <Link className="back-link" href={`${prefix}/hizmetler`}>
            ← {copy.backLabel}
          </Link>
          <p className="service-landing-eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}<span className="accent">.</span></h1>
          <div className="service-landing-lead">
            <p>{copy.lead}</p>
            <div>
              <span>{landing.provider.name}</span>
              <span>{copy.location}</span>
            </div>
          </div>
        </header>

        <div className="service-landing-content wrap">
          <section className="service-landing-block service-landing-fit" aria-labelledby="service-fit-title">
            <div className="service-landing-section-heading">
              <span aria-hidden="true">01</span>
              <div>
                <h2 id="service-fit-title">{copy.fitTitle}</h2>
                <p>{copy.providerIntro}</p>
              </div>
            </div>
            <ul>{copy.fit.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <Deliverables landing={landing} locale={locale} />
          <Process landing={landing} locale={locale} />
          <Proof landing={landing} locale={locale} />
          <Faq landing={landing} locale={locale} />
        </div>

        <section className="service-landing-cta wrap" aria-labelledby="service-cta-title">
          <p>{copy.ctaEyebrow}</p>
          <div>
            <h2 id="service-cta-title">{copy.ctaTitle}</h2>
            <p>{copy.ctaText}</p>
            <a
              className="button-primary"
              href={`mailto:info@hazarvolga.com.tr?subject=${encodeURIComponent(copy.ctaEyebrow)}`}
            >
              {copy.ctaLabel} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </article>
    </>
  );
}
