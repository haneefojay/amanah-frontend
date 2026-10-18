import type {
  CampaignListResponse,
  CampaignStatus,
  CampaignSummary,
  CurrentUser,
  UserRole,
} from "@/lib/api/schemas";

export const organisationIds = {
  mosque: "8f2a1c3d-4b5e-4f60-8a7b-9c0d1e2f3a41",
  orphanage: "8f2a1c3d-4b5e-4f60-8a7b-9c0d1e2f3a42",
  society: "8f2a1c3d-4b5e-4f60-8a7b-9c0d1e2f3a43",
} as const;

const id = (n: number) => `7b3e2a8c-1f4d-4c1e-9a52-3d6f0b8e1a${String(n).padStart(2, "0")}`;

/** Demo-flavoured fixtures that match the spec §10 demo script. Amounts are kobo. */
export const campaigns: CampaignSummary[] = [
  {
    id: id(1),
    slug: "ramadan-food-drive-offa",
    title: "Ramadan food drive",
    organisationId: organisationIds.mosque,
    organisationName: "Central Mosque, Offa",
    city: "Offa",
    state: "Kwara",
    coverImageUrl: "/images/campaigns/food-drive.jpg",
    status: "LIVE",
    targetAmount: 50_000_000,
    raisedAmount: 30_000_000,
    availableAmount: 20_000_000,
  },
  {
    id: id(2),
    slug: "school-supplies-40-orphans",
    title: "School supplies for 40 orphans",
    organisationId: organisationIds.orphanage,
    organisationName: "Darul Aytam Orphan Home",
    city: "Ilorin",
    state: "Kwara",
    coverImageUrl: "/images/campaigns/school-supplies.jpg",
    status: "LIVE",
    targetAmount: 120_000_000,
    raisedAmount: 112_000_000,
    availableAmount: 8_000_000,
  },
  {
    id: id(3),
    slug: "borehole-islamiyya-school",
    title: "Borehole for the Islamiyya school",
    organisationId: organisationIds.society,
    organisationName: "An-Nur Islamic Society",
    city: "Ogbomoso",
    state: "Oyo",
    coverImageUrl: "/images/campaigns/borehole.jpg",
    status: "FUNDED",
    targetAmount: 85_000_000,
    raisedAmount: 85_000_000,
    availableAmount: 0,
  },
  {
    id: id(4),
    slug: "eid-clothes-30-children",
    title: "Eid clothes for 30 children",
    organisationId: organisationIds.mosque,
    organisationName: "Central Mosque, Offa",
    city: "Offa",
    state: "Kwara",
    coverImageUrl: null,
    status: "LIVE",
    targetAmount: 40_000_000,
    raisedAmount: 38_000_000,
    availableAmount: 0,
  },
  {
    id: id(5),
    slug: "quran-learning-materials",
    title: "Qur’an learning materials for the evening class",
    organisationId: organisationIds.orphanage,
    organisationName: "Darul Aytam Orphan Home",
    city: "Ilorin",
    state: "Kwara",
    coverImageUrl: null,
    status: "LIVE",
    targetAmount: 30_000_000,
    raisedAmount: 6_000_000,
    availableAmount: 24_000_000,
  },
  {
    id: id(6),
    slug: "mosque-roof-repair-oke-ode",
    title: "Repairing the storm-damaged roof of the Oke-Ode community mosque and its Qur’an school",
    organisationId: organisationIds.society,
    organisationName: "An-Nur Islamic Society",
    city: "Ogbomoso",
    state: "Oyo",
    coverImageUrl: null,
    status: "CLOSED",
    targetAmount: 90_000_000,
    raisedAmount: 61_000_000,
    availableAmount: 0,
  },
  {
    id: id(7),
    slug: "clinic-medicines-ilorin",
    title: "Medicines for the community clinic",
    organisationId: organisationIds.orphanage,
    organisationName: "Darul Aytam Orphan Home",
    city: "Ilorin",
    state: "Kwara",
    coverImageUrl: null,
    status: "COMPLETED",
    targetAmount: 25_000_000,
    raisedAmount: 25_000_000,
    availableAmount: 0,
  },
  {
    id: id(8),
    slug: "winter-blankets-offa",
    title: "Blankets for the harmattan season",
    organisationId: organisationIds.mosque,
    organisationName: "Central Mosque, Offa",
    city: "Offa",
    state: "Kwara",
    coverImageUrl: null,
    status: "COMPLETED",
    targetAmount: 18_000_000,
    raisedAmount: 18_000_000,
    availableAmount: 0,
  },
  // Not public: must never appear in the public list.
  {
    id: id(9),
    slug: "draft-campaign",
    title: "A draft nobody should see",
    organisationId: organisationIds.mosque,
    organisationName: "Central Mosque, Offa",
    city: "Offa",
    state: "Kwara",
    coverImageUrl: null,
    status: "DRAFT",
    targetAmount: 10_000_000,
    raisedAmount: 0,
    availableAmount: 10_000_000,
  },
];

export const PUBLIC_STATUSES: CampaignStatus[] = ["LIVE", "FUNDED", "CLOSED", "COMPLETED"];
const statusRank: Record<string, number> = { LIVE: 0, FUNDED: 1, CLOSED: 2, COMPLETED: 3 };

export const publicCampaigns = campaigns
  .filter((c) => PUBLIC_STATUSES.includes(c.status))
  .sort((a, b) => statusRank[a.status]! - statusRank[b.status]!);

export const PAGE_SIZE = 6;

/** What GET /api/campaigns returns for a list of campaigns (tests build custom lists with it). */
export function campaignListBody(
  data: CampaignSummary[],
  over: Partial<CampaignListResponse["meta"]> = {},
): CampaignListResponse {
  return {
    data,
    meta: {
      page: 1,
      pageSize: PAGE_SIZE,
      total: data.length,
      totalPages: Math.max(1, Math.ceil(data.length / PAGE_SIZE)),
      ...over,
    },
    filters: {
      cities: [...new Set(publicCampaigns.map((c) => c.city))].sort(),
      organisations: [
        ...new Map(publicCampaigns.map((c) => [c.organisationId, c.organisationName])),
      ]
        .map(([orgId, name]) => ({ id: orgId, name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    },
  };
}

/** One demo user per staff role (spec §3). The mock API serves the role in MOCK_ROLE. */
export const usersByRole: Record<UserRole, CurrentUser> = {
  ORG_ADMIN: {
    id: "5d1c6b0e-6a40-4f8e-9e3a-2b7f1c9d0a11",
    name: "Aisha Bello",
    email: "aisha@example.org",
    role: "ORG_ADMIN",
    organisations: [{ id: "8f2a1c3d-4b5e-4f60-8a7b-9c0d1e2f3a41", name: "Central Mosque, Offa" }],
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
