import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
const page = async (path) => {
  const response = await fetch(`${base}${path}`);
  const html = (await response.text()).replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
  return { response, html };
};

const jsonLdObjects = (html) =>
  [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(([, source]) => JSON.parse(source));

const objectsWithType = (value, type) => {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => objectsWithType(entry, type));
  }
  if (!value || typeof value !== "object") return [];

  const declaredTypes = Array.isArray(value["@type"])
    ? value["@type"]
    : [value["@type"]];
  const matches = declaredTypes.includes(type) ? [value] : [];
  return [
    ...matches,
    ...Object.values(value).flatMap((entry) => objectsWithType(entry, type)),
  ];
};

test("desktop language switch stays boxed and vertically centered at the right edge", async () => {
  const css = await readFile(new URL("../src/app/studio-neural.css", import.meta.url), "utf8");
  assert.match(css, /\.language-switch\s*\{[^}]*position:\s*fixed/i);
  assert.match(css, /\.language-switch\s*\{[^}]*right:\s*0/i);
  assert.match(css, /\.language-switch\s*\{[^}]*top:\s*50%/i);
  assert.match(css, /\.language-switch\s*\{[^}]*flex-direction:\s*column/i);
  assert.match(css, /\.language-switch\s+a\s*\{[^}]*border(?:-[a-z]+)?:/i);
  assert.match(css, /@media\s*\(max-width:\s*720px\)[\s\S]*\.language-switch\s*\{[^}]*flex-direction:\s*row/i);
});

