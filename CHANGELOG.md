# Changelog

All notable changes to Amanah are recorded here. This file is the project's running memory: every change by any agent or contributor gets an entry.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are in Africa/Lagos time. Reference roadmap IDs (`F0.3`, `B6.1`) and ADRs where relevant.

Sections per release: **Added**, **Changed**, **Fixed**, **Removed**, **Security**, **Decisions**, **Docs**.

## [Unreleased]

### Added

- **F2.1 Campaign list** (approved on the design canvas, saved in docs/design/campaign-pages): `/campaigns` is server-rendered and always loads fresh data. City and organisation filters and the page number live in the address, so they survive a reload. Six cards per page with Previous and Next, a loading skeleton, and empty, no-match and error states. The landing page's "Browse campaigns" and "Give now" and the footer now lead here, and header and footer section links on other pages go back to the landing page. Closed as Done (mocked), waiting on B5.1 and a Lighthouse run once deployed.
- **F2.2 Campaign card** (approved on the design canvas): the card now shows a status badge (Live, Target reached, Closed, Completed), the closed and completed lines ("Ended below target. Funds go to its stated purpose.", "All items delivered and confirmed"), a two-line title clamp and a truncated organisation name. Tests cover LIVE, FUNDED, CLOSED, COMPLETED and a long title. Closed as Done (mocked), waiting on B5.1.
- **Raising now** on the landing page (approved on the design canvas): up to three campaign cards from `GET /api/campaigns`, live first then funded, with cover photo, verified organisation, progress and the funding state (exact spec copy for the cap states). Renders nothing while loading, on error or with no campaigns, so the live site never shows placeholders. New `CampaignCard` and `fundingNote` in `src/features/campaigns` (groundwork for F2.1/F2.2). Mock campaigns now have Unsplash cover photos (credits in docs/design/landing-page/README.md).
- `/phase` command (`.claude/commands/phase.md`): `/phase F2` or `/phase F2.3` makes a new session read the project rules, roadmap entries, spec sections and ADRs, then present a plan and questions, and wait for approval before building, claiming and closing items per the workflow.
- **F1.2 Core UI components** on shadcn/ui (ADR-009): Button (pills, 44px, `gold` variant, `loading`), Input, Textarea, Select, Checkbox, Switch, Label, Field set, Card, Badge (status tones), Dialog, Sheet, Tabs, Skeleton, Separator, Alert, Spinner, Empty, and the Sonner Toaster (mounted in Providers). Added EmptyState and ErrorState. `components.json` is set up for the shadcn CLI. There's a development-only showcase at `/dev/ui`.
- **F1.3 Money and status components:** MoneyAmount (`<data value={kobo}>`), NairaInput with `useNairaInput` and `validateNairaText`, CampaignStatusBadge, ItemStatusBadge and VerifiedBadge. Wording and the exact spec sentences live in `src/lib/status.ts`.
- **F1.1:** `docs/design-system.md`, new semantic tokens mapped to the palette, danger tints, `src/lib/brand.ts`, and a test that fails on raw hex colours in components and pages.
- **F1.4 App shell:** DashboardShell for `/org`, `/witness` and `/admin`. It has a top bar and role-based navigation that is a sidebar on wide screens and a bottom bar on phones, and shows the current user from `/api/me` (mocked; set `MOCK_ROLE` to switch roles). Sections are prerendered and unknown sections are 404s. Placeholder pages say "Coming soon", and the staff areas are `noindex`.
- **F1.5 Boundaries:** a branded not-found page, a route error page (never shows error details) with retry, a global error page, and staff loading skeletons.
- **F1.6 Accessibility baseline:** `src/test/axe.ts` for component tests and `tests/e2e/helpers/a11y.ts` for pages. Radix test shims are in the Vitest setup.
- Dependencies: `radix-ui`, `class-variance-authority`, `lucide-react`, `sonner`. Dev dependencies: `tw-animate-css`, `axe-core`.

### Changed

- **API contract (draft), F2.1:** `GET /api/campaigns` takes `city`, `organisationId` and `page`, returns only public campaigns (live, funded, closed, completed), and responds with `data`, `meta` (`page`, `pageSize`, `total`, `totalPages`) and `filters` (`cities`, `organisations`). `CampaignSummary` gains `organisationId`. Backend to match in B5.1 (ADR-003). Mock data now has eight public campaigns and a draft that must never appear.
- **API contract (draft):** `CampaignSummary` gains `state`, and `coverImageUrl` also accepts a root-relative path. Backend to match when B5.1 is built (ADR-003).
- **F2.6 landing copy and footer:** removed the payment provider's name and technical terms from the public page ("Pay securely online", "a permanent record of every action", "Each amount is set aside while the donor pays", "Amanah enforces it"); unit and e2e guards now fail on such terms. On phones the footer wordmark is smaller and أمانة is no longer clipped.
- **F2.6 landing redesign** (approved on the design canvas): a lighter, modern page on white and soft off-white, with the mihrab arch and a thin gold eight-point star lattice as its Islamic motifs. New hero with a trust badge, three trust points and the arch window (أمانة at its crown, the example campaign card overlapping it); a statement section; accountability as a grid of cards; step cards with arch number tiles; the cap on a dark panel; audience cards; an inset organisations panel; and a footer with link columns and the large wordmark beside أمانة. Added colour tokens `brand-150/300/950`, `mist-50…300`, `ink-500/650` and the `brand` logo tone. Removed the old ledger and phone-preview components. Unit and e2e tests updated (phone, 980px and desktop layouts).
- **F2.6 landing, phone and narrow desktop** (approved on the design canvas): on phones the hero buttons share one line, أمانة is left out of the hero and the meaning sentence sits closer to the buttons (phones no longer download the Arabic display font). Between 768px and 1180px the section links stay on one line ("For organisations", and below 900px "The cap", are left out). From 900px to 1180px the example campaign stays beside the headline and the five steps share one row, so "desktop site" on a phone (about 980px) matches the desktop layout. Desktop above 1180px is unchanged. New e2e checks cover the phone buttons and the 980px layout.
- AmanahMark moved to `src/components/brand/`. Mock fixture organisations renamed to clearly fictional examples.

### Decisions

- ADR-009 UI components on shadcn/ui. It resolves the open "UI primitives" row of ADR-006.

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
