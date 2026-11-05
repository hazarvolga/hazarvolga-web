import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("production metadata is indexable and points to the canonical domain", async () => {
  const [layout, robotsRoute] = await Promise.all([
    read("src/app/layout.tsx"),
    read("src/app/robots.ts"),
  ]);

  assert.match(layout, /metadataBase:\s*new URL\("https:\/\/hazarvolga\.com\.tr"\)/);
  assert.doesNotMatch(layout, /index:\s*false|follow:\s*false/);
  assert.match(robotsRoute, /sitemap:\s*`\$\{SITE_CONFIG\.url\}\/sitemap\.xml`/);
  assert.doesNotMatch(robotsRoute, /example\.com/);
});

test("the production workflow cannot deploy to Hostinger", async () => {
  const workflow = await read(".github/workflows/deploy.yml");

  assert.doesNotMatch(workflow, /HOSTINGER_|Deploy to Hostinger|rsync|ssh-keyscan/i);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /node --test/);
});

test("Coolify deployment uses an exact Node 24 image and a health endpoint", async () => {
  const [dockerfile, healthRoute, packageJson] = await Promise.all([
    read("Dockerfile"),
    read("src/app/api/health/route.ts"),
    read("package.json"),
  ]);

  assert.match(dockerfile, /FROM node:24\.22\.2-alpine/);
  assert.match(dockerfile, /HEALTHCHECK/);
  assert.match(dockerfile, /USER nextjs/);
  assert.match(healthRoute, /status:\s*"ok"/);
  assert.equal(
    JSON.parse(packageJson).scripts?.postbuild,
    "node execution/prepare-standalone.mjs",
  );
});

test("legacy analytics and Hostinger-only executables are absent", async () => {
  for (const path of [
    "src/app/dashboard/page.tsx",
    "src/app/api/telemetry/route.ts",
    "src/app/api/pulse/route.ts",
    "src/lib/analytics/storage.ts",
    "src/hooks/useAnalytics.ts",
    "public/mail.php",
    ".htaccess.prod",
    "package.server.json",
    "public/robots.txt",
  ]) {
    await assert.rejects(access(new URL(`../${path}`, import.meta.url)), {
      code: "ENOENT",
    });
  }
});
