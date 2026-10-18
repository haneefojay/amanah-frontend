import { z } from "zod";

/**
 * Draft API contract, mirrored from spec §6 and §8. These schemas are the frontend's source of
 * truth until the backend publishes an OpenAPI contract (BACKEND_ROADMAP B0.3); then they are
 * generated from it. Every response is validated at runtime so contract drift fails loudly.
 */

export const kobo = z.number().int().nonnegative();

export const campaignStatus = z.enum([
  "DRAFT",
  "PENDING_REVIEW",
  "REJECTED",
  "LIVE",
  "FUNDED",
  "CLOSED",
  "COMPLETED",
]);
export type CampaignStatus = z.infer<typeof campaignStatus>;

/** Absolute URL (backend storage) or a root-relative path served by the frontend. */
export const imageUrl = z.union([z.url(), z.string().regex(/^\/[^/]/)]);

export const campaignSummary = z.object({
  id: z.uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  organisationId: z.uuid(),
  organisationName: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  coverImageUrl: imageUrl.nullable(),
  status: campaignStatus,
  targetAmount: kobo,
  raisedAmount: kobo,
  /** target − raised − active reservations (spec §4.2). */
  availableAmount: kobo,
});
export type CampaignSummary = z.infer<typeof campaignSummary>;

/** Page of public campaigns plus the values the filters can offer (GET /api/campaigns, B5.1). */
export const campaignListResponse = z.object({
  data: z.array(campaignSummary),
  meta: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().min(1),
  }),
  filters: z.object({
    cities: z.array(z.string().min(1)),
    organisations: z.array(z.object({ id: z.uuid(), name: z.string().min(1) })),
  }),
});
export type CampaignListResponse = z.infer<typeof campaignListResponse>;

/** The organisation behind a campaign, as shown on the campaign page (B5.2, B3.4). */
export const organisationSummary = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  /** When the Amanah team verified the organisation. Only verified organisations are public. */
  verifiedAt: z.iso.datetime(),
  /** Public campaigns (live, funded, closed or completed). */
  campaignCount: z.number().int().nonnegative(),
  /** Closed or completed campaigns. */
  endedCount: z.number().int().nonnegative(),
  completedCount: z.number().int().nonnegative(),
});
export type OrganisationSummary = z.infer<typeof organisationSummary>;

export const itemDisplayStatus = z.enum(["NEEDED", "PURCHASED", "DELIVERED", "DISPUTED"]);

/**
 * The independent witness's word on one item (spec §7, B9.2). Witnesses are named publicly.
 * A dispute always carries the witness's comment.
 */
export const witnessConfirmation = z
  .object({
    status: z.enum(["CONFIRMED", "DISPUTED"]),
    witnessName: z.string().min(1),
    confirmedAt: z.iso.datetime(),
    comment: z.string().min(1).nullable(),
  })
  .refine((c) => c.status === "CONFIRMED" || c.comment !== null, {
    message: "A dispute needs the witness's comment",
    path: ["comment"],
  });
export type WitnessConfirmation = z.infer<typeof witnessConfirmation>;

/**
 * One thing the campaign buys. Items add up to the campaign target (spec §4.1). A disputed item
 * is never shown as delivered: its status and its confirmation must agree.
 */
export const campaignItem = z
  .object({
    id: z.uuid(),
    name: z.string().min(1),
    quantity: z.number().int().positive(),
    unitCost: kobo,
    totalCost: kobo,
    status: itemDisplayStatus,
    confirmation: witnessConfirmation.nullable(),
  })
  .refine((item) => (item.status === "DISPUTED") === (item.confirmation?.status === "DISPUTED"), {
    message: "Disputed items and disputed confirmations must agree",
    path: ["status"],
  });
export type CampaignItem = z.infer<typeof campaignItem>;

/** A photo of a receipt (Evidence of type RECEIPT, spec §6). The server upload time is authoritative. */
export const receipt = z.object({
  id: z.uuid(),
  imageUrl,
  /** A small version for lists, sized for slow connections. */
  thumbnailUrl: imageUrl,
  uploadedAtServer: z.iso.datetime(),
});
export type Receipt = z.infer<typeof receipt>;

