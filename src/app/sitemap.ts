import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio";

const serviceRoutes = [
  "/freelance-web-tasarimci",
  "/freelance-grafik-tasarimci",
  "/ai-otomasyon-ozel-yazilim",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/calismalar",
    "/hizmetler",
    "/hakkimizda",
    "/iletisim",
    "/gizlilik",
    ...serviceRoutes,
    ...projects.map((project) => `/calismalar/${project.slug}`),
  ];
  return routes.flatMap((route) => {
    const base = "https://hazarvolga.com.tr";
    const alternatives = { languages: { tr: `${base}${route || "/"}`, en: `${base}/en${route}`, de: `${base}/de${route}` } };
    return ["", "/en", "/de"].map(prefix => ({ url: `${base}${prefix}${route || (prefix ? "" : "/")}`, alternates: alternatives }));
  });
}
