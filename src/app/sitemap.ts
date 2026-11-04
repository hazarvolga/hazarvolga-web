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
  return routes.map((route) => ({ url: `https://hazarvolga.com.tr${route}` }));
}
