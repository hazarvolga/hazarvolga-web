import Image from "next/image";
import Link from "next/link";
import { translateCategory } from "@/lib/portfolio-translations";
import type { Project } from "@/lib/portfolio";

export function ProjectCard({ project, locale = "tr" }: { project: Project; locale?: "tr" | "en" | "de" }) {
  return (
    <article className="project-card-new">
      <Link href={`${locale === "tr" ? "" : `/${locale}`}/calismalar/${project.slug}`} className="project-link">
        <div className={`project-cover ${project.website ? "web-cover" : ""}`}>
          <Image
            src={project.cover}
            alt={project.coverAlt}
            width={project.website ? 1440 : 700}
            height={project.website ? 1000 : 500}
            sizes="(max-width: 720px) 100vw, 50vw"
            unoptimized
            loading="lazy"
          />
          {project.video && (
            <span className="project-media-label">{locale === "en" ? "Video presentation" : locale === "de" ? "Videopräsentation" : "Video sunum"}</span>
          )}
          <span className="project-open" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="project-caption">
          <h3>{project.title}</h3>
          <span>{translateCategory(project.category,locale)}</span>
        </div>
        <p>{project.subtitle}</p>
      </Link>
    </article>
  );
}
