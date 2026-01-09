export const SITE_CONFIG = {
    name: "HAZAR & HULYA",
    description: "Digital Architects crafting immersive, gravity-defying web experiences.",
    url: "https://hazarvolga.com.tr",
    ogImage: "https://hazarvolga.com.tr/og-image.jpg",
    links: {
        github: "https://github.com/hazarvolga",
        linkedin: "https://www.linkedin.com/in/hazar-volga-ekiz-freelancer/",
        instagram: "https://www.instagram.com/hazarvolga/",
        facebook: "https://www.facebook.com/fpvloverscom",
    },
    contact: {
        email: "info@hazarvolga.com.tr",
        phone: "+90 (555) 123-4567",
        address: "Istanbul, Turkey",
    },
};

export const NAV_LINKS = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
];

export const SERVICE_CATEGORIES = [
    "Web Design & Development",
    "UI/UX Design",
    "Digital Marketing",
    "Social Media Management",
    "Brand Identity",
    "SEO & Analytics",
] as const;

export const FILTERS = [
    { name: "All", value: "all" },
    { name: "Web", value: "web" },
    { name: "Mobile", value: "mobile" },
    { name: "Branding", value: "branding" },
    { name: "Social", value: "social" },
] as const;
