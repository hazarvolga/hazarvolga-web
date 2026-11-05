"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Locale = "tr" | "en" | "de";
type Consent = "accepted" | "rejected" | null;
type ConsentRecord = Readonly<{
  choice: Exclude<Consent, null>;
  policyVersion: string;
  decidedAt: string;
  expiresAt: string;
}>;
type AnalyticsWindow = Window & { [key: `ga-disable-${string}`]: boolean };

const storageKey = "analytics-consent";
const policyVersion = "2026-11-05-v1";
const consentLifetimeMs = 180 * 24 * 60 * 60 * 1000;
const labels = {
  tr: {
    text: "Siteyi geliştirmek için yalnızca onayınızla sınırlı ve takma adlı kullanım ölçümü yapıyoruz.",
    accept: "Analitik çerezlerini kabul et",
    reject: "Analitik çerezlerini reddet",
    settings: "Çerez tercihleri",
    details: "Ayrıntılar",
  },
  en: {
    text: "We use limited, pseudonymous usage measurement only with your consent to improve this website.",
    accept: "Accept analytics cookies",
    reject: "Reject analytics cookies",
    settings: "Cookie preferences",
    details: "Details",
  },
  de: {
    text: "Wir messen eine begrenzte, pseudonyme Nutzung nur mit Ihrer Einwilligung, um diese Website zu verbessern.",
    accept: "Analyse-Cookies akzeptieren",
    reject: "Analyse-Cookies ablehnen",
    settings: "Cookie-Einstellungen",
    details: "Details",
  },
} as const;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function loadGoogleTag(measurementId: string) {
  const analyticsWindow = window as unknown as AnalyticsWindow;
  analyticsWindow[`ga-disable-${measurementId}`] = false;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());

  if (!document.getElementById("google-analytics-tag")) {
    const script = document.createElement("script");
    script.id = "google-analytics-tag";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }
}

function readConsentRecord(): ConsentRecord | null {
  const stored = window.localStorage.getItem(storageKey);
  if (!stored) return null;

  try {
    const record = JSON.parse(stored) as Partial<ConsentRecord>;
    const validChoice = record.choice === "accepted" || record.choice === "rejected";
    const expiresAt = typeof record.expiresAt === "string" ? Date.parse(record.expiresAt) : 0;
    if (!validChoice || record.policyVersion !== policyVersion || expiresAt <= Date.now()) {
      window.localStorage.removeItem(storageKey);
      return null;
    }
    return record as ConsentRecord;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

function saveConsentRecord(choice: Exclude<Consent, null>) {
  const decidedAt = new Date();
  const record: ConsentRecord = {
    choice,
    policyVersion,
    decidedAt: decidedAt.toISOString(),
    expiresAt: new Date(decidedAt.getTime() + consentLifetimeMs).toISOString(),
  };
  window.localStorage.setItem(storageKey, JSON.stringify(record));
}

function deleteAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name) && (name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat"));
  const hostname = window.location.hostname;
  const domains = hostname === "hazarvolga.com.tr"
    ? ["", ".hazarvolga.com.tr", "hazarvolga.com.tr"]
    : [""];

  for (const name of cookieNames) {
    for (const domain of domains) {
      const domainAttribute = domain ? `; Domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; Path=/${domainAttribute}; SameSite=Lax`;
    }
  }
}

function revokeAnalytics(measurementId: string) {
  const analyticsWindow = window as unknown as AnalyticsWindow;
  analyticsWindow[`ga-disable-${measurementId}`] = true;
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  deleteAnalyticsCookies();
}

export function GoogleAnalyticsConsent({
  locale,
  measurementId,
}: {
  readonly locale: Locale;
  readonly measurementId: string;
}) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [preferenceKnown, setPreferenceKnown] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    const stored = readConsentRecord();
    if (stored?.choice === "rejected") revokeAnalytics(measurementId);
    const initializePreference = () => {
      setConsent(stored?.choice ?? null);
      setPreferenceKnown(true);
    };
    queueMicrotask(initializePreference);
  }, [measurementId]);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (!initialized.current) {
      loadGoogleTag(measurementId);
      initialized.current = true;
    }
    window.gtag("config", measurementId, {
      page_path: pathname,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }, [consent, measurementId, pathname]);

  const choose = (nextConsent: Exclude<Consent, null>) => {
    if (nextConsent === "rejected") {
      revokeAnalytics(measurementId);
      initialized.current = false;
    }
    saveConsentRecord(nextConsent);
    setConsent(nextConsent);
    setPreferenceKnown(true);
  };

  const copy = labels[locale];
  const privacyPath = `${locale === "tr" ? "" : `/${locale}`}/gizlilik`;
  if (preferenceKnown && consent !== null) {
    return (
      <button
        type="button"
        className="analytics-consent-settings"
        onClick={() => {
          revokeAnalytics(measurementId);
          initialized.current = false;
          window.localStorage.removeItem(storageKey);
          setConsent(null);
        }}
      >
        {copy.settings}
      </button>
    );
  }

  return (
    <aside
      className="analytics-consent"
      aria-label={copy.text}
      data-measurement-id={measurementId}
    >
      <p>{copy.text} <a href={privacyPath}>{copy.details}</a></p>
      <div>
        <button type="button" onClick={() => choose("rejected")}>
          {copy.reject}
        </button>
        <button type="button" className="analytics-consent-accept" onClick={() => choose("accepted")}>
          {copy.accept}
        </button>
      </div>
    </aside>
  );
}
