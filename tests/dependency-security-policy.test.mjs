import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const readJson = (path) => JSON.parse(readFileSync(new URL(path, root), "utf8"));

test("security-patched framework dependencies stay on the reviewed baseline", () => {
  const pkg = readJson("package.json");
  const lock = readJson("package-lock.json");

  assert.equal(pkg.dependencies.next, "16.4.5");
  assert.equal(pkg.devDependencies["eslint-config-next"], "16.4.5");
  assert.equal(pkg.dependencies.sharp, "0.35.5");
  assert.equal(pkg.dependencies.zod, "^4.6.7");

  assert.equal(lock.packages["node_modules/next"].version, "16.4.5");
  assert.equal(lock.packages["node_modules/sharp"].version, "0.35.5");
  assert.equal(lock.packages["node_modules/zod"].version, "4.6.7");
});
