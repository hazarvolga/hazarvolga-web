"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DICTIONARIES, Locale } from "./dictionaries";

type LanguageContextType = {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: typeof DICTIONARIES["EN"];
};

// Use a more generic type assertion for t to allow for different string values but same keys
const getDictionary = (lang: Locale): typeof DICTIONARIES["EN"] => {
    return DICTIONARIES[lang] as unknown as typeof DICTIONARIES["EN"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Locale>("EN");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Optional: Load from local storage here
    }, []);

    const value = {
        language,
        setLanguage,
        t: getDictionary(language),
    };

    return (
        <LanguageContext.Provider value={value}>
            {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
