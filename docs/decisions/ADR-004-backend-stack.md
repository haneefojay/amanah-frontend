# ADR-004: Backend technology stack

- **Status:** Proposed. **Awaiting a team decision.**
- **Date:** 2026-10-18 (proposed)
- **Deciders:** Project owner and team
- **Related:** spec §4.2, §8 (D5), §9; BACKEND_ROADMAP B0; ADR-003

## Context

The backend must be a separate, scalable service (ADR-003). Hard requirements from the spec that any stack must meet:

- **PostgreSQL** with row-level locking (`SELECT … FOR UPDATE`) inside transactions, for the donation cap (§4.2);
- integer money handling (kobo) end to end;
- verified, idempotent payment webhooks (Paystack);
- object storage for receipts, evidence and documents;
- a scheduled or background job for reservation expiry;
- an OpenAPI contract for the frontend (B0.3);
- buildable and deployable by the team before 1 November 2026.

## Options considered

To be completed with the team. Starting candidates:

### Option A: Node.js (NestJS or Fastify) with TypeScript, Prisma or Drizzle, PostgreSQL

- Pros: same language as the frontend, so types and validation can be shared; mature Paystack examples; NestJS gives structure (modules, guards, OpenAPI generation).
- Cons: NestJS has a learning curve. ORM row-lock support needs raw SQL in places.

### Option B: Python (Django REST Framework or FastAPI), PostgreSQL

- Pros: Django gives an admin, auth and migrations out of the box; `select_for_update()` is first-class; FastAPI auto-generates OpenAPI.
- Cons: a second language for the team; type sharing with the frontend only via generated OpenAPI types.

### Option C: Go (chi or Echo, sqlc), PostgreSQL

- Pros: performance and simple deployment; explicit SQL makes locking clear.
- Cons: slowest to build features with under deadline pressure.

### Option D: Laravel (PHP), PostgreSQL

- Pros: batteries included (auth, queues, storage, scheduler); popular in Nigeria.
- Cons: a second language; less type sharing.

Hosting candidates (decide alongside): Render, Railway, Fly.io, or a VPS, with managed PostgreSQL (Supabase, Neon or the host's own) and storage (Supabase Storage, Cloudflare R2 or S3).

## Decision

_Pending._

## Rationale

_Pending._

## Consequences

- Until this is accepted, all `B` items are blocked (see ROADMAP_INDEX §5). Frontend work proceeds against mocks (ADR-003).
