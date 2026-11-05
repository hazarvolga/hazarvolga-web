import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/portfolio";
import { ContactBand } from "@/components/studio/Shell";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project
    ? {
        title: project.title,
        alternates: { canonical: `/calismalar/${project.slug}`, languages: { tr: `/calismalar/${project.slug}`, en: `/en/calismalar/${project.slug}`, de: `/de/calismalar/${project.slug}` } },
        description: project.summary,
        openGraph: {
          title: project.title,
          description: project.summary,
          images: [project.cover],
        },
      }
    : { title: "Çalışma bulunamadı" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <article className="wrap project-detail">
        <Link className="back-link" href="/calismalar">
          ← Tüm çalışmalar
        </Link>
        <header className="detail-heading">
          <p>
            {project.category}
            {project.status && (
              <span className="project-status">{project.status}</span>
            )}
          </p>
          <h1>{project.title}</h1>
          <span>{project.subtitle}</span>
        </header>
        <div className="detail-cover">
          {project.video ? (
            <video
              controls
              playsInline
              preload="none"
              poster={project.cover}
              width={1280}
              height={720}
              aria-label={`${project.title} dergi sunumu`}
              aria-describedby="project-video-description"
            >
              <source src={project.video.src} type="video/mp4" />
              Videoyu oynatamıyorsanız{" "}
              <a href={project.video.src}>MP4 dosyasını açın</a>.
            </video>
          ) : (
            <Image
              src={project.cover}
              alt={project.coverAlt}
              width={project.website ? 1440 : 700}
              height={project.website ? 1000 : 500}
              preload
              unoptimized
            />
          )}
        </div>
        {project.video && (
          <p className="video-description" id="project-video-description">
            {project.video.description}
          </p>
        )}
        <div className="project-story">
          <div>
            <h2>Proje hakkında</h2>
            <p>{project.summary}</p>
            <h2>Yaklaşımımız</h2>
            <p>{project.approach}</p>
            {project.source && (
              <a
                className="text-link"
                href={project.source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.source.label} ↗
              </a>
            )}
          </div>
          <aside aria-label="Proje bilgileri">
            <dl>
              {project.credits.map((credit) => (
                <div key={credit.label}>
                  <dt>{credit.label}</dt>
                  <dd>{credit.value}</dd>
                </div>
              ))}
            </dl>
            {project.website && (
              <a
                className="button-outline"
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Web sitesini ziyaret edin ↗
              </a>
            )}
          </aside>
        </div>
        {project.images.filter((item) => item.src !== project.cover).length >
          0 && (
          <div className="detail-gallery">
            {project.images
              .filter((item) => item.src !== project.cover)
              .map((item) => (
                <figure
                  key={item.src}
                  className={
                    item.height && item.height > (item.width ?? 700)
                      ? "detail-crop"
                      : undefined
                  }
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width ?? 700}
                    height={item.height ?? 500}
                    unoptimized
                    loading="lazy"
                  />
                  <figcaption>{item.alt}</figcaption>
                </figure>
              ))}
          </div>
        )}
        <Link className="next-project" href={`/calismalar/${next.slug}`}>
          <span>Sıradaki çalışma</span>
          <strong>
            {next.title} <span aria-hidden="true">↗</span>
          </strong>
        </Link>
      </article>
      <ContactBand />
    </>
  );
}
