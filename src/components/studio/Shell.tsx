import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

export const studioLinks = [
  { href: "/calismalar", label: "Çalışmalar" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
] as const;

export function Wordmark() {
  return (
    <span className="wordmark">
      hazar <span className="ampersand">&</span> hülya
      <span className="wordmark-period">.</span>
    </span>
  );
}

export function StudioHeader() {
  return (
    <header className="studio-header wrap">
      <Link href="/" aria-label="Hazar ve Hülya ana sayfa">
        <Wordmark />
      </Link>
      <nav className="desktop-nav" aria-label="Ana gezinme">
        {studioLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <Link className="nav-contact" href="/iletisim">
          Projenizi konuşalım <span aria-hidden="true">↗</span>
        </Link>
      </nav>
      <MobileMenu links={studioLinks} />
    </header>
  );
}

export function StudioFooter() {
  return (
    <footer className="studio-footer wrap">
      <div className="footer-top">
        <Link href="/" aria-label="Ana sayfa">
          <Wordmark />
        </Link>
        <p>Sanat yönetimi. Tasarım. Dijital üretim.</p>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Hazar & Hülya · İstanbul</span>
        <div>
          <a
            href="https://www.linkedin.com/in/hazar-volga-ekiz-freelancer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/hazarvolga"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <Link href="/iletisim">İletişim ↗</Link>
        </div>
      </div>
    </footer>
  );
}

export function ContactBand() {
  return (
    <section className="contact-band wrap">
      <p>Aklınızda bir proje mi var?</p>
      <Link href="/iletisim">
        Birlikte başlayalım.<span aria-hidden="true">↗</span>
      </Link>
      <span>
        Önce ihtiyacınızı dinleyelim. Sonra birlikte kapsamı belirleyelim.
      </span>
    </section>
  );
}
