# Changelog

All notable changes to Amanah are recorded here. This file is the project's running memory: every change by any agent or contributor gets an entry.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are in Africa/Lagos time. Reference roadmap IDs (`F0.3`, `B6.1`) and ADRs where relevant.

Sections per release: **Added**, **Changed**, **Fixed**, **Removed**, **Security**, **Decisions**, **Docs**.

## [Unreleased]

### Changed

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
