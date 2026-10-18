import type { CampaignSummary } from "@/lib/api/schemas";

/** Demo-flavoured fixtures that match the spec §10 demo script. Amounts are kobo. */
export const campaigns: CampaignSummary[] = [
  {
    id: "7b3e2a8c-1f4d-4c1e-9a52-3d6f0b8e1a01",
    slug: "ramadan-food-drive-offa",
    title: "Ramadan food drive",
    organisationName: "Offa Central Mosque",
    city: "Offa",
    coverImageUrl: null,
    status: "LIVE",
    targetAmount: 50_000_000,
    raisedAmount: 30_000_000,
    availableAmount: 20_000_000,
  },
  {
    id: "7b3e2a8c-1f4d-4c1e-9a52-3d6f0b8e1a02",
    slug: "orphanage-school-supplies",
    title: "School supplies for 40 orphans",
    organisationName: "Al-Ihsan Orphanage",
    city: "Ilorin",
    coverImageUrl: null,
    status: "FUNDED",
    targetAmount: 12_000_000,
    raisedAmount: 12_000_000,
    availableAmount: 0,
  },
];
