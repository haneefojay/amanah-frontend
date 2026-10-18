# Amanah design system

The approved landing page (`docs/design/landing-page/`) sets the visual language. This page is the reference for building any other screen. Tokens live in `src/app/globals.css`, and components live in `src/components/ui/` (shadcn/ui, ADR-009). Run `npm run dev` and open **`/dev/ui`** to see every component.

## Colour tokens

| Token                                         | Hex                                           | Use                                                                        |
| --------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------- |
| `brand-900`                                   | `#0f5132`                                     | Primary: hero and organisation grounds, primary buttons, headings on sand  |
| `brand-700`                                   | `#146c43`                                     | Progress, success marks, focus ring                                        |
| `brand-100` / `brand-50`                      | `#d5ecdd` / `#eef7f1`                         | Success tints, active nav                                                  |
| `gold-500`                                    | `#e9c46a`                                     | The single accent: gold call to action, أمانة, highlights on dark grounds  |
| `gold-100` / `gold-700` / `gold-800`          | `#f8ecc9` / `#b07d00` / `#6b4e00`             | "Purchased" and warning tints and text                                     |
| `sand-50` to `sand-600`                       | `#fbf9f4` to `#c9c3b3`                        | Paper, cards, dividers, input borders                                      |
| `ink-900` / `ink-700` / `ink-600` / `ink-400` | `#161a20` / `#2d333d` / `#4b5260` / `#8a8f98` | Text, from strongest to decorative (`ink-400` is never used for body text) |
| `danger-600` / `danger-100` / `danger-700`    | `#b42318` / `#fee4e2` / `#912018`             | Errors, "Disputed", destructive actions                                    |

Semantic names for the components map onto these: `primary` = brand-900, `muted` = sand-200, `border` = sand-400, `input` = sand-500, `ring` = brand-700, `destructive` = danger-600.

**Rule:** no raw hex values in components or pages. `src/test/design-tokens.test.ts` fails the build if one appears. The only exceptions are `src/lib/brand.ts` (browser theme colour and manifest) and the PWA icon SVG.

## Typography (ADR-007)

- **Schibsted Grotesk** for everything (self-hosted, variable 400–900). The system font stack is the fallback.
- **Reem Kufi** is reserved for the word أمانة only, because the font file contains just those glyphs.
- Scale:
  - Display: `clamp(46px, 6.4vw, 88px)`, weight 800, tracking −0.035em.
  - Section headings: 32–64px, weight 800.
  - Card titles: 20–22px, weight 700.
  - Body: 16–19px, line height 1.5–1.6.
  - Captions: 13–14px.
- Minimum body size is 16px on phones. Inputs are always 16px, so iOS doesn't zoom in.

## Shape, spacing and elevation

- Radius:
  - buttons and badges: pills (`rounded-full`);
  - inputs: 14px (`rounded-xl`);
  - cards: 16–24px.
- Page container: 1200px maximum width, 20px side gutters on phones and 32px on wider screens.
- Section spacing: `clamp(72px, 10vw, 120px)` vertically.
- Shadows are soft and tinted toward green or ink, and used only on elevated cards.

## Components (`src/components/ui`)

| Component                                                            | Notes                                                                                                                                                                                                                     |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                                                             | Variants: `default` (green), `gold` (call to action on dark), `outline`, `secondary`, `ghost`, `destructive`, `link`. Sizes: `sm` 36px, `default` 44px, `lg` 48px, `icon` 44px. `loading` disables it and shows a spinner |
| `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Label`         | 44px controls with 16px text                                                                                                                                                                                              |
| `Field`, `FieldLabel`, `FieldDescription`, `FieldError`              | Form layout. Link hints and errors with `aria-describedby`                                                                                                                                                                |
| `NairaInput` with `useNairaInput` / `validateNairaText`              | Money entry: a text field with a decimal keyboard and a ₦ prefix, returning integer kobo, with empty, zero, malformed and over-maximum messages                                                                           |
| `MoneyAmount`                                                        | Kobo shown as naira inside `<data value={kobo}>`                                                                                                                                                                          |
| `CampaignStatusBadge`, `ItemStatusBadge`, `VerifiedBadge`            | Wording from `src/lib/status.ts`, which also holds the exact spec sentences                                                                                                                                               |
| `ProgressBar`                                                        | Accessible progress. `showLabel={false}` for compact cards                                                                                                                                                                |
| `Dialog`, `Sheet` (use `side="bottom"` on phones)                    | Focus is trapped, Escape closes, and focus returns to the trigger                                                                                                                                                         |
| `Tabs`, `Card`, `Badge`, `Skeleton`, `Separator`, `Alert`, `Spinner` | Standard                                                                                                                                                                                                                  |
| `EmptyState`, `ErrorState`                                           | Never leave a screen blank. Errors say what happened and offer a retry                                                                                                                                                    |
| `Toaster` / `toast()` (Sonner)                                       | Already mounted in `Providers`. Use for confirmations ("Expense logged")                                                                                                                                                  |

## Layouts

- **Public pages:** the landing header and footer (`src/features/landing`).
- **Staff areas** (`/org`, `/witness`, `/admin`): `DashboardShell` gives a top bar, plus navigation that is a sidebar on wide screens and a bottom bar on phones. Navigation per role lives in `src/components/shell/nav-config.ts`.
- **Boundaries:** `not-found.tsx`, `error.tsx`, `global-error.tsx` and the staff `loading.tsx`.

## Accessibility checklist

- Every interactive element is a real `<button>`, `<a>` or `<input>` with a visible label.
- Touch targets are at least 44px, and focus is visible (ring in `brand-700`).
- Text contrast is AA, checked by axe in Playwright (`tests/e2e/helpers/a11y.ts`). Component tests run axe too (`src/test/axe.ts`).
- Motion respects `prefers-reduced-motion` (global rule in `globals.css`).
