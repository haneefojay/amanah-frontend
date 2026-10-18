# ADR-009: UI components on shadcn/ui

- **Status:** Accepted
- **Date:** 2026-10-18
- **Deciders:** Project owner
- **Related:** FRONTEND_ROADMAP F1.2 and F1.3; ADR-006 (supersedes its "UI primitives: undecided" row); `docs/design-system.md`

## Context

F1.2 needs accessible building blocks (buttons, inputs, selects, dialogs, bottom sheets, toasts, tabs) for the dashboards, checkout and witness flows. Focus trapping, keyboard support and screen-reader behaviour in dialogs and selects are easy to get wrong and expensive to build by hand before 1 November 2026.

## Options considered

### Option A: shadcn/ui (Radix primitives, copied into the repository)

- Pros: proven accessible behaviour (Radix); the source lives in our repository, so we restyle it freely with our tokens and nothing is locked in; matches our stack (Tailwind v4, React 19).
- Cons: adds runtime dependencies (`radix-ui`, `class-variance-authority`, `lucide-react`, `sonner`, `tw-animate-css`); copied code is ours to maintain.

### Option B: Radix primitives only, everything else hand-built

- Pros: fewer dependencies.
- Cons: slower; we would rebuild what shadcn already provides.

### Option C: fully hand-built

- Pros: smallest bundle.
- Cons: the highest accessibility risk, and the slowest to build.

## Decision

Option A. Components live in `src/components/ui/`, taken from the shadcn/ui **new-york-v4** registry. The source came from the official GitHub repository (MIT) because the registry website is blocked from the build sandbox. `components.json` is set up, so `npx shadcn@latest add <component>` works on a normal machine.

Amanah adaptations:

- Semantic tokens (`primary`, `muted`, `border`, `ring`…) are mapped onto the Amanah palette in `globals.css`.
- Buttons are pills, 44px by default (touch targets), with a `gold` variant and a `loading` state (`aria-busy`, which also prevents double submits).
- Inputs, selects and textareas are 44px tall with 16px text, so iOS doesn't zoom in on focus.
- Badges add `success`, `warning`, `neutral` and `danger` tones.
- The Sonner toaster is light-only, at the top centre, with no `next-themes`.

## Consequences

- Positive: accessible primitives from day one, a consistent look, and fast feature work in F4 to F11.
- Negative or risks: about 30–40 KB of JavaScript more on pages that use the overlays, to be watched under the F13.3 budget. Upstream fixes must be pulled in by hand.
- Follow-up: use these components in all new UI. Add more (`dropdown-menu`, `table`, `drawer`) from the registry when needed, with the same adaptations.
