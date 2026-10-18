import localFont from "next/font/local";

/**
 * Self-hosted fonts (ADR-007). Files live in src/app/fonts and are served from our own domain;
 * the browser never contacts a third-party font service.
 */

/** Schibsted Grotesk variable (Latin subset, weight 400–900). Product typeface. */
export const schibstedGrotesk = localFont({
  src: "./fonts/schibsted-grotesk-latin-wght-normal.woff2",
  variable: "--font-schibsted",
  weight: "400 900",
  style: "normal",
  display: "swap",
});

/**
 * Reem Kufi Bold, subset to ONLY the glyphs of the word أمانة (about 2 KB).
 * Any other Arabic text needs a regenerated subset: see scripts/subset-arabic-font.py.
 */
export const reemKufiAmanah = localFont({
  src: "./fonts/reem-kufi-amanah-700.woff2",
  variable: "--font-reem-kufi",
  weight: "700",
  style: "normal",
  display: "swap",
});
