"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Locale } from "@/lib/i18n/dictionaries";

const LANGUAGES: { code: Locale; label: string }[] = [
    { code: "EN", label: "English" },
    { code: "TR", label: "Türkçe" },
    { code: "DE", label: "Deutsch" },
    { code: "FR", label: "Français" },
];

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
            {LANGUAGES.map((lang, index) => (
                <motion.button
                    key={lang.code}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => setLanguage(lang.code)}
                    className={`
            w-10 h-10 flex items-center justify-center 
            border transition-all duration-300 backdrop-blur-sm
            font-mono text-xs font-bold
            ${language === lang.code
                            ? "bg-accent border-accent text-black scale-110" // Active: Filled
                            : "bg-black/20 border-white/20 text-white/50 hover:border-white/60 hover:text-white" // Passive: Outline
                        }
          `}
                    aria-label={`Switch to ${lang.label}`}
                >
                    {lang.code}
                </motion.button>
            ))}

            {/* Decorative vertical line */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 60 }}
                transition={{ delay: 1, duration: 1 }}
                className="w-[1px] bg-white/20 mx-auto mt-2"
            />
        </div>
    );
}
