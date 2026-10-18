import type { CampaignSummary } from "@/lib/api/schemas";
import { formatNaira } from "@/lib/money";

export type FundingNote = { text: string; tone: "neutral" | "nearly" | "closed" };

/** Share of the target at which a live campaign is described as "nearly there". */
const NEARLY_THERE = 0.9;

/**
 * The one-line funding state shown on a campaign card. Uses the exact spec sentences for the
 * cap states (spec §4): a funded campaign is closed; a live one whose remaining amount is fully
 * reserved by pending payments says so.
 */
export function fundingNote(
  c: Pick<CampaignSummary, "status" | "targetAmount" | "raisedAmount" | "availableAmount">,
): FundingNote {
  if (c.status !== "LIVE") return { text: "Target reached. Donations closed.", tone: "closed" };
  const toGo = Math.max(0, c.targetAmount - c.raisedAmount);
  if (toGo === 0) return { text: "Target reached. Donations closed.", tone: "closed" };
  if (c.availableAmount === 0) {
    return {
      text: "Target nearly reached. Pending payments are being processed.",
      tone: "nearly",
    };
  }
  if (c.raisedAmount >= c.targetAmount * NEARLY_THERE) {
    return { text: `Nearly there: ${formatNaira(toGo)} to go`, tone: "nearly" };
  }
  return { text: `${formatNaira(toGo)} to go`, tone: "neutral" };
}
