import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { MoneyAmount } from "@/components/ui/money-amount";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { CampaignSummary } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";
import { accountabilityTotals } from "@/features/accountability/totals";
import { formatNaira } from "@/lib/money";
import { campaignStatusMessage, NEARLY_REACHED_MESSAGE } from "@/lib/status";
import { ShareButton } from "./campaign-share-button";

type Note = { text: string; tone: "live" | "done" | "nearly" | "ended" };

/** The one sentence under the numbers. Uses the exact spec wording for each state (§4.2, §5). */
export function panelNote(c: CampaignSummary): Note {
  if (c.status === "LIVE") {
    if (c.availableAmount > 0) return { text: campaignStatusMessage.LIVE, tone: "live" };
    return c.raisedAmount >= c.targetAmount
      ? { text: campaignStatusMessage.FUNDED, tone: "done" }
      : { text: NEARLY_REACHED_MESSAGE, tone: "nearly" };
  }
  if (c.status === "FUNDED") return { text: campaignStatusMessage.FUNDED, tone: "done" };
  if (c.status === "COMPLETED") return { text: campaignStatusMessage.COMPLETED, tone: "done" };
  return { text: campaignStatusMessage[c.status], tone: "ended" };
}

const noteBox: Record<Note["tone"], string> = {
  live: "text-brand-900",
  done: "rounded-2xl bg-brand-100 px-4 py-3.5 font-bold text-brand-900",
  nearly: "rounded-2xl bg-gold-100 px-4 py-3.5 font-semibold text-gold-800",
  ended: "rounded-2xl bg-mist-50 px-4 py-3.5 text-ink-700",
};

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-2xl bg-mist-50 px-4 py-3.5">
      <dt className="text-[13px] text-ink-600">{label}</dt>
      <dd className="text-xl font-bold">{children}</dd>
    </div>
  );
}

/**
 * Funding numbers, the state of the campaign and the actions. "Give to this campaign" is in place
 * but not wired: the donation flow is built in the checkout phase (F4.1), which attaches the action.
 */
export function FundingPanel({ campaign: c }: { campaign: CampaignSummary }) {
  const note = panelNote(c);
  const accepting = c.status === "LIVE" && c.availableAmount > 0;
  const { remaining, progress } = accountabilityTotals(c);
  return (
    <section
      aria-label="Funding"
      className="flex flex-col gap-5 rounded-[28px] border border-mist-200 bg-white p-7 shadow-[0_24px_48px_-36px_rgba(15,42,29,0.45)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-ink-600">Raised</span>
          <MoneyAmount
            kobo={c.raisedAmount}
            className="text-[40px] leading-none font-extrabold tracking-[-0.03em] text-brand-950 min-[480px]:text-[44px]"
          />
        </div>
        <span className="pb-1 text-[15px] text-ink-600">
          of a {formatNaira(c.targetAmount)} target
        </span>
      </div>
      <ProgressBar
        value={c.raisedAmount}
        max={c.targetAmount}
        label="Raised"
        showLabel={false}
        trackClassName="h-3 bg-brand-150"
      />
      {accepting && (
        <dl className="grid grid-cols-2 gap-3">
          <Stat label="Remaining">{formatNaira(remaining)}</Stat>
          <Stat label="Progress">{progress}%</Stat>
        </dl>
      )}
      <p
        className={cn(
          "flex items-center gap-2.5 text-[15px] leading-normal font-semibold",
          noteBox[note.tone],
        )}
      >
        {note.tone === "live" && (
          <span aria-hidden="true" className="size-2 flex-none rounded-full bg-brand-700" />
        )}
        {note.text}
      </p>
      {accepting ? (
        <>
          <div className="flex gap-2.5">
            <button
              type="button"
              data-action="give"
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-2.5 rounded-full bg-brand-900 px-5 text-[17px] font-extrabold text-white hover:bg-brand-700"
            >
              Give to this campaign
              <ArrowRightIcon aria-hidden="true" className="size-[18px]" />
            </button>
            <ShareButton title={c.title} variant="icon" />
          </div>
          <p className="-mt-1.5 text-center text-[13px] text-ink-500">
            Up to {formatNaira(c.availableAmount)} can be given. Your amount is held for you while
            you pay.
          </p>
        </>
      ) : (
        <ShareButton title={c.title} variant="full" />
      )}
    </section>
  );
}
