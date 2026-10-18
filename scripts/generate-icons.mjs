// Regenerates PWA icons from public/icons/icon.svg. Run: node scripts/generate-icons.mjs
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const svg = await readFile("public/icons/icon.svg");
const out = (size, file) => sharp(svg).resize(size, size).png().toFile(`public/icons/${file}`);
await out(192, "icon-192.png");
await out(512, "icon-512.png");
await out(180, "apple-touch-icon.png");
// Maskable: full-bleed background with the mark inside the 80% safe zone.
const inner = await sharp(svg).resize(400, 400).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#0f5132" } })
  .composite([{ input: inner, gravity: "center" }])
  .png()
  .toFile("public/icons/maskable-512.png");
console.log("Icons generated.");
