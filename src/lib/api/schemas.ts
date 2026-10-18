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
  organisationName: z.string().min(1),
  city: z.string().min(1),
  coverImageUrl: z.url().nullable(),
  status: campaignStatus,
  targetAmount: kobo,
  raisedAmount: kobo,
  /** target − raised − active reservations (spec §4.2). */
  availableAmount: kobo,
});
export type CampaignSummary = z.infer<typeof campaignSummary>;

export const campaignListResponse = z.object({ data: z.array(campaignSummary) });
export type CampaignListResponse = z.infer<typeof campaignListResponse>;

export const apiErrorBody = z.object({
  error: z.object({ code: z.string(), message: z.string() }),
});
