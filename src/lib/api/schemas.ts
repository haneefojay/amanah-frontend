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

export const campaignSummary = z.object({
  id: z.uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  organisationId: z.uuid(),
  organisationName: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  /** Absolute URL (backend storage) or a root-relative path served by the frontend. */
  coverImageUrl: z.union([z.url(), z.string().regex(/^\/[^/]/)]).nullable(),
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

/** One thing the campaign buys. Items add up to the campaign target (spec §4.1). */
export const campaignItem = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  unitCost: kobo,
  totalCost: kobo,
  status: itemDisplayStatus,
});
export type CampaignItem = z.infer<typeof campaignItem>;

/** A public campaign with its story and items (GET /api/campaigns/:slug, B5.2). */
export const campaignDetail = campaignSummary.extend({
  purpose: z.string().min(1),
  /** Paragraphs of plain text. */
  description: z.array(z.string().min(1)).min(1),
  publishedAt: z.iso.datetime(),
  endsAt: z.iso.datetime().nullable(),
  items: z.array(campaignItem),
  organisation: organisationSummary,
});
export type CampaignDetail = z.infer<typeof campaignDetail>;
export const campaignDetailResponse = z.object({ data: campaignDetail });

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
