"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    const capabilities = [
        t.about.caps.artDir,
        t.about.caps.interDesign,
        t.about.caps.creativeDev,
        t.about.caps.brandStrat
    ];

    return (
        <section id="about" className="py-32 bg-black relative z-20">
            <div className="container-wide">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Asymmetric Image Composition */}
                    <div className="lg:col-span-5 relative">
                        {/* "Stick" effect only in desktop logic via sticky styling conceptually, but simplified here */}
                        <motion.div
                            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                            whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative aspect-[3/4] w-full bg-surface-light overflow-hidden grayscale"
                        >
                            {/* Placeholder for "Editorial" photo */}
                            <div className="absolute inset-0 bg-neutral-900" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                            <div className="absolute bottom-8 left-8">
                                <p className="font-mono text-xs text-accent mb-2">{t.about.foundersTitle}</p>
                                <h4 className="font-display text-3xl font-bold text-white uppercase">{t.about.foundersName}</h4>
                            </div>
                        </motion.div>

                        {/* Floating Detail */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="absolute -bottom-12 -right-12 bg-accent text-black p-8 max-w-xs hidden lg:block"
                        >
                            <p className="font-display text-4xl font-bold leading-none mb-2">{t.about.experienceYears}</p>
                            <p className="font-sans text-sm font-semibold tracking-wide uppercase">{t.about.experienceDesc}</p>
                        </motion.div>
                    </div>

                    {/* Editorial Content */}
                    <div className="lg:col-span-7 pt-12 lg:pt-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-display text-5xl md:text-7xl font-bold leading-[0.9] text-white mb-12"
                        >
                            {t.about.title} <br />
                            <span className="text-gray-600">{t.about.titleAccent}</span>
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="font-mono text-accent text-sm mb-4 uppercase tracking-widest">{t.about.philTitle}</h3>
                                <p className="font-sans text-gray-400 text-lg leading-relaxed">
                                    {t.about.philDesc}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3 className="font-mono text-accent text-sm mb-4 uppercase tracking-widest">{t.about.appTitle}</h3>
                                <p className="font-sans text-gray-400 text-lg leading-relaxed">
                                    {t.about.appDesc}
                                </p>
                            </motion.div>
                        </div>

                        {/* Micro-List of Capabilities */}
                        <div className="mt-24 border-t border-white/10 pt-12">
                            <div className="flex flex-wrap gap-x-12 gap-y-4">
                                {capabilities.map((item, i) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                                        <span className="font-sans text-sm uppercase tracking-wider text-white">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
