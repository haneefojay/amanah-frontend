import { BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CampaignStatus } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";
import { campaignStatusLabel, itemStatusLabel, type ItemDisplayStatus } from "@/lib/status";

type BadgeTone = "success" | "warning" | "neutral" | "danger" | "default";

const campaignTone: Record<CampaignStatus, BadgeTone> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warning",
  REJECTED: "danger",
  LIVE: "success",
  FUNDED: "default",
  CLOSED: "neutral",
  COMPLETED: "success",
};

export function CampaignStatusBadge({
  status,
  className,
}: {
  status: CampaignStatus;
  className?: string;
}) {
  return (
    <Badge variant={campaignTone[status]} data-status={status} className={className}>
      {campaignStatusLabel[status]}
    </Badge>
  );
}

const itemTone: Record<ItemDisplayStatus, BadgeTone> = {
  NEEDED: "neutral",
  PURCHASED: "warning",
  DELIVERED: "success",
  DISPUTED: "danger",
};

export function ItemStatusBadge({
  status,
  className,
}: {
  status: ItemDisplayStatus;
  className?: string;
}) {
  return (
    <Badge variant={itemTone[status]} data-status={status} className={className}>
      {itemStatusLabel[status]}
    </Badge>
  );
}

/** Marks an organisation the Amanah team has verified. */
export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-brand-700",
        className,
      )}
    >
      <BadgeCheckIcon className="size-4" aria-hidden="true" />
      Verified
    </span>
  );
}
