import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
const page = async (path) => {
  const response = await fetch(`${base}${path}`);
  const html = (await response.text()).replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
  return { response, html };
};

test("production health, SEO and security boundaries are active", async () => {
  const [home, health, robots, sitemap] = await Promise.all([
    fetch(`${base}/`),
    fetch(`${base}/api/health`),
    fetch(`${base}/robots.txt`),
    fetch(`${base}/sitemap.xml`),
  ]);

  assert.equal(home.status, 200);
  assert.equal(home.headers.get("x-content-type-options"), "nosniff");
  assert.equal(home.headers.get("x-frame-options"), "DENY");
  assert.equal(home.headers.get("x-powered-by"), null);
  assert.equal(health.status, 200);
  assert.equal((await health.json()).status, "ok");
  assert.match(await robots.text(), /https:\/\/hazarvolga\.com\.tr\/sitemap\.xml/);
  assert.match(await sitemap.text(), /https:\/\/hazarvolga\.com\.tr\/calismalar\/signal/);

  for (const path of [
    "/dashboard",
    "/api/telemetry",
    "/api/pulse",
    "/mail.php",
  ]) {
    assert.equal((await fetch(`${base}${path}`)).status, 404, path);
  }
});

test("Aluplan Destek communicates its active AI support ticket role", async () => {
  const { html } = await page("/calismalar/aluplan-destek");
  assert.match(html, /Yapay zekâ destekli destek talebi platformu/);
  assert.match(html, /Aktif kullanımda/);
  assert.match(html, /support ticket/i);
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
  assert.equal(paths.length, 24);
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
  ]) {
    assert.ok(html.includes(image), `${image} must be shown in the project`);
  }
  assert.doesNotMatch(
    html,
    /ALLPLAN|signal-(?:public|dashboard|automations)\.png/i,
  );
  assert.doesNotMatch(html, /production[- ]ready|KVKK uyumlu|GDPR uyumlu/i);
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
