# Campaign pages design (campaign list, campaign page, organisation profile)

- **Status:** Approved by the project owner on 2026-10-18.
- **Canvas (live, editable):** https://claude.ai/artifact/DKPCUba4XAh1UQ95qVfaQR. It's private: the owner shares it from the canvas's Share menu. The canvas is the source of truth if the snapshots differ.
- **Snapshots:** the `.dc.html` files in this folder, one per board.
- **Roadmap:** F2.1 campaign list, F2.2 campaign card, F2.3 campaign page shell, F2.4 organisation profile.

The three pages use the landing page's header, footer and tokens (see `../landing-page`). Section links in the header and footer go back to the landing page (`/#how`), "Give now" and "Browse campaigns" go to `/campaigns`.

## Boards

| Snapshot                              | What it shows                                                                 |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| `campaigns-list.dc.html`              | `/campaigns` on desktop: heading, filters, three-column card grid, pagination |
| `campaigns-list-mobile.dc.html`       | the same on a phone, with a filter applied                                    |
| `campaign-page.dc.html`               | `/campaigns/[slug]` on desktop                                                |
| `campaign-page-mobile.dc.html`        | the same on a phone                                                           |
| `organisation-profile.dc.html`        | `/organisations/[id]` on desktop                                              |
| `organisation-profile-mobile.dc.html` | the same on a phone                                                           |
| `states.dc.html`                      | card states, loading, empty, error, not found, share fallback, long title     |

## Decisions made during review

- **Campaign card:** cover (or an arch outline), city and state chip, status badge (Live, Target reached, Closed, Completed), title clamped to two lines, verified organisation, progress, one funding line and one action. Live campaigns say "Give to this campaign"; every other status says "See where the money went".
- **Funding lines** use the exact spec copy: "Target nearly reached. Pending payments are being processed.", "Target reached. Donations closed.", plus "Ended below target. Funds go to its stated purpose." (closed) and "All items delivered and confirmed" (completed).
- **List:** filters by city and organisation live in the URL; six cards per page; "Page 1 of 2" with Previous and Next. Filtered-empty, empty and error states are written out in `states.dc.html`.
- **Campaign page:** two rows on desktop so neither side is empty. It has a "Give to this campaign" button next to Share, separate from the header's generic "Give now". The button is **visual only until the checkout phase (F4)**, where its action is built.
- **Organisation profile:** verified badge, location, address, when they joined, a track record (completed of ended campaigns, campaigns, total raised), what verified means, and a full-width Campaigns section of cards with an All / Raising now / Past switch. **Type and registration number are not shown**, by the owner's decision.

## Data the design needs (mock contract now, backend later)

Listed so the backend roadmap items match: B5.1 (list: `organisationId`, `filters`, `meta`), B5.2 (campaign detail: description, purpose, items summary, organisation), B3.4 (organisation: `verifiedAt`, `address`, `raisedAmount`, campaign, ended and completed counts, its campaigns). Only verified organisations are returned publicly.
