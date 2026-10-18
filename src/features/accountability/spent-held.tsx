import type { ReactNode } from "react";
import type { CampaignDetail } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";
import { formatNaira } from "@/lib/money";
import { accountabilityTotals } from "./totals";

function Figure({
  label,
  percent,
  amount,
  note,
  tone,
}: {
  label: string;
  percent: number;
  amount: number;
  note: ReactNode;
  tone: "spent" | "held";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-2xl p-3.5 min-[640px]:gap-1.5 min-[640px]:rounded-[18px] min-[640px]:px-5 min-[640px]:py-[18px]",
        tone === "spent" ? "bg-brand-150" : "bg-gold-100",
      )}
    >
      <dt
        className={cn(
          "flex items-center gap-2 text-[13px] font-semibold min-[640px]:text-sm",
          tone === "spent" ? "text-brand-900" : "text-gold-800",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-2.5 rounded-[3px]",
            tone === "spent" ? "bg-brand-700" : "bg-gold-500",
          )}
        />
        {label} · {percent}%
      </dt>
      <dd className="text-[22px] font-extrabold tracking-[-0.02em] text-brand-950 min-[640px]:text-[30px] min-[640px]:tracking-[-0.03em]">
        {formatNaira(amount)}
      </dd>
      <dd className="hidden text-sm text-ink-600 min-[640px]:block">{note}</dd>
    </div>
  );
}

/**
 * Spent versus balance held (F3.5, spec §6): what was raised, split into what the organisation
 * has spent (the sum of the published expenses) and what it still holds.
 */
export function SpentHeld({ campaign: c }: { campaign: CampaignDetail }) {
  const t = accountabilityTotals(c);
  const ongoing = c.status === "LIVE";
  const n = c.expenses.length;

  let body: ReactNode;
  if (t.raised === 0) {
    body = (
      <p className="text-[15px] leading-normal text-ink-700">
        Nothing has been raised yet, so nothing has been spent.
      </p>
    );
  } else if (t.spent === 0 || t.held === 0) {
    const allSpent = t.held === 0;
    body = (
      <>
        <div
          role="img"
          aria-label={
            allSpent
              ? `All ${formatNaira(t.raised)} spent; nothing held`
              : `Nothing spent yet; ${formatNaira(t.raised)} held`
          }
          className={cn(
            "h-3.5 rounded-full min-[640px]:h-[18px]",
            allSpent ? "bg-brand-700" : "bg-gold-500",
          )}
        />
        <p className="text-[15px] leading-normal text-ink-700">
          {allSpent ? (
            <>
              Everything raised has been spent: <strong>{formatNaira(t.spent)}</strong> on the
              expenses below.
            </>
          ) : (
            <>
              Nothing spent yet. All <strong>{formatNaira(t.held)}</strong> is held by the
              organisation until the first purchase.
            </>
          )}
        </p>
      </>
    );
  } else {
    body = (
      <>
        <div
          role="img"
          aria-label={`${formatNaira(t.spent)} spent and ${formatNaira(t.held)} held, of ${formatNaira(t.raised)} raised`}
          className="flex h-3.5 gap-[3px] overflow-hidden rounded-full bg-brand-150 min-[640px]:h-[18px]"
        >
          <div className="bg-brand-700" style={{ width: `${Math.max(1, t.spentPercent)}%` }} />
          <div className="flex-1 bg-gold-500" />
        </div>
        <dl className="m-0 grid grid-cols-2 gap-2.5 min-[640px]:gap-4">
          <Figure
            label="Spent"
            percent={t.spentPercent}
            amount={t.spent}
            tone="spent"
            note={n === 1 ? "On the expense listed below" : `On the ${n} expenses listed below`}
          />
          <Figure
            label="Held"
            percent={t.heldPercent}
            amount={t.held}
            tone="held"
            note="Kept by the organisation for the items still needed"
          />
        </dl>
        <p className="text-sm leading-normal text-ink-600 min-[640px]:hidden">
          Held money stays with the organisation for the items still needed.
        </p>
      </>
    );
  }

  return (
    <section
      aria-labelledby="acc-split"
      className="flex flex-col gap-[18px] rounded-3xl border border-mist-200 bg-white p-[22px] shadow-[0_24px_48px_-36px_rgba(15,42,29,0.45)] min-[640px]:gap-6 min-[640px]:rounded-[28px] min-[640px]:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <h3
          id="acc-split"
          className="text-[19px] font-extrabold text-brand-950 min-[640px]:text-[22px] min-[640px]:tracking-[-0.02em]"
        >
          Spent and held
        </h3>
        <span className="text-sm text-ink-600 min-[640px]:text-[15px]">
          Of <strong className="text-ink-900">{formatNaira(t.raised)}</strong> raised
          {ongoing ? " so far" : ""}
        </span>
      </div>
      {body}
    </section>
  );
}
