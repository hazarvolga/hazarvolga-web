import type { Metadata } from "next";
import { PrivacyNotice } from "@/components/studio/PrivacyNotice";

export const metadata: Metadata = {
  title: "Gizlilik ve Çerezler",
  description: "hazarvolga.com.tr KVKK, GDPR, Google Analytics ve çerez tercihleri hakkında gizlilik açıklaması.",
  alternates: {
    canonical: "/gizlilik",
    languages: { tr: "/gizlilik", en: "/en/gizlilik", de: "/de/gizlilik" },
  },
};

export default function PrivacyPage() {
  return <PrivacyNotice locale="tr" />;
}
