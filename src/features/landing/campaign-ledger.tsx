import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import { formatNaira } from "@/lib/money";
import {
  exampleBalanceHeld,
  exampleCampaign,
  exampleSpent,
  type ExampleItem,
} from "./example-campaign";
import { CheckIcon, LockIcon, VerifiedIcon } from "./icons";

function TrailMarker({ item, last }: { item: ExampleItem; last: boolean }) {
  return (
    <div className="flex w-[22px] flex-none flex-col items-center" aria-hidden="true">
      {item.status === "DELIVERED" && (
        <span className="flex size-[22px] items-center justify-center rounded-full bg-brand-700 text-white">
          <CheckIcon size={12} strokeWidth={3.5} />
        </span>
      )}
      {item.status === "PURCHASED" && (
        <span className="size-[22px] rounded-full border-[2.5px] border-gold-700 bg-sand-50" />
      )}
      {item.status === "NEEDED" && (
        <span className="size-[22px] rounded-full border-[2.5px] border-dashed border-ink-400 bg-sand-50" />
      )}
      {!last && (
        <span
          className={cn(
            "min-h-[18px] w-0.5 flex-1",
            item.status === "DELIVERED" ? "bg-brand-700" : "bg-sand-500",
          )}
        />
      )}
    </div>
  );
}

type CampaignLedgerProps = {
  /** Unique id for the card's heading (the card renders in two places, one per layout). */
  headingId: string;
  /** "hero" sits on the green ground; "paper" sits on sand with a border and a softer shadow. */
  variant?: "hero" | "paper";
  className?: string;
};

/** The example campaign: funding state and the item-by-item money trail. */
export function CampaignLedger({ headingId, variant = "hero", className }: CampaignLedgerProps) {
  const c = exampleCampaign;
  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "w-full min-w-0 flex-col gap-[22px] rounded-3xl bg-sand-50 p-6 text-ink-900 sm:p-7",
        variant === "hero"
          ? "max-w-[480px] flex-[1_1_400px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
          : "border border-sand-400 shadow-[0_18px_40px_-22px_rgba(15,81,50,0.45)]",
        className ?? "flex",
      )}
    >
      <header className="flex flex-col gap-1.5">
        <span className="self-start rounded-full bg-sand-300 px-2.5 py-1 text-[13px] font-semibold text-ink-600">
          Example campaign
        </span>
        <h2 id={headingId} className="text-[22px] font-bold tracking-[-0.01em]">
          {c.title}
        </h2>
        <span className="flex items-center gap-1.5 text-[15px] text-ink-600">
          <VerifiedIcon size={16} strokeWidth={2.4} className="text-brand-700" />
          {c.organisation}
        </span>
      </header>

      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-[34px] font-extrabold tracking-[-0.02em]">
            {formatNaira(c.raisedAmount)}
          </span>
          <span className="text-[15px] text-ink-600">of {formatNaira(c.targetAmount)} target</span>
        </div>
        <ProgressBar value={c.raisedAmount} max={c.targetAmount} label="Raised" showLabel={false} />
        <p className="flex items-center gap-2 text-[15px] font-semibold text-brand-900">
          <LockIcon size={16} strokeWidth={2.2} />
          Target reached. Donations closed.
        </p>
      </div>

      <ol aria-label="Items and their status" className="flex flex-col">
        {c.items.map((item, i) => {
          const last = i === c.items.length - 1;
          return (
            <li key={item.name} className="flex gap-3.5">
              <TrailMarker item={item} last={last} />
              <div className={cn("flex min-w-0 flex-1 flex-col gap-1", !last && "pb-4")}>
                <div className="flex justify-between gap-2 font-semibold">
                  <span>{item.name}</span>
                  <span className="whitespace-nowrap">{formatNaira(item.total)}</span>
                </div>
                <span className="text-sm text-ink-600">{item.note}</span>
              </div>
            </li>
          );
        })}
      </ol>

      <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-sand-200 px-[18px] py-4">
        <div className="flex flex-col gap-0.5">
          <dt className="text-sm text-ink-600">Spent</dt>
          <dd className="text-xl font-bold">{formatNaira(exampleSpent)}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-sm text-ink-600">Balance held</dt>
          <dd className="text-xl font-bold">{formatNaira(exampleBalanceHeld)}</dd>
        </div>
      </dl>
    </article>
  );
}
