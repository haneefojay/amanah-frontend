import { CheckIcon, CircleAlertIcon } from "lucide-react";
import type { CampaignItem } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/date";

/** What to say about an item no witness has spoken for yet. */
export function pendingWitnessText(status: CampaignItem["status"]): string {
  return status === "DELIVERED" ? "Waiting for the witness" : "Not delivered yet";
}

/**
 * The witness's word on one item (F3.2, spec §7): confirmed, or disputed with their comment.
 * `layout="cell"` is for the items table, `layout="card"` for the stacked phone cards.
 */
export function WitnessConfirmation({
  item,
  layout,
}: {
  item: CampaignItem;
  layout: "cell" | "card";
}) {
  const c = item.confirmation;
  if (!c) {
    if (layout === "card" && item.status !== "DELIVERED") return null;
    return <span className="text-sm text-ink-600">{pendingWitnessText(item.status)}</span>;
  }

  const disputed = c.status === "DISPUTED";
  const Icon = disputed ? CircleAlertIcon : CheckIcon;
  const who = `${disputed ? "Disputed" : "Confirmed"} by ${c.witnessName}`;
  const when = formatDate(c.confirmedAt);

  if (layout === "card") {
    return (
      <div
        className={cn(
          "flex flex-col gap-1.5 rounded-xl px-3 py-2.5 text-sm leading-normal",
          disputed ? "bg-danger-100 text-danger-700" : "bg-brand-150 text-brand-900",
        )}
      >
        <p className="flex items-start gap-2">
          <Icon aria-hidden="true" className="mt-0.5 size-4 flex-none" strokeWidth={2.6} />
          <span>
            <strong>{who}</strong> on {when}
          </span>
        </p>
        {c.comment && <p className="text-ink-700">“{c.comment}”</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col text-sm leading-normal">
      <span
        className={cn(
          "flex items-start gap-2 font-semibold",
          disputed ? "text-danger-700" : "text-brand-900",
        )}
      >
        <Icon
          aria-hidden="true"
          className={cn("mt-0.5 size-4 flex-none", disputed ? "text-danger-600" : "text-brand-700")}
          strokeWidth={2.6}
        />
        {who}
      </span>
      <span className="pl-6 text-ink-600">{when}</span>
      {c.comment && (
        <blockquote className="mt-2.5 rounded-xl bg-danger-100 px-3 py-2.5 text-ink-700">
          “{c.comment}”
        </blockquote>
      )}
    </div>
  );
}
