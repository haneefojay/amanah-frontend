# UI components

Design-system primitives (F1.2, ADR-009). Most files come from the shadcn/ui new-york-v4 registry (MIT, © shadcn) and are adapted to Amanah's tokens and touch sizes. Amanah additions:

- `money-amount.tsx` and `naira-input.tsx`: money in integer kobo.
- `status-badges.tsx`: campaign, item and verified badges.
- `empty-state.tsx`, `error-state.tsx` and `progress-bar.tsx`.

Rules:

- Use tokens only, never raw hex values (a test enforces this).
- Keep 44px touch targets and 16px input text.
- Every component has tests (`*.test.tsx`), including an axe check where it makes sense.
- See every component on `/dev/ui` (development only).
