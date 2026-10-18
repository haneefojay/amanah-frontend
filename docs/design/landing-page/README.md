# Landing page design

- **Status:** Approved by the project owner on 2026-10-18. Phone hero refinement approved the same day (shorter intro; on phones the example campaign follows the hero).
- **Canvas (live, editable):** https://claude.ai/artifact/FCJs8QR2Pp9VkjWsyBR3Nt. It's private: the owner shares it from the canvas's Share menu.
- **Source snapshot:** [`landing-page.dc.html`](./landing-page.dc.html), the canvas markup at approval time. The canvas is the source of truth if the two differ.
- **Roadmap:** F2.6, the public landing page.

## Concept: "the open ledger"

The page shows a campaign's money trail as its main image, because proof is what makes Amanah different. One bold element only: the large Arabic word أمانة in gold at the foot of the hero. Everything else is restrained.

## Tokens used

| Role                                 | Value                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Ground (hero, organisations section) | `#0f5132` (brand-900)                                                                                                                      |
| Dark band (the cap, footer)          | `#161a20` (ink-900)                                                                                                                        |
| Paper                                | `#f7f4ec` (sand-100), `#fbf9f4` (sand-50)                                                                                                  |
| Accent (one, on dark grounds)        | `#e9c46a` (gold-500)                                                                                                                       |
| Success and progress                 | `#146c43` (brand-700), tint `#d5ecdd`                                                                                                      |
| Secondary text                       | `#4b5260` (ink-600)                                                                                                                        |
| Type                                 | Schibsted Grotesk 400–800 (text and display), Reem Kufi 700 (Arabic word). **Pending a fonts ADR** against the system-font rule in ADR-006 |

## Sections (top to bottom)

1. Header and nav (collapses to a menu button under about 760px).
2. Hero: "Give with certainty. Follow every naira.", a one-sentence intro and the two original buttons. On wide screens the example campaign ledger sits beside it (₦500,000 target, three items at different stages, spent and balance held). On phones the ledger comes right after the hero, on sand.
3. The أمانة signature and the meaning of the word, closing the hero at the bottom right (about 84px on phones).
4. Why: "Generosity runs on trust. Trust needs proof."
5. How it works: five steps, from verification to witness confirmation.
6. The cap: "Never a kobo beyond the target." with the over-remaining dialog (₦300,000 entered, ₦200,000 offered).
7. Accountability: phone preview of a campaign page (items, receipt, evidence with upload time and place, witness confirmation).
8. Who it's for: donors, organisations, witnesses, the Amanah team.
9. For organisations: call to action, plus a note that it installs on any phone.
10. Footer: production copy only.

## Implementation notes

- Copy is production copy. Never add internal, pilot or hackathon wording to public pages.
- The example campaign is static content until live campaigns exist (F2.1, F3). It stays labelled "Example campaign".
- Evidence shows the **upload (server) time** as the official time, labelled for donors as "Uploaded …". The phone's capture time only appears in the details and admin views (spec §7).
- `[CONTACT EMAIL]` is a placeholder until the team provides one.
