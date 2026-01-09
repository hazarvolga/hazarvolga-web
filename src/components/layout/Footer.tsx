"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, Heart, Facebook } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const services = [
    { name: t.footer.servicesList.webDev },
    { name: t.footer.servicesList.uiux },
    { name: t.footer.servicesList.brandId },
    { name: t.footer.servicesList.digiMark },
    { name: t.footer.servicesList.seo },
  ];

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={SITE_CONFIG.links.github} className="text-gray-400 hover:text-neon-green transition-colors" aria-label="Github">
                <Github className="w-5 h-5" />
              </a>
              <a href={SITE_CONFIG.links.linkedin} className="text-gray-400 hover:text-neon-purple transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={SITE_CONFIG.links.instagram} className="text-gray-400 hover:text-neon-pink transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={SITE_CONFIG.links.facebook} className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                    {t.nav[link.name.toLowerCase() as keyof typeof t.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.servicesTitle}</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {services.map((s, i) => (
                <li key={i}>{s.name}</li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.stayUpdated}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t.footer.subscribeText}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-blue w-full"
              />
              <button className="bg-neon-blue text-black font-bold px-4 py-2 rounded-lg hover:bg-white transition-colors">
                {t.footer.goButton}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. {t.footer.rights}</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            {t.footer.madeWith} <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" /> {t.footer.by} <Link href="#contact" className="hover:text-neon-blue transition-colors">hazarvolga ekiz</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
