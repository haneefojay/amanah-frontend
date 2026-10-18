# CLAUDE.md

Project memory and standing instructions for Claude on **Amanah**. Read this first, then follow **[`AGENTS.md`](./AGENTS.md)** for the full working agreement (session start, workflow, rules, commands). Where the two disagree, this file wins for Claude.

## Purpose of this file

- A short, durable memory of **decisions, conventions and context** that Claude would otherwise have to rediscover.
- Keep it **concise and current**. Detailed history belongs in `CHANGELOG.md`, decisions in `docs/decisions/`, and status in `docs/roadmap/ROADMAP_INDEX.md`. When a fact here changes, update it in the same change.

## Project in one paragraph

Amanah is a transparent Islamic donation platform (general donations only, never zakat or waqf) built for the AMETTSA Inter-Varsity Innovation Challenge. **Deadline: 1 November 2026.** Verified organisations publish itemised campaigns with a fixed target. Donations are hard-capped at the target using database reservations. Spending is shown publicly with receipts, geotagged evidence and witness confirmations. Spec: `docs/amanah-mvp-spec.md`. Overview: `PROJECT.md`.

## Repository

- Frontend: **https://github.com/haneefojay/amanah-frontend** (default branch `main`).

## Current architecture (as of 2026-10-18)

- **This repository is the frontend:** Next.js 16.4 App Router, TypeScript 5.9 strict, Tailwind CSS v4, **PWA via Serwist** (`@serwist/turbopack`), TanStack Query, react-hook-form with Zod. See ADR-001, ADR-002 and ADR-006.
- **The backend is a separate service. Its stack is undecided** (ADR-004, Proposed). Don't build backend logic in Next.js route handlers or server actions. The owner explicitly rejected Next.js as the backend.
- Until the backend exists, build against the **MSW mock API** (`src/mocks/handlers.ts`, served by `npm run mock:api` on port 4000). Contract schemas are in `src/lib/api/schemas.ts` (ADR-003).
- `cacheComponents` is **off** because it's incompatible with Serwist (ADR-002).

## Conventions to remember

- Money: integer **kobo** everywhere. Format with `formatNaira()` and parse input with `parseNairaToKobo()`.
- Status copy must match the spec exactly, for example "Target reached. Donations closed." and "Target nearly reached. Pending payments are being processed."
- Use design tokens (`bg-brand-700`, `text-ink-600`, …) from `src/app/globals.css`, never raw hex values in components.
- Tests sit next to source files (`*.test.ts(x)`). E2E tests live in `tests/e2e/` and run against a production build on the `mobile-chrome` and `desktop-chrome` projects.
- Roadmap IDs: `F<phase>.<n>` (frontend) and `B<phase>.<n>` (backend). ADRs are `ADR-NNN`. Never renumber.
- British spelling in docs and UI ("organisation", "colour") to match the spec. Nigerian context: ₦, Africa/Lagos time zone, `en-NG` locale.

## Environment notes

- The owner develops on **Windows**. Keep scripts cross-platform (Node scripts, not bash). `.gitattributes` forces LF line endings.
- Node 22 or newer is required (`.nvmrc`). The package manager is npm.
- TypeScript is pinned to `~5.9` because typescript-eslint doesn't yet support newer versions.
- In a cloud or Linux sandbox, Playwright can use a preinstalled Chromium via `PW_CHROMIUM_PATH`.

## Standing instructions from the owner

- Before large setup or architectural work, **present suggestions and wait for the go-ahead**.
- Every feature has a **Definition of Done and tests**. Nothing is done without passing tests.
- Record every significant decision as an **ADR** with options, the decision and the date.
- Keep **`CHANGELOG.md`** updated on every change; it is the project's running memory.
- Keep **`docs/roadmap/ROADMAP_INDEX.md`** updated as the status source of truth.
- Skills for Claude live in **`.claude/skills/`**. The owner will specify which to install.

## Open items awaiting the owner

- ADR-004 backend stack; spec decisions D8, D9 and D11; the convention date; the pilot organisation.
- Whether to adopt shadcn/ui (F1.2) and the hosting provider (F0.6).
- First push to `haneefojay/amanah-frontend` so CI (F0.5) runs.