/** Money the organisation spent from the campaign (spec §6 Expense, B8.3). */
export const expense = z.object({
  id: z.uuid(),
  description: z.string().min(1),
  vendorName: z.string().min(1),
  amount: kobo,
  spentAt: z.iso.datetime(),
  /** The item it paid for, or null for a general cost such as transport. */
  itemId: z.uuid().nullable(),
  receipt: receipt.nullable(),
});
export type Expense = z.infer<typeof expense>;

/**
 * A photo taken in the app as evidence (spec §6 Evidence of type PHOTO, §7, B8.2). The server
 * upload time is authoritative; the phone's capture time and location are what the phone said.
 */
export const evidencePhoto = z
  .object({
    id: z.uuid(),
    imageUrl,
    /** A small version for the gallery, sized for slow connections. */
    thumbnailUrl: imageUrl,
    itemId: z.uuid().nullable(),
    expenseId: z.uuid().nullable(),
    latitude: z.number().min(-90).max(90).nullable(),
    longitude: z.number().min(-180).max(180).nullable(),
    capturedAtClient: z.iso.datetime().nullable(),
    uploadedAtServer: z.iso.datetime(),
  })
  .refine((e) => (e.latitude === null) === (e.longitude === null), {
    message: "Latitude and longitude come together",
    path: ["longitude"],
  });
export type EvidencePhoto = z.infer<typeof evidencePhoto>;

/** A short post from the organisation shown in the campaign timeline (spec §6, B9.3). */
export const campaignUpdate = z.object({
  id: z.uuid(),
  body: z.string().min(1),
  images: z.array(imageUrl),
  postedAt: z.iso.datetime(),
});
export type CampaignUpdate = z.infer<typeof campaignUpdate>;

/**
 * A public campaign with its story, items and accountability data (GET /api/campaigns/:slug,
 * B5.2). Spent is never sent: it is the sum of the expenses, which can't exceed the amount raised.
 */
export const campaignDetail = campaignSummary
  .extend({
    purpose: z.string().min(1),
    /** Paragraphs of plain text. */
    description: z.array(z.string().min(1)).min(1),
    publishedAt: z.iso.datetime(),
    endsAt: z.iso.datetime().nullable(),
    items: z.array(campaignItem),
    organisation: organisationSummary,
    /** Newest first. */
    expenses: z.array(expense),
    /** Newest first, by upload time. */
    evidence: z.array(evidencePhoto),
    /** Newest first. */
    updates: z.array(campaignUpdate),
  })
  .refine((c) => c.expenses.reduce((sum, e) => sum + e.amount, 0) <= c.raisedAmount, {
    message: "Expenses can't exceed the amount raised",
    path: ["expenses"],
  });
export type CampaignDetail = z.infer<typeof campaignDetail>;
export const campaignDetailResponse = z.object({ data: campaignDetail });

/**
 * A verified organisation's public profile with its public campaigns (GET /api/organisations/:id,
 * B3.4). Unverified organisations answer 404. Type and registration number are never public.
 */
export const organisationProfile = organisationSummary.extend({
  address: z.string().min(1),
  /** A photo of the organisation's building or work. Same rules as campaign covers. */
  coverImageUrl: imageUrl.nullable(),
  /** Total raised across its public campaigns. */
  raisedAmount: kobo,
  campaigns: z.array(campaignSummary),
});
export type OrganisationProfile = z.infer<typeof organisationProfile>;
export const organisationProfileResponse = z.object({ data: organisationProfile });

export const apiErrorBody = z.object({
  error: z.object({ code: z.string(), message: z.string() }),
});

export const userRole = z.enum(["ORG_ADMIN", "WITNESS", "PLATFORM_ADMIN"]);
export type UserRole = z.infer<typeof userRole>;

/** The signed-in staff member (GET /api/me, BACKEND_ROADMAP B2.3). Donors are guests. */
export const currentUser = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  email: z.email(),
  role: userRole,
  organisations: z.array(z.object({ id: z.uuid(), name: z.string().min(1) })),
});
export type CurrentUser = z.infer<typeof currentUser>;

export const currentUserResponse = z.object({ data: currentUser });
