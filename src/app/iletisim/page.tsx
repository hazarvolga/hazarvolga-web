import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {canonical: "/iletisim", languages: {tr: "/iletisim", en: "/en/iletisim", de: "/de/iletisim"}},
  title: "İletişim",
  description:
    "Hazar & Hülya ile projenizi konuşun. Sanat yönetimi, tasarım, web ve dijital üretim ihtiyaçlarınız için iletişime geçin.",
};
export default function ContactPage() {
  return (
    <section className="wrap page-section contact-page">
      <div className="page-heading">
        <h1>
          Bir fikirle
          <br />
          başlayalım<span className="accent">.</span>
        </h1>
        <p>
          Projeniz henüz bir düşünce de olabilir, net bir ihtiyaç da.
          <br />
          Birlikte neler yapabileceğimizi konuşalım.
        </p>
      </div>
      <div className="contact-grid">
        <div>
          <p className="contact-label">Bize yazın</p>
          <a
            className="email-link"
            href="mailto:info@hazarvolga.com.tr?subject=Yeni%20proje%20hakk%C4%B1nda"
          >
            info@hazarvolga.com.tr <span aria-hidden="true">↗</span>
          </a>
          <p className="contact-hint">
            Bağlantıya tıkladığınızda e-posta uygulamanız açılır.
          </p>
          <p className="contact-location">
            İstanbul, Türkiye
            <br />
            Uzaktan birlikte çalışabiliriz.
          </p>
        </div>
        <div className="contact-guide">
          <h2>Neleri paylaşabilirsiniz?</h2>
          <ul>
            <li>İşinizi veya projenizin konusunu</li>
            <li>İhtiyaç duyduğunuz tasarım ya da dijital çözümü</li>
            <li>Varsa mevcut site, dosya veya örnekleri</li>
            <li>Aklınızdaki takvimi ve bütçe aralığını</li>
          </ul>
          <p>
            Hepsinin hazır olması gerekmiyor. İhtiyacınızı birlikte
            netleştirebiliriz.
          </p>
          <Link className="text-link" href="/calismalar">
            Önce çalışmalarımıza bakın ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
