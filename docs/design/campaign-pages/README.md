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
- **Organisation profile (revised 2026-10-18 after review):** follows the board closely: the identity panel on off-white with a photo of the organisation, the arch tile (mosque outline in gold, not the Amanah logo), the "Verified by Amanah" pill, location, and address and joining date at the foot; the track record on a dark green panel with gold segments, one per ended campaign; "What verified means" in an outlined panel the same height; then the Campaigns heading with a segmented All / Raising now / Past switch and compact cards (no organisation name, four in a row on wide screens). It also has verified badge, location, address, when they joined, a track record (completed of ended campaigns, campaigns, total raised), what verified means, and a full-width Campaigns section of cards with an All / Raising now / Past switch. **Type and registration number are not shown**, by the owner's decision.

## Data the design needs (mock contract now, backend later)

Listed so the backend roadmap items match: B5.1 (list: `organisationId`, `filters`, `meta`), B5.2 (campaign detail: description, purpose, items summary, organisation), B3.4 (organisation: `verifiedAt`, `address`, `raisedAmount`, campaign, ended and completed counts, its campaigns). Only verified organisations are returned publicly.

## Photos (mock data)

Free photos from Unsplash (Unsplash License), chosen as local African scenes to match the landing page's covers. They live in `public/images/campaigns/` (784×470) and `public/images/organisations/` (1200×720), cropped and compressed. They stand in until organisations upload their own. No identifiable child is presented as a beneficiary of a named campaign.

| File                                    | Used for                            | Source                                  |
| --------------------------------------- | ----------------------------------- | --------------------------------------- |
| `campaigns/eid-clothes.jpg`             | Eid clothes for 30 children         | https://unsplash.com/photos/1SAFRlUY0lk |
| `campaigns/quran-class.jpg`             | Qur’an learning materials           | https://unsplash.com/photos/2HgHr60mWVo |
| `campaigns/roof-repair.jpg`             | Mosque roof repair                  | https://unsplash.com/photos/d4j5hns6sj8 |
| `campaigns/clinic-medicines.jpg`        | Medicines for the community clinic  | https://unsplash.com/photos/1mf4pz2uIVc |
| `campaigns/blankets.jpg`                | Blankets for the harmattan season   | https://unsplash.com/photos/0K_ZvuPzexI |
| `campaigns/prayer-mats.jpg`             | Prayer mats for the women’s section | https://unsplash.com/photos/lp_cSfXfywM |
| `organisations/central-mosque-offa.jpg` | Central Mosque, Offa                | https://unsplash.com/photos/fwxe6SsU9-c |
| `organisations/darul-aytam-ilorin.jpg`  | Darul Aytam Orphan Home             | https://unsplash.com/photos/hkUwyE58XSo |
| `organisations/an-nur-ogbomoso.jpg`     | An-Nur Islamic Society              | https://unsplash.com/photos/aLolZhRI1Fw |
