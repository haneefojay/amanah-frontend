# ADR-001: Frontend framework is Next.js App Router with TypeScript

- **Status:** Accepted
- **Date:** 2026-10-18
- **Deciders:** Project owner
- **Related:** spec §2 item 10, §8 (D5), §9; FRONTEND_ROADMAP F0.1; ADR-002, ADR-003

## Context

Amanah needs a responsive, mobile-first web app that works well on mid-range Android phones over slow connections, is installable as a PWA, and can be built by a small team before 1 November 2026. Spec open decision D5 left the stack to the team.

## Options considered

### Option A: Next.js (App Router) with TypeScript

- Pros: server rendering and streaming for fast first paint on slow networks; built-in manifest, metadata and image optimisation; file-based routing with layouts suits the four role areas; large ecosystem; easy hosting.
- Cons: framework changes quickly (version 16 introduced new conventions); server and client component boundaries need care.

### Option B: Vite with a React single-page app

- Pros: simple mental model; fast dev server; easy PWA plugins.
- Cons: client-only rendering gives a slower first load on low-end phones; SEO and share previews for campaign pages need extra work; routing, data loading and code splitting must be assembled by hand.

### Option C: Remix / React Router framework mode

- Pros: strong data-loading model and progressive enhancement.
- Cons: smaller ecosystem for PWA tooling; less team familiarity.

## Decision

Use **Next.js 16 with the App Router and TypeScript (strict mode)**. The Next.js app is the **frontend only**. Business logic and data live in a separate backend service (ADR-003).

## Rationale

Server-rendered public campaign pages load fast and preview well when shared on WhatsApp, which matters for donor reach. The App Router's nested layouts map directly to the public, organisation, witness and admin areas. The project owner chose this stack explicitly.

## Consequences

- Positive: fast public pages, one framework for all UI, first-class PWA metadata support.
- Negative or risks: Next.js 16 conventions differ from older documentation. Agents must read the bundled docs in `node_modules/next/dist/docs/` before using unfamiliar APIs (see `AGENTS.md`).
- Follow-up: F0.1 (done), F1.4 (layouts per role).
