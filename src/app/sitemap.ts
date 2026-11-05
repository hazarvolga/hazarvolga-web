import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/calismalar",
    "/hizmetler",
    "/hakkimizda",
    "/iletisim",
    ...projects.map((project) => `/calismalar/${project.slug}`),
  ];
  return routes.flatMap((route) => {
    const base = "https://hazarvolga.com.tr";
    const alternatives = { languages: { tr: `${base}${route || "/"}`, en: `${base}/en${route}`, de: `${base}/de${route}` } };
    return ["", "/en", "/de"].map(prefix => ({ url: `${base}${prefix}${route || (prefix ? "" : "/")}`, alternates: alternatives }));
  });
}
