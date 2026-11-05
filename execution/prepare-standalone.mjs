import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const standaloneRoot = resolve(root, ".next/standalone");

async function replaceDirectory(source, destination) {
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  await cp(source, destination, { recursive: true, force: true });
}

await Promise.all([
  replaceDirectory(resolve(root, "public"), resolve(standaloneRoot, "public")),
  replaceDirectory(
    resolve(root, ".next/static"),
    resolve(standaloneRoot, ".next/static"),
  ),
]);
