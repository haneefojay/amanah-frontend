import Image from "next/image";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { CampaignSummary } from "@/lib/api/schemas";
import type { CampaignStatus } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";
import { formatNaira } from "@/lib/money";
import { campaignStatusLabel } from "@/lib/status";
import { CheckIcon, LockIcon, VerifiedIcon } from "@/features/landing/icons";
import { fundingNote } from "./funding-note";

const noteTone = {
  neutral: "text-ink-600",
  nearly: "font-semibold text-gold-800",
  closed: "font-semibold text-brand-900",
  done: "font-semibold text-brand-900",
} as const;

const badgeTone: Record<CampaignStatus, string> = {
  DRAFT: "bg-mist-100 text-ink-700",
  PENDING_REVIEW: "bg-mist-100 text-ink-700",
  REJECTED: "bg-mist-100 text-ink-700",
  LIVE: "bg-brand-100 text-brand-900",
  FUNDED: "bg-brand-900 text-white",
  CLOSED: "bg-mist-200 text-ink-700",
  COMPLETED: "bg-gold-400 text-brand-950",
};

/** Arch outline shown when a campaign has no cover photo yet. */
function CoverFallback() {
  return (
    <div aria-hidden="true" className="flex h-full items-end justify-center bg-brand-150">
      <svg width="150" height="168" viewBox="0 0 150 168" className="-mb-7 text-brand-300">
        <path
          d="M10 168V75a65 65 0 0 1 130 0v93"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M38 168V82a37 37 0 0 1 74 0v86"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

/** A campaign as a card: cover, title, verified organisation, progress and one clear action. */
export function CampaignCard({
  campaign: c,
  className,
}: {
  campaign: CampaignSummary;
  className?: string;
}) {
  const note = fundingNote(c);
  const href = `/campaigns/${c.slug}`;
  const isLive = c.status === "LIVE" && note.tone !== "closed";
  return (
    <article
      aria-labelledby={`campaign-${c.id}`}
      className={cn(
        "relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-mist-200 bg-white",
        className,
      )}
    >
      <div className="relative h-[188px] bg-mist-100">
        {c.coverImageUrl ? (
          <Image
            src={c.coverImageUrl}
            alt=""
            fill
            sizes="(min-width: 900px) 400px, 82vw"
            className="object-cover"
            unoptimized={!c.coverImageUrl.startsWith("/")}
          />
        ) : (
          <CoverFallback />
        )}
        <span className="absolute top-3.5 left-3.5 rounded-full bg-white/90 px-[11px] py-[5px] text-[13px] font-semibold text-ink-900">
          {c.city}, {c.state}
        </span>
        <span
          className={cn(
            "absolute top-3.5 right-3.5 rounded-full px-[11px] py-[5px] text-xs font-bold",
            badgeTone[c.status],
          )}
        >
          {campaignStatusLabel[c.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3.5 px-[22px] pt-5 pb-[22px]">
        <div className="flex flex-col gap-1.5">
          <h3
            id={`campaign-${c.id}`}
            className="line-clamp-2 text-[19px] leading-tight font-bold tracking-[-0.01em]"
          >
            {c.title}
          </h3>
          <span className="flex items-center gap-1.5 text-sm text-ink-600">
            <VerifiedIcon size={15} strokeWidth={2.4} className="flex-none text-brand-700" />
            <span className="min-w-0 truncate">
              {c.organisationName}
              <span className="sr-only"> (verified)</span>
            </span>
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <ProgressBar
            value={c.raisedAmount}
            max={c.targetAmount}
            label={`Raised for ${c.title}`}
            showLabel={false}
            trackClassName="h-2 bg-brand-150"
          />
          <p className="text-[17px] font-extrabold">
            {formatNaira(c.raisedAmount)}{" "}
            <span className="text-sm font-medium text-ink-500">
              raised of {formatNaira(c.targetAmount)}
            </span>
          </p>
          <p className={cn("flex items-center gap-1.5 text-sm", noteTone[note.tone])}>
            {note.tone === "closed" && <LockIcon size={14} strokeWidth={2.4} />}
            {note.tone === "done" && <CheckIcon size={14} strokeWidth={2.8} />}
            {note.text}
          </p>
        </div>
        <a
          href={href}
          className={cn(
            "rounded-full px-[18px] py-[13px] text-center text-[15px] font-bold",
            isLive
              ? "bg-brand-900 text-white hover:bg-brand-700"
              : "bg-mist-100 text-brand-900 hover:bg-mist-200",
          )}
        >
          {isLive ? "Give to this campaign" : "See where the money went"}
          <span className="sr-only">: {c.title}</span>
        </a>
      </div>
    </article>
  );
}
