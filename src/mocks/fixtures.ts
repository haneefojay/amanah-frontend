import type { CampaignSummary, CurrentUser, UserRole } from "@/lib/api/schemas";

/** Demo-flavoured fixtures that match the spec §10 demo script. Amounts are kobo. */
export const campaigns: CampaignSummary[] = [
  {
    id: "7b3e2a8c-1f4d-4c1e-9a52-3d6f0b8e1a01",
    slug: "ramadan-food-drive-offa",
    title: "Ramadan food drive",
    organisationName: "Example Mosque, Offa",
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
    organisationName: "Example Orphanage, Ilorin",
    city: "Ilorin",
    coverImageUrl: null,
    status: "FUNDED",
    targetAmount: 12_000_000,
    raisedAmount: 12_000_000,
    availableAmount: 0,
  },
];

/** One demo user per staff role (spec §3). The mock API serves the role in MOCK_ROLE. */
export const usersByRole: Record<UserRole, CurrentUser> = {
  ORG_ADMIN: {
    id: "5d1c6b0e-6a40-4f8e-9e3a-2b7f1c9d0a11",
    name: "Aisha Bello",
    email: "aisha@example.org",
    role: "ORG_ADMIN",
    organisations: [{ id: "8f2a1c3d-4b5e-4f60-8a7b-9c0d1e2f3a41", name: "Example Mosque, Offa" }],
  },
  WITNESS: {
    id: "5d1c6b0e-6a40-4f8e-9e3a-2b7f1c9d0a12",
    name: "Ustadh Ibrahim Yusuf",
    email: "ibrahim@example.org",
    role: "WITNESS",
    organisations: [],
  },
  PLATFORM_ADMIN: {
    id: "5d1c6b0e-6a40-4f8e-9e3a-2b7f1c9d0a13",
    name: "Amanah Admin",
    email: "admin@example.org",
    role: "PLATFORM_ADMIN",
    organisations: [],
  },
};
