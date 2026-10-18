# ADR-007: Typography: self-hosted Schibsted Grotesk, plus Reem Kufi cut down to one word

- **Status:** Accepted
- **Date:** 2026-10-18
- **Deciders:** Project owner
- **Related:** ADR-006 (supersedes its "Fonts" row); FRONTEND_ROADMAP F1.1, F2.6, F13.3; `docs/design/landing-page/`

## Context

The approved landing page design uses **Schibsted Grotesk** for all text and **Reem Kufi** for the large Arabic word أمانة. ADR-006 had chosen the system font stack, so nothing would download on slow networks. The owner wants the live page to match the design exactly.

The owner also pointed out that most donors arrive through a shared campaign link, not the home page. Campaign pages will use the same type, so the cost of the font matters there too.

## Options considered

### Option A: Self-host Schibsted Grotesk and draw أمانة as a vector image

- Pros: smallest cost, with no Arabic font at all.
- Cons: a drawing of the glyphs can render edges slightly differently from live text, so an exact match can't be guaranteed. The word is no longer text (selection, translation tools).

### Option B: Self-host both fonts, with Reem Kufi cut down to only the letters of أمانة

- Pros: pixel-faithful to the design, and the word stays real text with `lang="ar"`. The Reem Kufi subset is only a few kilobytes, about the same as a vector.
- Cons: two font files. The Reem Kufi subset must be regenerated if more Arabic text is ever added.

### Option C: System fonts only

- Pros: zero font bytes.
- Cons: the page looks noticeably different from the approved design.

## Decision

Option B.

- **Schibsted Grotesk:** loaded with `next/font/google` (weights 400–800, `latin` subset, `display: swap`). Next.js downloads it at build time and serves it from our own domain, so the browser makes no request to Google. It's exposed as the `--font-sans` token in `globals.css`.
- **Reem Kufi (weight 700):** a WOFF2 subset containing only the glyphs and shaping features needed for أمانة, generated with `pyftsubset` and loaded with `next/font/local` as `--font-arabic-display`. The subset script and source font live in the repository so it can be regenerated.
- The system font stack stays as the fallback in both stacks.

## Rationale

The owner prioritised fidelity to the approved design. Option B delivers that exactly, at a cost close to option A, without a request to a third party.

## Consequences

- Positive: the live page matches the design. Fonts are self-hosted, which is good for privacy, offline use and the PWA precache.
- Negative or risks: about 30–40 KB of Latin font on first load, which the F13.3 performance budget must absorb. Using any other Arabic text needs a new Reem Kufi subset (or a full Arabic subset and a new ADR).
- Follow-up: F1.1 (tokens), F2.6 (landing page). ADR-006's "Fonts" row is marked as superseded by this ADR.
