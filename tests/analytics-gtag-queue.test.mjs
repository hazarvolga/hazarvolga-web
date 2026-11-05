import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Google tag queue uses the documented arguments-object command format", async () => {
  const source = await readFile(new URL("../src/components/analytics/GoogleAnalyticsConsent.tsx", import.meta.url), "utf8");
  assert.match(source, /window\.gtag\s*=\s*function\s*\([^)]*\)\s*\{[^}]*window\.dataLayer\.push\(arguments\)/);
});
