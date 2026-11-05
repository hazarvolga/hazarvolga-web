import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/portfolio";
import { services } from "@/lib/studio-services";
import { ProjectCard } from "@/components/studio/ProjectCard";
import { ContactBand } from "@/components/studio/Shell";
import { HeroArtwork } from "@/components/studio/HeroArtwork";
import { WorkingDesk } from "@/components/studio/WorkingDesk";
import { NeuralArtwork } from "@/components/studio/NeuralArtwork";

export const metadata: Metadata = { alternates: {canonical: "/", languages: {tr: "/", en: "/en", de: "/de"}} };

export default function Home() {
  return (
    <>
      <section className="home-hero wrap">
        <div className="hero-neural-field"><NeuralArtwork /></div>
        <div className="hero-intro">
          <span>İstanbul merkezli bağımsız kreatif & dijital stüdyo</span>
          <span>Hazar & Hülya Ekiz</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Markanız için
              <br />
              <span>tasarım.</span>
              <br />
              İşiniz için
              <br />
              <span>teknoloji.</span>
            </h1>
            <p>
              Sanat yönetimini dijital üretimle buluşturuyoruz. Markalar, web
              deneyimleri ve çalışan dijital ürünler tasarlıyoruz.
            </p>
            <div className="hero-actions">
              <Link className="button-primary" href="/calismalar">
                Çalışmalarımızı keşfedin <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/iletisim">
                Bir proje konuşalım ↗
              </Link>
            </div>
          </div>
          <HeroArtwork>
            <Link href="/calismalar/bosch-respect" className="hero-art-main">
              <Image
                src="/portfolio/respect2.jpg"
                alt="Bosch Respect for the master kampanyasının iki afişi"
                width={700}
                height={500}
                preload
                unoptimized
              />
              <span>
                Bosch · Art direction <span aria-hidden="true">↗</span>
              </span>
            </Link>
            <Link href="/calismalar/jhm-studio" className="hero-art-secondary">
              <Image
                src="/portfolio/jhm3.jpg"
                alt="JHM Studio kimliğinin ambalaj ve etiketlere uygulanması"
                width={700}
                height={500}
                unoptimized
              />
              <span>
                JHM Studio · Görsel kimlik <span aria-hidden="true">↗</span>
              </span>
            </Link>
            <div className="hero-art-note">
              <span className="note-mark" aria-hidden="true">
                &
              </span>
              <p>
                İki farklı bakış.
                <br />
                Birlikte üretilen işler.
              </p>
            </div>
          </HeroArtwork>
        </div>
        <div className="hero-baseline">
          <span>Fikirden uygulamaya, aynı masada.</span>
          <a href="#secilmis-isler">
            Aşağıda işlerimiz var <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section
        className="work-section wrap"
        id="secilmis-isler"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <h2 id="work-title">
            Seçilmiş işler<span className="accent">.</span>
          </h2>
          <p>
            Kampanyadan kimliğe, web sitesinden dijital ürüne.
            <br />
            Her işin kendine ait bir hikâyesi var.
          </p>
        </div>
        <div className="projects-grid">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
        <div className="section-end">
          <Link className="text-link" href="/calismalar">
            Tüm çalışmaları inceleyin ↗
          </Link>
        </div>
      </section>
      <section
        className="services-section wrap"
        aria-labelledby="services-title"
      >
        <div className="section-heading">
          <h2 id="services-title">
            Birlikte neler
            <br />
            yapabiliriz?
          </h2>
          <p>
            İhtiyaca göre şekillenen ekip.
            <br />
            Birbiriyle konuşan tasarım ve teknoloji.
          </p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <Link
              className="service-row"
              key={service.id}
              href={`/hizmetler#${service.id}`}
            >
              <span className="service-number">0{index + 1}</span>
              <h3>{service.title}</h3>
              <span className="service-description">
                {service.outputs.join(" · ")}
              </span>
              <span className="service-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="duo-section wrap" id="calisma-masasi">
        <WorkingDesk />
        <div className="duo-copy">
          <h2>
            İki isim.
            <br />
            Ortak bir yaklaşım.
          </h2>
          <p>
            Biz Hazar ve Hülya. Tasarım ile teknolojinin birlikte düşünülmesi
            gerektiğine inanıyor, projelere farklı deneyimlerimizi getiriyoruz.
          </p>
          <div className="duo-roles">
            <div>
              <h3>Hülya Ekiz</h3>
              <p>
                Art Director
                <br />
                Sanat yönetimi & görsel tasarım
              </p>
            </div>
            <div>
              <h3>Hazar Volga Ekiz</h3>
              <p>
                Dijital üretim
                <br />
                Web & AI destekli geliştirme
              </p>
            </div>
          </div>
          <Link className="text-link" href="/hakkimizda">
            Bizi biraz daha tanıyın ↗
          </Link>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