test("production health, SEO, agent discovery and security boundaries are active", async () => {
  const [home, health, robots, sitemap, llms] = await Promise.all([
    fetch(`${base}/`),
    fetch(`${base}/api/health`),
    fetch(`${base}/robots.txt`),
    fetch(`${base}/sitemap.xml`),
    fetch(`${base}/llms.txt`),
  ]);

  assert.equal(home.status, 200);
  assert.equal(home.headers.get("x-content-type-options"), "nosniff");
  assert.equal(home.headers.get("x-frame-options"), "DENY");
  assert.equal(home.headers.get("x-powered-by"), null);
  assert.equal(health.status, 200);
  assert.equal((await health.json()).status, "ok");
  assert.match(await robots.text(), /https:\/\/hazarvolga\.com\.tr\/sitemap\.xml/);
  assert.match(await sitemap.text(), /https:\/\/hazarvolga\.com\.tr\/calismalar\/signal/);
  assert.equal(llms.status, 200);
  assert.match(llms.headers.get("content-type") ?? "", /^text\/plain/i);
  const llmsText = await llms.text();
  assert.match(llmsText, /^# Hazar & Hülya/m);
  assert.match(llmsText, /\[Work archive\]\(https:\/\/hazarvolga\.com\.tr\/calismalar\)/);
  assert.match(llmsText, /\[Contact\]\(https:\/\/hazarvolga\.com\.tr\/iletisim\)/);

  for (const path of [
    "/dashboard",
    "/api/telemetry",
    "/api/pulse",
    "/mail.php",
  ]) {
    assert.equal((await fetch(`${base}${path}`)).status, 404, path);
  }
});

test("Google Analytics is consent-aware and uses the configured GA4 property", async () => {
  const { html } = await page("/");
  const consentSource = await readFile(
    new URL("../src/components/analytics/GoogleAnalyticsConsent.tsx", import.meta.url),
    "utf8",
  );
  assert.match(html, /G-RVL7BVMCHT/);
  assert.match(html, /Analitik çerezlerini kabul et/i);
  assert.match(html, /Analitik çerezlerini reddet/i);
  assert.match(html, /analytics-consent/i);
  assert.match(html, /href="\/gizlilik"/i);
  assert.doesNotMatch(html, /<script[^>]+src="https:\/\/www\.googletagmanager\.com\/gtag\/js/i);
  assert.match(consentSource, /analytics_storage:\s*"denied"/);
  assert.match(consentSource, /ga-disable-/);
  assert.match(consentSource, /deleteAnalyticsCookies/);
  assert.match(consentSource, /policyVersion/);
});

test("the privacy notice explains KVKK, GDPR and analytics choices", async () => {
  const { response, html } = await page("/gizlilik");
  assert.equal(response.status, 200);
  assert.match(html, /KVKK/);
  assert.match(html, /GDPR/);
  assert.match(html, /Google Analytics/i);
  assert.match(html, /info@hazarvolga\.com\.tr/);
  assert.match(html, /çerez tercih/i);
});

test("Aluplan Destek communicates its active AI support ticket role", async () => {
  const { html } = await page("/calismalar/aluplan-destek");
  assert.match(html, /Yapay zekâ destekli destek talebi platformu/);
  assert.match(html, /Aktif kullanımda/);
  assert.match(html, /support ticket/i);
  for (const capability of [
    /PostgreSQL/i,
    /pgvector/i,
    /RAG/i,
    /FAQ/i,
    /insan onaylı/i,
    /PII maskeleme/i,
    /semantik tekilleştirme/i,
    /no-match/i,
    /deflection/i,
    /CRM/i,
  ]) {
    assert.match(html, capability);
  }
  for (const image of [
    "/portfolio/aluplan-destek-faq-learning.webp",
    "/portfolio/aluplan-destek-system-topology.webp",
    "/portfolio/aluplan-destek-ai-intelligence.webp",
    "/portfolio/aluplan-destek-crm.webp",
  ]) {
    assert.ok(html.includes(image), `${image} must be shown in the project`);
  }
  assert.doesNotMatch(html, /tam otonom|kendi kendine hatasız öğren/i);
  assert.match(html, /href="https:\/\/allplan\.net\.tr\/tr"/);
});

test("essential portfolio is rendered in Turkish, without waiting for JavaScript", async () => {
  const { response, html } = await page("/");
  assert.equal(response.status, 200);
  assert.match(html, /<html[^>]*lang="tr"/);
  assert.doesNotMatch(html, /name="robots"[^>]*noindex/);
  assert.match(html, /href="\/calismalar\/bosch-respect"/);
  assert.match(html, /Hülya Ekiz/);
  assert.doesNotMatch(html, /visibility:\s*hidden/);
});

test("the working desk and its surrounding portfolio stay useful without JavaScript", async () => {
  const { response, html } = await page("/");
  assert.equal(response.status, 200);
  assert.match(html, /Masadan parçalar/);
  const desk = html.match(
    /<section\b[^>]*\bid="calisma-masasi"[^>]*>[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(desk, "the working desk must be server-rendered");

  // The physics enhancement must never be required to render the real work.
  for (const source of [
    "/portfolio/tc7.jpg",
    "/portfolio/typography-5.jpg",
    "/portfolio/affexai.jpg",
    "/portfolio/jhm3.jpg",
  ]) {
    const image = [...desk.matchAll(/<img\b[^>]*>/g)]
      .map(([tag]) => tag)
      .find((tag) => tag.includes(`src="${source}"`));
    assert.ok(image, `${source} must render before hydration`);
    assert.match(image, /\balt="[^"]+"/, `${source} needs a useful alternative`);
  }

  for (const href of [
    "/calismalar/bosch-respect",
    "/calismalar/jhm-studio",
    "/hakkimizda",
    "/iletisim",
  ]) {
    assert.ok(html.includes(`href="${href}"`), `${href} remains a native link`);
  }
  assert.match(html, /Hülya Ekiz/);
  assert.match(html, /Hazar Volga Ekiz/);
});

test("the original neural hero preserves its content before animation loads", async () => {
  const { response, html } = await page("/");
  assert.equal(response.status, 200);
  const hero = html.match(
    /<section\b[^>]*\bclass="home-hero wrap"[^>]*>[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(hero, "the hero must be server-rendered");
  const heading = hero.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  assert.ok(heading, "the real portfolio headline must remain in the hero");
  const text = heading.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  assert.match(text, /Markanız için\s+tasarım\.\s+İşiniz için\s+teknoloji\./);
  for (const href of [
    "/calismalar",
    "/iletisim",
    "/calismalar/bosch-respect",
    "/calismalar/jhm-studio",
  ]) {
    assert.ok(hero.includes(`href="${href}"`), `${href} stays usable without WebGL`);
  }
  const field = hero.match(
    /<div\b[^>]*\bclass="hero-neural-field"[^>]*>([\s\S]*?)<div\b[^>]*\bclass="hero-intro"/,
  )?.[1];
  assert.ok(field, "the neural field belongs in the hero, before its content");
  assert.match(
    field,
    /<svg\b|<img\b/,
    "the neural field needs a static visual before its canvas loads",
  );
  assert.doesNotMatch(html, /\bid="fikirden-sisteme"/);
  assert.match(html, /\bid="calisma-masasi"/);
});

test("public routes, project details and image files are available", async () => {
  for (const path of [
    "/calismalar",
    "/hizmetler",
    "/hakkimizda",
    "/iletisim",
  ]) {
    const { response, html } = await page(path);
    assert.equal(response.status, 200, path);
    assert.doesNotMatch(html, /name="robots"[^>]*noindex/, path);
  }
  const { html } = await page("/calismalar");
  const paths = [
    ...new Set(
      [...html.matchAll(/href="(\/calismalar\/[^"#?]+)"/g)].map(
        (match) => match[1],
      ),
    ),
  ];
  assert.equal(paths.length, 25);
  const detailHtml = await Promise.all(
    paths.map(async (path) => {
      const result = await page(path);
      assert.equal(result.response.status, 200, path);
      assert.match(result.html, /<h1\b/);
      assert.doesNotMatch(result.html, /name="robots"[^>]*noindex/, path);
      return result.html;
    }),
  );
  const images = [
    ...new Set(
      [
        ...[html, ...detailHtml]
          .join("\n")
          .matchAll(/<img\b[^>]*\bsrc="(\/portfolio\/[^"?]+)"/g),
      ].map((match) => match[1]),
    ),
  ];
  assert.ok(images.length >= 18);
  for (const image of images) {
    const response = await fetch(`${base}${image}`);
    assert.equal(response.status, 200, image);
    assert.match(response.headers.get("content-type"), /^image\//, image);
  }
  assert.equal(
    (await fetch(`${base}/calismalar/bilinmeyen-proje`)).status,
    404,
  );
});

test("Signal is presented as a controlled pilot with a public landing and sign-in view", async () => {
  const { response, html } = await page("/calismalar/signal");

  assert.equal(response.status, 200);
  assert.match(html, /SIGNAL Broadcast Systems/);
  assert.match(html, /Kontrollü teknik pilot/);
  assert.match(html, /href="https:\/\/github\.com\/hazarvolga\/Signal"/);
  for (const image of [
    "/portfolio/signal-landing.png",
    "/portfolio/signal-login.png",
    "/portfolio/signal-workspace-journeys.webp",
    "/portfolio/signal-insights.webp",
  ]) {
    assert.ok(html.includes(image), `${image} must be shown in the project`);
  }
  assert.doesNotMatch(
    html,
    /ALLPLAN|signal-(?:public|dashboard|automations)\.png/i,
  );
  assert.doesNotMatch(html, /production[- ]ready|KVKK uyumlu|GDPR uyumlu/i);
});

test("Prompt Optimizer is presented as an open-source v1.0.0 agent skill with GitHub repository and architecture visuals", async () => {
  const { response, html } = await page("/calismalar/prompt-optimizer");

  assert.equal(response.status, 200);
  assert.match(html, /Prompt Optimizer/);
  assert.match(html, /Açık kaynak · v1\.0\.0/);
  assert.match(html, /href="https:\/\/github\.com\/hazarvolga\/prompt-optimizer"/);
  for (const image of [
    "/portfolio/prompt-optimizer-cover.webp",
    "/portfolio/prompt-optimizer-gears.webp",
    "/portfolio/prompt-optimizer-adapters.webp",
  ]) {
    assert.ok(html.includes(image), `${image} must be shown in the project`);
  }
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? "";
  assert.doesNotMatch(article, /—|tam otonom|büyüleyici|adeta/i);
});

test("the complete archive exposes the additional print and typography projects", async () => {
  const { html: listing } = await page("/calismalar");
  for (const slug of ["bosch-brosur", "tipografi-afisleri", "bosch-touch"]) {
    assert.ok(
      listing.includes(`href="/calismalar/${slug}"`),
      `${slug} must be discoverable from the project listing`,
    );
    const { response, html } = await page(`/calismalar/${slug}`);
    assert.equal(response.status, 200, slug);
    assert.match(html, /Hülya Ekiz/, slug);
    assert.match(html, /<h1\b/, slug);
  }
});

test("Bosch magazine video supports deliberate playback and seeking", async () => {
  const { response, html } = await page("/calismalar/bosch-touch");
  assert.equal(response.status, 200);
  assert.match(html, /Bosch/);
  assert.match(html, /dergi/i);
  const videoTag = html.match(/<video\b[^>]*>/i)?.[0];
  assert.ok(
    videoTag,
    "the magazine project must include a native video player",
  );
  assert.match(videoTag, /\scontrols(?:\s|=|>)/i);
  assert.match(videoTag, /\splaysinline(?:\s|=|>)/i);
  assert.match(videoTag, /\spreload="none"/i);
  assert.doesNotMatch(videoTag, /\sautoplay(?:\s|=|>)/i);
  assert.match(
    html,
    /(?:<video|<source)\b[^>]*\bsrc="\/portfolio\/touch\.mp4"/i,
  );

  const media = await fetch(`${base}/portfolio/touch.mp4`, {
    headers: { Range: "bytes=0-1023" },
  });
  assert.equal(media.status, 206, "seeking requires byte-range responses");
  assert.match(media.headers.get("content-type"), /^video\/mp4/);
  assert.match(media.headers.get("content-range"), /^bytes 0-1023\/\d+$/);
  assert.equal((await media.arrayBuffer()).byteLength, 1024);
});

test("art direction credits preserve the actual agency relationship", async () => {
  for (const slug of ["bosch-respect", "pirelli", "siemens"]) {
    const { html } = await page(`/calismalar/${slug}`);
    for (const text of ["Art Director", "Hülya Ekiz", "CFA"])
      assert.ok(html.includes(text), `${slug}: ${text}`);
  }
  const { html: university } = await page("/calismalar/job");
  assert.match(university, /Üniversite projesi/);
  assert.doesNotMatch(university, /ödüllü|ödül kazandı/i);
  const { html: product } = await page("/calismalar/bimmetraj");
  assert.match(product, /Geliştirme aşamasında/);
  assert.doesNotMatch(product, /BIM uzmanıy|BIM uzmanlığımız/i);
});

test("contact honestly opens email instead of faking a delivered request", async () => {
  const { html } = await page("/iletisim");
  assert.match(html, /href="mailto:info@hazarvolga.com.tr/);
  assert.match(html, /e-posta uygulamanız/i);
  assert.doesNotMatch(html, /<form\b|mail\.php|Mesajınız gönderildi/);
});

test("Turkish service landing pages render trustworthy evidence without JavaScript", async () => {
  const services = [
    {
      slug: "freelance-web-tasarimci",
      heading: /Freelance Web Tasarımcı/i,
      provider: "Hazar Volga Ekiz",
      content: /kurumsal web|web sitesi|Next\.js/i,
      cases: ["aluplan", "aluplan-destek"],
    },
    {
      slug: "freelance-grafik-tasarimci",
      heading: /Freelance Grafik Tasarımcı/i,
      provider: "Hülya Ekiz",
      content: /Art Director[\s\S]*CFA|CFA[\s\S]*Art Director/i,
      cases: ["bosch-respect", "travel-cafe", "jhm-studio"],
    },
    {
      slug: "ai-otomasyon-ozel-yazilim",
      heading: /(?:AI|Yapay Zekâ).*Otomasyon.*Özel Yazılım/i,
      provider: "Hazar Volga Ekiz",
      content: /RAG|otomasyon|özel yazılım/i,
      cases: ["aluplan-destek", "signal", "bimmetraj", "affexai"],
      stages: [
        /Aktif kullanımda/i,
        /Kontrollü teknik pilot/i,
        /Geliştirme aşamasında/i,
        /Erken erişim.*davet|davetle|davete özel/i,
      ],
    },
  ];

  for (const service of services) {
    const response = await fetch(`${base}/${service.slug}`);
    const raw = await response.text();
    const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const visibleMain = main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const heading = main
      .match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ") ?? "";

    assert.equal(response.status, 200, service.slug);
    assert.match(heading, service.heading, `${service.slug}: server-rendered H1`);
    assert.match(visibleMain, service.content, `${service.slug}: useful service content`);
    assert.doesNotMatch(visibleMain, /İstanbul merkezli|based in Istanbul|in Istanbul|aus Istanbul/i, `${service.slug}: no incorrect location claim`);
    assert.match(raw, new RegExp(`<title>[^<]*${service.heading.source}[^<]*<\\/title>`, "i"));

    for (const project of service.cases) {
      assert.ok(
        main.includes(`href="/calismalar/${project}"`),
        `${service.slug}: ${project} must be a real portfolio link`,
      );
    }
    for (const stage of service.stages ?? []) {
      assert.match(visibleMain, stage, `${service.slug}: honest stage wording`);
    }

    const schemas = jsonLdObjects(raw);
    const serviceSchemas = schemas.flatMap((schema) =>
      objectsWithType(schema, "Service"),
    );
    assert.equal(serviceSchemas.length, 1, `${service.slug}: one Service JSON-LD`);
    assert.ok(
      serviceSchemas.some((schema) =>
        objectsWithType(schema.provider, "Person").some(
          (provider) => provider.name === service.provider,
        ),
      ),
      `${service.slug}: provider must be Person ${service.provider}`,
    );
    assert.equal(
      schemas.flatMap((schema) => objectsWithType(schema, "LocalBusiness")).length,
      0,
      `${service.slug}: do not invent a LocalBusiness entity`,
    );
    assert.equal(
      schemas.flatMap((schema) => objectsWithType(schema, "ProfessionalService")).length,
      0,
      `${service.slug}: do not invent a ProfessionalService entity`,
    );
  }
});

test("service hubs, sitemap and llms.txt discover every focused service landing", async () => {
  const slugs = [
    "freelance-web-tasarimci",
    "freelance-grafik-tasarimci",
    "ai-otomasyon-ozel-yazilim",
  ];
  const [{ html: hub }, sitemap, llms] = await Promise.all([
    page("/hizmetler"),
    fetch(`${base}/sitemap.xml`).then((response) => response.text()),
    fetch(`${base}/llms.txt`).then((response) => response.text()),
  ]);

  for (const slug of slugs) {
    assert.ok(hub.includes(`href="/${slug}"`), `${slug}: linked from /hizmetler`);
    assert.match(
      llms,
      new RegExp(`https://hazarvolga\\.com\\.tr/${slug}(?:\\)|\\s|$)`),
      `${slug}: linked from llms.txt`,
    );
    for (const prefix of ["", "/en", "/de"]) {
      const url = `https://hazarvolga.com.tr${prefix}/${slug}`;
      assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${url}: sitemap entry`);
    }
  }
});

test("selected work features Aluplan Support while FPVLovers remains in the full archive", async () => {
  const [{ html: home }, { html: archive }] = await Promise.all([
    page("/"),
    page("/calismalar"),
  ]);
  const selected = home.match(
    /<section\b[^>]*\bid="secilmis-isler"[^>]*>[\s\S]*?<\/section>/i,
  )?.[0];

  assert.ok(selected, "the server-rendered selected work section must exist");
  assert.ok(
    selected.includes('href="/calismalar/aluplan-destek"'),
    "allplan.net.tr Aluplan Support must be featured",
  );
  assert.match(selected, /allplan\.net\.tr/i);
  assert.match(selected, /destek talebi platformu/i);
  assert.ok(
    !selected.includes('href="/calismalar/fpvlovers"'),
    "FPVLovers is replaced in selected work",
  );
  assert.ok(
    archive.includes('href="/calismalar/fpvlovers"'),
    "FPVLovers remains discoverable in the complete archive",
  );
});

test("BIMMetraj and FPVLovers visibly disclose their development stage", async () => {
  for (const slug of ["bimmetraj", "fpvlovers"]) {
    const { response, html } = await page(`/calismalar/${slug}`);
    assert.equal(response.status, 200, slug);
    assert.match(html, /Geliştirme aşamasında/i, `${slug}: honest stage label`);
  }
});
