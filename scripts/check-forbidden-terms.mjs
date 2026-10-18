// Fails when out-of-scope terminology appears in shipped code or assets (spec §1, §10).
// Zakat and waqf are permanently out of scope for this product. Run: npm run check:terms
import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const FORBIDDEN = /\b(zakat|zakah|zakaat|waqf|awqaf)\b/i;
const SCAN_DIRS = ["src", "public"];
const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".css",
  ".json",
  ".md",
  ".svg",
  ".html",
  ".txt",
]);

/** Returns the 1-based line numbers containing a forbidden term. */
export function findForbiddenLines(text) {
  return text.split(/\r?\n/).flatMap((line, i) => (FORBIDDEN.test(line) ? [i + 1] : []));
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (TEXT_EXT.has(extname(entry.name))) yield path;
  }
}

async function main() {
  const hits = [];
  for (const dir of SCAN_DIRS) {
    for await (const file of walk(dir)) {
      for (const line of findForbiddenLines(await readFile(file, "utf8")))
        hits.push(`${file}:${line}`);
    }
  }
  if (hits.length) {
    console.error(`Out-of-scope terminology found (see spec §1):\n  ${hits.join("\n  ")}`);
    process.exit(1);
  }
  console.log("Terminology check passed.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
