import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
const locales = ["tr", "en", "de"];
const urlFor = (locale, path = "") => `${locale === "tr" ? "" : `/${locale}`}${path}` || "/";
async function read(path) {
  const response = await fetch(new URL(path, base));
  const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  return { response, html };
}
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map(([value]) => value);
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
const visible = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const mainText = (html) => visible(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "");

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
