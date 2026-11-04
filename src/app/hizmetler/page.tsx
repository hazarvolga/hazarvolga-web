import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/studio-services";
import { ContactBand } from "@/components/studio/Shell";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Sanat yönetimi, kampanya, görsel kimlik, web tasarımı ve AI destekli dijital üretim hizmetleri.",
};
export default function ServicesPage() {
  return (
    <>
      <section className="wrap page-section">
        <div className="page-heading">
          <h1>
            Birlikte
            <br />
            üretebiliriz<span className="accent">.</span>
          </h1>
          <p>
            Bir marka fikri, yeni bir web sitesi veya günlük işlerinizi
            kolaylaştıracak bir araç. İhtiyacınızdan başlayalım.
          </p>
        </div>
        <div className="service-details">
          {services.map((service, index) => (
            <section key={service.id} id={service.id}>
              <span className="service-number">0{index + 1}</span>
              <div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul>
                  {service.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
                <Link
                  className="text-link"
                  href={`/calismalar/${service.example}`}
                >
                  {service.exampleLabel} ↗
                </Link>
              </div>
            </section>
          ))}
        </div>
        <section className="process-simple">
          <h2>Nasıl çalışıyoruz?</h2>
          <ol>
            <li>
              <h3>Önce dinliyoruz.</h3>
              <p>
                İhtiyacınızı, hedef kitlenizi ve mevcut malzemelerinizi birlikte
                değerlendiriyoruz.
              </p>
            </li>
            <li>
              <h3>Kapsamı belirliyoruz.</h3>
              <p>
                Teslimleri, sorumlulukları ve çalışma takvimini işe başlamadan
                netleştiriyoruz.
              </p>
            </li>
            <li>
              <h3>Görerek ilerliyoruz.</h3>
              <p>
                Taslakları ve çalışan önizlemeleri paylaşıyor, geri
                bildirimlerle geliştiriyoruz.
              </p>
            </li>
            <li>
              <h3>Kontrol edip teslim ediyoruz.</h3>
              <p>
                Kararlaştırılan çıktıları birlikte inceliyor; yayın ve devam
                ihtiyaçlarını ayrıca planlıyoruz.
              </p>
            </li>
          </ol>
        </section>
      </section>
      <ContactBand />
    </>
  );
}
