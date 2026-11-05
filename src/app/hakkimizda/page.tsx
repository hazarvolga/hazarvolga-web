import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand } from "@/components/studio/Shell";

export const metadata: Metadata = {
  alternates: {canonical: "/hakkimizda", languages: {tr: "/hakkimizda", en: "/en/hakkimizda", de: "/de/hakkimizda"}},
  title: "Hakkımızda",
  description:
    "Hülya Ekiz — Art Director. Hazar Volga Ekiz — web ve AI destekli dijital üretim. Birlikte çalışma yaklaşımımız.",
};
export default function AboutPage() {
  return (
    <>
      <section className="wrap page-section">
        <div className="page-heading">
          <h1>
            Hazar <span className="serif-amp">&</span> Hülya
            <span className="accent">.</span>
          </h1>
          <p>
            Hayatta da işte de birlikteyiz.
            <br />
            Farklı deneyimlerimizi aynı projede buluşturuyoruz.
          </p>
        </div>
        <div className="about-statement">
          <p>
            Bir markanın nasıl göründüğü ile nasıl çalıştığını birlikte
            düşünmeyi seviyoruz. Hülya sanat yönetimini ve görsel tasarımı,
            Hazar dijital üretimi ve AI destekli geliştirmeyi getiriyor.
          </p>
        </div>
        <div className="people-grid">
          <article>
            <span className="person-initial" aria-hidden="true">
              Hü.
            </span>
            <h2>Hülya Ekiz</h2>
            <p className="person-role">Art Director</p>
            <p>
              Kampanya, görsel kimlik ve basılı iletişim çalışmalarına
              odaklanıyor. CFA reklam ajansında Art Director olarak Bosch,
              Siemens ve Pirelli için hazırladığı işler de portfolyosunda yer
              alıyor.
            </p>
            <Link className="text-link" href="/calismalar/bosch-respect">
              Kampanya çalışmasını inceleyin ↗
            </Link>
          </article>
          <article>
            <span className="person-initial" aria-hidden="true">
              Ha.
            </span>
            <h2>Hazar Volga Ekiz</h2>
            <p className="person-role">
              Dijital üretim & AI destekli geliştirme
            </p>
            <p>
              Kurumsal web siteleri, içerik platformları ve özel web
              uygulamaları üzerinde çalışıyor. AI destekli geliştirme araçlarını
              tasarım, uygulama ve doğrulama süreçlerinde kullanıyor.
            </p>
            <Link className="text-link" href="/calismalar/aluplan">
              Web çalışmasını inceleyin ↗
            </Link>
          </article>
        </div>
        <div className="about-note">
          <h2>Her iş, kendi katkısıyla.</h2>
          <p>
            Ajans bünyesinde üretilen çalışmalarda ajans ve rol bilgilerini,
            birlikte yaptığımız işlerde ortak katkımızı belirtiyoruz. Geliştirme
            aşamasındaki ürünleri de mevcut durumlarıyla paylaşıyoruz.
          </p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
