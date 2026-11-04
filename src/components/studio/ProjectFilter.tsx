"use client";

import { useState } from "react";
import {
  categories,
  type Project,
  type PortfolioCategory,
} from "@/lib/portfolio";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilter({ projects }: { projects: readonly Project[] }) {
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
        aria-label="Çalışmaları kategoriye göre filtrele"
      >
        {(["Tümü", ...categories] as const).map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={selected === category}
            onClick={() => setSelected(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">
        {visible.length} çalışma
      </p>
      <div className="projects-grid">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
