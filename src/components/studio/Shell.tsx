import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitch } from "./LanguageSwitch";

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

type Locale = "tr" | "en" | "de";
const text = {
 tr: {links:["Çalışmalar", "Hizmetler", "Hakkımızda"], contact:"Projenizi konuşalım", home:"Hazar ve Hülya ana sayfa", nav:"Ana gezinme", footer:"Sanat yönetimi. Tasarım. Dijital üretim.", contactLink:"İletişim", band:"Aklınızda bir proje mi var?", start:"Birlikte başlayalım.", hint:"Önce ihtiyacınızı dinleyelim. Sonra birlikte kapsamı belirleyelim."},
 en: {links:["Work", "Services", "About"], contact:"Discuss your project", home:"Hazar and Hülya home", nav:"Main navigation", footer:"Art direction. Design. Digital production.", contactLink:"Contact", band:"Have a project in mind?", start:"Let’s start together.", hint:"We’ll listen to your needs and define the scope together."},
 de: {links:["Arbeiten", "Leistungen", "Über uns"], contact:"Projekt besprechen", home:"Hazar und Hülya Startseite", nav:"Hauptnavigation", footer:"Art Direction. Design. Digitale Umsetzung.", contactLink:"Kontakt", band:"Haben Sie ein Projekt im Sinn?", start:"Lassen Sie uns beginnen.", hint:"Wir hören Ihnen zu und definieren gemeinsam den Umfang."},
} as const;
export function StudioHeader({locale = "tr"}: {locale?: Locale}) {
  const t = text[locale];
  const prefix = locale === "tr" ? "" : `/${locale}`;
  const links = studioLinks.map((link, index) => ({href: prefix + link.href, label: t.links[index]}));
  return (
    <header className="studio-header wrap">
      <Link href={prefix || "/"} aria-label={t.home}>
        <Wordmark />
      </Link>
      <nav className="desktop-nav" aria-label={t.nav}>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <Link className="nav-contact" href={`${prefix}/iletisim`}>
          {t.contact} <span aria-hidden="true">↗</span>
        </Link>
      </nav>
      <LanguageSwitch locale={locale} />
      <MobileMenu links={links} locale={locale} />
    </header>
  );
}

export function StudioFooter({locale = "tr"}: {locale?: Locale}) {
  const t = text[locale];
  const prefix = locale === "tr" ? "" : `/${locale}`;
  return (
    <footer className="studio-footer wrap">
      <div className="footer-top">
        <Link href={prefix || "/"} aria-label={t.home}>
          <Wordmark />
        </Link>
        <p>{t.footer}</p>
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
          <Link href={`${prefix}/iletisim`}>{t.contactLink} ↗</Link>
        </div>
      </div>
    </footer>
  );
}

export function ContactBand({locale = "tr"}: {locale?: Locale}) {
  const t = text[locale];
  const prefix = locale === "tr" ? "" : `/${locale}`;
  return (
    <section className="contact-band wrap">
      <p>{t.band}</p>
      <Link href={`${prefix}/iletisim`}>
        {t.start}<span aria-hidden="true">↗</span>
      </Link>
      <span>
        {t.hint}
      </span>
    </section>
  );
}
