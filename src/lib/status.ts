import type { CampaignStatus } from "@/lib/api/schemas";

/**
 * Human wording for campaign and item states. Badge labels are short; `campaignStatusMessage`
 * holds the full sentences, which must match the spec exactly (§4.2, §5).
 */

export const campaignStatusLabel: Record<CampaignStatus, string> = {
  DRAFT: "Draft",
  PENDING_REVIEW: "In review",
  REJECTED: "Rejected",
  LIVE: "Live",
  FUNDED: "Target reached",
  CLOSED: "Closed",
  COMPLETED: "Completed",
};

export const campaignStatusMessage: Record<CampaignStatus, string> = {
  DRAFT: "This campaign is a draft and is not public yet.",
  PENDING_REVIEW: "This campaign is waiting for review by the Amanah team.",
  REJECTED: "This campaign was not approved. See the reason and edit it to resubmit.",
  LIVE: "Accepting donations up to its target.",
  FUNDED: "Target reached. Donations closed.",
  CLOSED: "This campaign has ended. Funds raised are still used for its stated purpose.",
  COMPLETED: "All items delivered and confirmed. The final report is available.",
};

/** Shown when nothing is left to give but pending payments may still complete (spec §4.2). */
export const NEARLY_REACHED_MESSAGE =
  "Target nearly reached. Pending payments are being processed.";

export type ItemDisplayStatus = "NEEDED" | "PURCHASED" | "DELIVERED" | "DISPUTED";

export const itemStatusLabel: Record<ItemDisplayStatus, string> = {
  NEEDED: "Needed",
  PURCHASED: "Purchased",
  DELIVERED: "Delivered",
  DISPUTED: "Disputed",
};
