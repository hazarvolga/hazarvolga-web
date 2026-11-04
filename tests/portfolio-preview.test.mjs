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
  assert.match(html, /name="robots"[^>]*noindex/);
  assert.match(html, /href="\/calismalar\/bosch-respect"/);
  assert.match(html, /Hülya Ekiz/);
  assert.doesNotMatch(html, /visibility:\s*hidden/);
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
    assert.match(html, /name="robots"[^>]*noindex/, path);
  }
  const { html } = await page("/calismalar");
  const paths = [
    ...new Set(
      [...html.matchAll(/href="(\/calismalar\/[^"#?]+)"/g)].map(
        (match) => match[1],
      ),
    ),
  ];
  assert.equal(paths.length, 23);
  const detailHtml = await Promise.all(
    paths.map(async (path) => {
      const result = await page(path);
      assert.equal(result.response.status, 200, path);
      assert.match(result.html, /<h1\b/);
      assert.match(result.html, /name="robots"[^>]*noindex/, path);
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
