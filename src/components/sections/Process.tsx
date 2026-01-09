"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Process() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const processSteps = [
    { prefix: "01", title: t.process.step1_title, desc: t.process.step1_desc },
    { prefix: "02", title: t.process.step2_title, desc: t.process.step2_desc },
    { prefix: "03", title: t.process.step3_title, desc: t.process.step3_desc },
    { prefix: "04", title: t.process.step4_title, desc: t.process.step4_desc },
    { prefix: "05", title: t.process.step5_title, desc: t.process.step5_desc }
  ];

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="process" className="py-32 bg-surface relative z-20 overflow-hidden">
      {/* Background typographic decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none">
        <span className="font-display text-[20vw] font-bold text-white whitespace-nowrap leading-none select-none">
          {t.process.bgText}
        </span>
      </div>

      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase leading-none">
            {t.process.title}
          </h2>
          <div className="font-mono text-accent text-sm tracking-widest uppercase mt-8 md:mt-0">
            {t.process.subtitle}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative" ref={containerRef}>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              style={{ y: index % 2 === 0 ? 0 : y }} // Parallax effect on odd items
              className="bg-background/50 border border-white/5 p-8 md:p-12 hover:border-accent/30 transition-colors duration-500 group"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-display text-4xl text-transparent stroke-text group-hover:text-accent group-hover:stroke-0 transition-all duration-300">
                  {step.prefix}
                </span>
                <div className="w-2 h-2 bg-white/20 rounded-full group-hover:bg-accent transition-colors" />
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-4 uppercase">
                {step.title}
              </h3>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
