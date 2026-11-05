"use client";

import { useState } from "react";
import {
  categories,
  type Project,
  type PortfolioCategory,
} from "@/lib/portfolio";
import { translateCategory } from "@/lib/portfolio-translations";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilter({ projects, locale = "tr" }: { projects: readonly Project[]; locale?: "tr" | "en" | "de" }) {
  const [selected, setSelected] = useState<PortfolioCategory | "Tümü">("Tümü");
  const visible =
    selected === "Tümü"
      ? projects
      : projects.filter((project) => project.category === selected);
  return (
    <>
      <div
        className="project-filters"
        role="group"
        aria-label={locale === "en" ? "Filter work by category" : locale === "de" ? "Arbeiten nach Kategorie filtern" : "Çalışmaları kategoriye göre filtrele"}
      >
        {(["Tümü", ...categories] as const).map((category) => (
          <button
            key={category === "Tümü" ? (locale === "en" ? "All" : locale === "de" ? "Alle" : category) : translateCategory(category,locale)}
            type="button"
            aria-pressed={selected === category}
            onClick={() => setSelected(category)}
          >
            {category === "Tümü" ? (locale === "en" ? "All" : locale === "de" ? "Alle" : category) : translateCategory(category,locale)}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">
        {visible.length} {locale === "en" ? "projects" : locale === "de" ? "Projekte" : "çalışma"}
      </p>
      <div className="projects-grid">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </>
  );
}
