"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const servicesList = [
    { id: "01", title: t.services.s1_title, description: t.services.s1_desc },
    { id: "02", title: t.services.s2_title, description: t.services.s2_desc },
    { id: "03", title: t.services.s3_title, description: t.services.s3_desc },
    { id: "04", title: t.services.s4_title, description: t.services.s4_desc },
    { id: "05", title: t.services.s5_title, description: t.services.s5_desc }
  ];

  return (
    <section id="services" className="py-32 bg-background relative z-20">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
          <h2 className="font-display text-6xl md:text-8xl font-bold text-white uppercase leading-[0.8]">
            {t.services.title}
          </h2>
          <p className="font-sans text-gray-400 max-w-sm mt-8 md:mt-0 text-right">
            {t.services.subtitle}
          </p>
        </div>

        <div className="flex flex-col">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-t border-white/10 py-12 md:py-16 cursor-pointer transition-colors duration-500 hover:bg-surface-light"
            >
              <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 relative z-10">
                <div className="flex items-baseline gap-8 md:gap-16">
                  <span className="font-mono text-neon-blue/50 text-sm md:text-base">
                    /{service.id}
                  </span>
                  <h3 className="font-display text-4xl md:text-6xl font-bold text-white transition-all duration-300 group-hover:translate-x-4">
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-center gap-8 md:gap-16 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform md:translate-x-4 md:group-hover:translate-x-0">
                  <p className="font-sans text-gray-400 max-w-md hidden md:block">
                    {service.description}
                  </p>
                  <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center bg-white text-black md:bg-transparent md:text-white md:group-hover:bg-accent md:group-hover:text-black transition-all">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Background Reveal on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent to-surface-light transition-opacity duration-500 pointer-events-none ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
              />
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
