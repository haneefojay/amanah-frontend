# Changelog

All notable changes to Amanah are recorded here. This file is the project's running memory: every change by any agent or contributor gets an entry.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are in Africa/Lagos time. Reference roadmap IDs (`F0.3`, `B6.1`) and ADRs where relevant.

Sections per release: **Added**, **Changed**, **Fixed**, **Removed**, **Security**, **Decisions**, **Docs**.

## [Unreleased]

### Added

- Public landing page at `/` (F2.6), built from the approved design:
  - sections: site header with a phone menu, hero with the example campaign ledger, the أمانة signature, why, how it works, the cap (with the over-remaining illustration), accountability (with a phone preview), audience, organisations call to action, and the footer;
  - all amounts come from integer kobo example data (`src/features/landing/example-campaign.ts`);
  - a skip link, labelled landmarks, and text alternatives for the illustrations.
- Self-hosted fonts per ADR-007: Schibsted Grotesk (variable, Latin) and Reem Kufi (subset to أمانة, 2 KB), with `scripts/subset-arabic-font.py` and the OFL licences in `assets/fonts/`.
- `NEXT_PUBLIC_CONTACT_EMAIL` (optional): powers "Talk to the team" and the organisation registration email. Those buttons are hidden or fall back to the section anchor when it is unset.
- Tests: example-data invariants, landing page component tests, mobile menu tests, `ProgressBar` hidden-label case, and e2e tests (`tests/e2e/landing.spec.ts`) covering no sideways scroll at 360px and 1440px, fonts loaded, axe, wording guard and navigation on desktop and mobile. 45 unit and component tests and 18 e2e tests pass.
- `npm run screenshots`: full-page landing screenshots for documents (written to `screenshots/`, gitignored).
- Dev dependencies: `@axe-core/playwright`, `cross-env`.

### Changed

- Landing page refinement (approved on the canvas 2026-10-18): hero intro shortened to one sentence and the line under the buttons removed, on all screen sizes. On phones the hero now ends with a smaller أمانة at the bottom right, and the example campaign follows the hero on the sand background under "What you see on every campaign".
- Design tokens extended (`brand-200`, `gold-100/700/800`, `sand-200` to `sand-600`, `ink-700`). Smooth scrolling for in-page links.
- `ProgressBar` accepts `showLabel`, `trackClassName` and `barClassName`.
- Replaced the temporary F0 home page with the landing page. Updated the PWA e2e test accordingly.

### Decisions

- ADR-007 Typography: self-hosted Schibsted Grotesk, plus Reem Kufi cut down to أمانة. Supersedes the fonts row of ADR-006.
- ADR-008 Frontend hosting on Vercel.

### Docs

- Landing page design approved; source and canvas link saved in `docs/design/landing-page/`. Added roadmap item F2.6 and raised F0.6 (hosting) to P0.

### Added

- Project skill `.claude/skills/amanah` (project rules, domain rules, frontend conventions, workflow, design-skill routing).
- Anthropic's official `frontend-design` skill, with its role added to the Amanah design-skills guide.
- Third-party skills via the `skills` CLI, pinned in `skills-lock.json`: impeccable, ui-ux-pro-max, design-taste-frontend, agent-browser and 13 Emil Kowalski skills (excluding native-only `write-swift` and `animate-expo`).

### Changed

- Prettier and ESLint ignore third-party skill folders; `.taste-skill/` working files are gitignored.
- Commit convention: no AI attribution trailers in commits or PRs; existing commits re-authored as Ojutalayo Haneef Abiola (`CLAUDE.md`, `AGENTS.md`).
- Set the git remote `origin` to https://github.com/haneefojay/amanah-frontend and recorded it in `CLAUDE.md` and `PROJECT.md` (F0.5).

## [0.1.0] - 2026-10-18

Initial development environment and project documentation.

### Added

- Next.js 16.4 App Router frontend with TypeScript 5.9 (strict, `noUncheckedIndexedAccess`) and Tailwind CSS v4 (F0.1).
- PWA baseline (F0.3):
  - web app manifest with 192px, 512px and maskable icons, plus an Apple touch icon;
  - Serwist service worker (`src/app/sw.ts`) with an `/~offline` fallback;
  - `/api/*` network-only so money data is never cached;
  - offline banner via `next/offline`;
  - security headers including a camera and geolocation permissions policy.
- API layer (F0.4): `apiFetch` with Zod response validation and `ApiError`; draft contract schemas; MSW handlers and fixtures; standalone mock API (`npm run mock:api`); TanStack Query provider.
- Money utilities in integer kobo: `formatNaira`, `parseNairaToKobo`, `progressPercent` and `assertKobo`, with tests.
- `ProgressBar` component (accessible) and a temporary home page.
- Test harness (F0.2): Vitest 5, React Testing Library, MSW 3, Playwright 1.64 (Pixel 7 and Desktop Chrome projects against a production build). 25 unit and component tests and 6 e2e tests, all passing.
- Out-of-scope terminology guard (`npm run check:terms`) with tests.
- ESLint rules banning `parseFloat` for money. Prettier with the Tailwind plugin. EditorConfig. `.gitattributes` (LF). `.nvmrc` (Node 22). `.env.example`. VS Code recommended settings.
- GitHub Actions CI workflow (F0.5; activates when pushed to GitHub).

### Decisions

- ADR-001 Frontend framework: Next.js App Router with TypeScript (Accepted).
- ADR-002 PWA strategy: Serwist; money data network-only; `cacheComponents` turned off (Accepted).
- ADR-003 Separate backend service; contract-first, mock-backed frontend (Accepted).
- ADR-004 Backend stack (Proposed, awaiting the team).
- ADR-005 Frontend testing strategy (Accepted).
- ADR-006 Frontend supporting libraries (Accepted).

### Docs

- Moved the MVP specification to `docs/amanah-mvp-spec.md`.
- Added `docs/roadmap/FRONTEND_ROADMAP.md` (F0 to F13), `BACKEND_ROADMAP.md` (B0 to B12) and `ROADMAP_INDEX.md` (status board, milestones, agent workflow).
- Added `PROJECT.md`, `AGENTS.md`, `CLAUDE.md`, `README.md`, `docs/decisions/` (index and template) and `.claude/skills/README.md`.
