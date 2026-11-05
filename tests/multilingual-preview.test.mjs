import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
const locales = ["tr", "en", "de"];
const urlFor = (locale, path = "") => `${locale === "tr" ? "" : `/${locale}`}${path}` || "/";
async function read(path) {
  const response = await fetch(new URL(path, base));
  const raw = await response.text();
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  return { response, html, raw };
}
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map(([value]) => value);
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
const visible = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const mainText = (html) => visible(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "");
const jsonLdObjects = (html) =>
  [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(([, source]) => JSON.parse(source));
const objectsWithType = (value, type) => {
  if (Array.isArray(value)) return value.flatMap((entry) => objectsWithType(entry, type));
  if (!value || typeof value !== "object") return [];
  const declaredTypes = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
  return [
    ...(declaredTypes.includes(type) ? [value] : []),
    ...Object.values(value).flatMap((entry) => objectsWithType(entry, type)),
  ];
};

test("all languages expose their own indexable server-rendered homepage and language", async () => {
  const pages = await Promise.all(locales.map(async locale => {
    const path = urlFor(locale);
    const { response, html } = await read(path);
    assert.equal(response.status, 200, path);
    assert.equal(attr(tags(html, "html")[0], "lang"), locale, path);
    assert.match(html, /<h1\b[^>]*>[\s\S]*?<\/h1>/i, path);
    assert.ok(!tags(html, "meta").some(tag => attr(tag, "name") === "robots" && /noindex/i.test(attr(tag, "content") || "")), path);
    return mainText(html);
  }));
  assert.notEqual(pages[0], pages[1], "English content must be translated on the server");
  assert.notEqual(pages[0], pages[2], "German content must be translated on the server");
  assert.notEqual(pages[1], pages[2], "English and German should differ");
});

test("all project details have localized main content in English and German", async () => {
  const { html } = await read("/calismalar");
  const paths = [...new Set([...html.matchAll(/href="(\/calismalar\/[^"#?]+)"/g)].map(match => match[1]))];
  assert.equal(paths.length, 24, "the complete Turkish archive remains available");
  for (const path of paths) {
    const original = mainText((await read(path)).html);
    assert.ok(original.length > 80, `${path} has meaningful content`);
    for (const locale of ["en", "de"]) {
      const route = urlFor(locale, path);
      const { response, html: translated } = await read(route);
      assert.equal(response.status, 200, route);
      const content = mainText(translated);
      assert.ok(content.length > 80, `${route} has meaningful content`);
      assert.notEqual(content, original, `${route} must translate the project, not just navigation`);
    }
  }
});

test("important pages and project details remain in the selected language", async () => {
  for (const path of ["/calismalar", "/hizmetler", "/hakkimizda", "/iletisim", "/calismalar/aluplan-destek", "/calismalar/bosch-respect", "/calismalar/signal"]) {
    const pages = await Promise.all(locales.map(async locale => {
      const route = urlFor(locale, path);
      const { response, html } = await read(route);
      assert.equal(response.status, 200, route);
      assert.equal(attr(tags(html, "html")[0], "lang"), locale, route);
      assert.match(html, /<h1\b[^>]*>[\s\S]*?<\/h1>/i, route);
      return html;
    }));
    if (path === "/calismalar/aluplan-destek") {
      for (const html of pages) assert.match(html, /allplan\.net\.tr/i);
      assert.doesNotMatch(visible(pages[1]), /Yapay zekâ destekli destek talebi platformu/);
      assert.doesNotMatch(visible(pages[2]), /Yapay zekâ destekli destek talebi platformu/);
      assert.match(visible(pages[0]), /insan onaylı/i);
      assert.match(visible(pages[1]), /human-reviewed/i);
      assert.match(visible(pages[2]), /menschlich geprüften/i);
      for (const html of pages) {
        assert.match(html, /aluplan-destek-faq-learning\.webp/);
        assert.match(html, /aluplan-destek-system-topology\.webp/);
        assert.match(html, /aluplan-destek-ai-intelligence\.webp/);
        assert.match(html, /aluplan-destek-crm\.webp/);
      }
      assert.match(pages[1], /alt="[^"]*(?:FAQ|RAG|CRM)[^"]*"/i);
      assert.match(pages[2], /alt="[^"]*(?:FAQ|RAG|CRM)[^"]*"/i);
    }
    if (path === "/calismalar/bosch-respect") {
      for (const html of pages) for (const name of ["Bosch", "Hülya", "CFA"]) assert.ok(html.includes(name), `${path}: ${name}`);
    }
    if (path === "/calismalar/signal") {
      assert.match(visible(pages[0]), /Kontrollü teknik pilot/);
      assert.match(visible(pages[1]), /Controlled technical pilot/);
      assert.match(visible(pages[2]), /Kontrolliertes technisches Pilotprojekt/);
      for (const html of pages) {
        assert.match(html, /github\.com\/hazarvolga\/Signal/);
        assert.match(html, /signal-workspace-journeys\.webp/);
        assert.match(html, /signal-insights\.webp/);
        assert.doesNotMatch(html, /Anadolu University project article|Projektbericht der Anadolu-Universität/);
      }
    }
  }
});

test("alternate languages and language switch point to the equivalent project page", async () => {
  const path = "/calismalar/bosch-respect";
  for (const locale of locales) {
    const { html } = await read(urlFor(locale, path));
    const links = tags(html, "link").filter(tag => attr(tag, "rel") === "alternate");
    const anchors = tags(html, "a");
    for (const target of locales) {
      const expected = urlFor(target, path);
      assert.ok(links.some(tag => attr(tag, "hreflang") === target && new URL(attr(tag, "href"), base).pathname === expected), `${locale}: ${target} hreflang`);
      assert.ok(anchors.some(tag => attr(tag, "href") === expected), `${locale}: ${target} language link`);
    }
  }
});

test("focused service pages keep localized content, canonical metadata and language routes aligned", async () => {
  const services = [
    {
      slug: "freelance-web-tasarimci",
      provider: "Hazar Volga Ekiz",
      headings: {
        tr: /Freelance Web Tasarımcı/i,
        en: /Freelance Web Designer/i,
        de: /Freelance Webdesigner/i,
      },
      localeCopy: {
        tr: /web sitesi|kurumsal web/i,
        en: /website|web design/i,
        de: /Website|Webdesign/i,
      },
    },
    {
      slug: "freelance-grafik-tasarimci",
      provider: "Hülya Ekiz",
      headings: {
        tr: /Freelance Grafik Tasarımcı/i,
        en: /Freelance Graphic Designer/i,
        de: /Freelance Grafikdesigner(?:in)?/i,
      },
      localeCopy: {
        tr: /grafik tasarım|sanat yönetimi/i,
        en: /graphic design|art direction/i,
        de: /Grafikdesign|Art Direction/i,
      },
    },
    {
      slug: "ai-otomasyon-ozel-yazilim",
      provider: "Hazar Volga Ekiz",
      headings: {
        tr: /(?:AI|Yapay Zekâ).*Otomasyon.*Özel Yazılım/i,
        en: /AI Automation.*Custom Software/i,
        de: /KI-Automatisierung.*Individuelle Software/i,
      },
      localeCopy: {
        tr: /kontrollü teknik pilot|geliştirme aşamasında/i,
        en: /controlled technical pilot|under development/i,
        de: /kontrolliertes technisches Pilotprojekt|in Entwicklung/i,
      },
    },
  ];

  for (const service of services) {
    const localizedMain = [];
    for (const locale of locales) {
      const route = urlFor(locale, `/${service.slug}`);
      const { response, html, raw } = await read(route);
      const text = mainText(html);
      const heading = visible(
        html.match(/<main\b[^>]*>[\s\S]*?<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "",
      );
      const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
      const links = tags(html, "link");
      const anchors = tags(html, "a");

      assert.equal(response.status, 200, route);
      assert.equal(attr(tags(html, "html")[0], "lang"), locale, route);
      assert.match(heading, service.headings[locale], `${route}: localized SSR H1`);
      assert.match(title, service.headings[locale], `${route}: localized title`);
      assert.match(text, service.localeCopy[locale], `${route}: localized service copy`);
      assert.doesNotMatch(text, /İstanbul merkezli|based in Istanbul|in Istanbul|aus Istanbul/i, `${route}: no incorrect location claim`);

      const canonical = links.find((tag) => attr(tag, "rel") === "canonical");
      assert.ok(canonical, `${route}: canonical`);
      const canonicalUrl = new URL(attr(canonical, "href"), base);
      assert.equal(canonicalUrl.origin, "https://hazarvolga.com.tr", `${route}: canonical host`);
      assert.equal(canonicalUrl.pathname, route, `${route}: canonical path`);

      for (const target of locales) {
        const expected = urlFor(target, `/${service.slug}`);
        const alternate = links.find(
          (tag) => attr(tag, "rel") === "alternate" && attr(tag, "hreflang") === target,
        );
        assert.ok(alternate, `${route}: ${target} hreflang`);
        const alternateUrl = new URL(attr(alternate, "href"), base);
        assert.equal(alternateUrl.origin, "https://hazarvolga.com.tr");
        assert.equal(alternateUrl.pathname, expected);
        assert.ok(
          anchors.some((tag) => attr(tag, "href") === expected),
          `${route}: ${target} language switch keeps the service slug`,
        );
      }

      const schemas = jsonLdObjects(raw);
      const serviceSchemas = schemas.flatMap((schema) => objectsWithType(schema, "Service"));
      assert.equal(serviceSchemas.length, 1, `${route}: one Service JSON-LD`);
      assert.ok(
        serviceSchemas.some((schema) =>
          objectsWithType(schema.provider, "Person").some(
            (provider) => provider.name === service.provider,
          ),
        ),
        `${route}: Person provider ${service.provider}`,
      );
      assert.equal(schemas.flatMap((schema) => objectsWithType(schema, "LocalBusiness")).length, 0);
      assert.equal(schemas.flatMap((schema) => objectsWithType(schema, "ProfessionalService")).length, 0);
      localizedMain.push(text);
    }
    assert.equal(new Set(localizedMain).size, locales.length, `${service.slug}: three real translations`);
  }
});

test("each localized services hub links to the matching localized landing pages", async () => {
  const slugs = [
    "freelance-web-tasarimci",
    "freelance-grafik-tasarimci",
    "ai-otomasyon-ozel-yazilim",
  ];

  for (const locale of locales) {
    const route = urlFor(locale, "/hizmetler");
    const { response, html } = await read(route);
    assert.equal(response.status, 200, route);
    for (const slug of slugs) {
      const expected = urlFor(locale, `/${slug}`);
      assert.ok(
        tags(html, "a").some((tag) => attr(tag, "href") === expected),
        `${route}: links to ${expected}`,
      );
    }
  }
});

test("development-stage portfolio products disclose their stage in every language", async () => {
  const stage = {
    tr: /Geliştirme aşamasında/i,
    en: /In development/i,
    de: /In Entwicklung/i,
  };

  for (const slug of ["bimmetraj", "fpvlovers"]) {
    for (const locale of locales) {
      const route = urlFor(locale, `/calismalar/${slug}`);
      const { response, html } = await read(route);
      assert.equal(response.status, 200, route);
      assert.match(mainText(html), stage[locale], `${route}: localized stage label`);
    }
  }
});

test("privacy information is localized and linked from every language", async () => {
  const expected = {
    tr: /Gizlilik ve Çerezler/i,
    en: /Privacy and Cookies/i,
    de: /Datenschutz und Cookies/i,
  };
  for (const locale of locales) {
    const route = urlFor(locale, "/gizlilik");
    const { response, html } = await read(route);
    assert.equal(response.status, 200, route);
    assert.match(mainText(html), expected[locale]);
    assert.match(mainText(html), /Google Analytics/i);
    assert.ok(tags(html, "a").some((tag) => attr(tag, "href") === route));
  }
});
