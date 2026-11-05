import type { Metadata } from "next";
import { projects } from "@/lib/portfolio";
import { ProjectFilter } from "@/components/studio/ProjectFilter";
import { ContactBand } from "@/components/studio/Shell";

export const metadata: Metadata = {
  alternates: {canonical: "/calismalar", languages: {tr: "/calismalar", en: "/en/calismalar", de: "/de/calismalar"}},
  title: "Çalışmalar",
  description:
    "Hazar & Hülya'nın kampanya, görsel kimlik, web tasarımı ve dijital ürün çalışmaları.",
};
export default function WorkPage() {
  return (
    <>
      <section className="wrap page-section">
        <div className="page-heading">
          <h1>
            İşlerimiz<span className="accent">.</span>
          </h1>
          <p>
            Farklı ihtiyaçlar, farklı çözümler.
            <br />
            Tasarım ve dijital üretimden seçilmiş çalışmalar.
          </p>
        </div>
        <ProjectFilter projects={projects} />
      </section>
      <ContactBand />
    </>
  );
}
