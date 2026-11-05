import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("package metadata requires the patched Node 24 LTS line", () => {
  const pkg = JSON.parse(read("package.json"));
  const lock = JSON.parse(read("package-lock.json"));

  assert.equal(pkg.engines?.node, ">=24.22.2 <25");
  assert.equal(lock.packages?.[""]?.engines?.node, pkg.engines.node);
});

test("local development pins the reviewed Node release", () => {
  assert.equal(read(".nvmrc").trim(), "24.22.2");
});

test("CI follows the latest Node 24 security patch", () => {
  const workflow = read(".github/workflows/deploy.yml");

  assert.match(workflow, /node-version:\s*['"]24\.22\.2['"]/);
  assert.doesNotMatch(workflow, /node-version:\s*['"]20(?:\.[^'"]*)?['"]/);
});

test("the Coolify image pins the reviewed Node 24 runtime", () => {
  const dockerfile = read("Dockerfile");

  assert.match(dockerfile, /^FROM node:24\.22\.2-alpine/m);
  assert.doesNotMatch(dockerfile, /^FROM node:(?:20|22)(?:\.|:)/m);
});
