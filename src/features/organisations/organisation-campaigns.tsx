"use client";

import { useState } from "react";
import { CampaignCard } from "@/features/campaigns/campaign-card";
import type { CampaignSummary } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";

type Filter = "all" | "now" | "past";

/** Campaigns that still take donations. Funded, closed and completed ones are "past". */
export const isRaisingNow = (c: CampaignSummary) => c.status === "LIVE";

const emptyText: Record<Filter, string> = {
  all: "This organisation has no public campaigns yet.",
  now: "No campaigns are raising money right now.",
  past: "No past campaigns yet.",
};

/** Every public campaign as a card, with a segmented switch: all, raising now, past. */
export function OrganisationCampaigns({ campaigns }: { campaigns: CampaignSummary[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const options: { id: Filter; label: string; list: CampaignSummary[] }[] = [
    { id: "all", label: "All", list: campaigns },
    { id: "now", label: "Raising now", list: campaigns.filter(isRaisingNow) },
    { id: "past", label: "Past", list: campaigns.filter((c) => !isRaisingNow(c)) },
  ];
  const shown = options.find((o) => o.id === filter)!.list;

  return (
    <section aria-labelledby="o-camps" className="mt-6 flex flex-col gap-6 min-[640px]:mt-10">
      <div className="flex flex-col gap-3.5 min-[640px]:flex-row min-[640px]:flex-wrap min-[640px]:items-end min-[640px]:justify-between min-[640px]:gap-x-8">
        <h2
          id="o-camps"
          className="text-[26px] leading-[1.05] font-extrabold tracking-[-0.035em] text-brand-950 min-[640px]:text-[clamp(30px,3.4vw,44px)]"
        >
          Campaigns
        </h2>
        <div
          role="group"
          aria-label="Show"
          className="flex gap-1 rounded-full bg-mist-50 p-1 text-sm font-semibold min-[640px]:gap-1.5 min-[640px]:p-[5px] min-[640px]:text-[15px]"
        >
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={filter === o.id}
              onClick={() => setFilter(o.id)}
              className={cn(
                "min-h-11 flex-1 rounded-full px-[18px] whitespace-nowrap min-[640px]:min-h-10 min-[640px]:flex-none",
                filter === o.id
                  ? "bg-white text-brand-950 shadow-[0_1px_2px_rgba(15,42,29,0.12)]"
                  : "text-ink-600 hover:text-brand-900",
              )}
            >
              {o.label} {o.list.length}
            </button>
          ))}
        </div>
      </div>
      {shown.length === 0 ? (
        <p className="rounded-3xl bg-mist-50 px-6 py-10 text-center text-ink-600">
          {emptyText[filter]}
        </p>
      ) : (
        <ul className="m-0 grid list-none grid-cols-1 gap-3.5 p-0 min-[640px]:grid-cols-2 min-[640px]:gap-[18px] min-[980px]:grid-cols-3 min-[1180px]:grid-cols-4">
          {shown.map((campaign) => (
            <li key={campaign.id} className="flex min-w-0">
              <CampaignCard
                campaign={campaign}
                className="flex-1"
                showOrganisation={false}
                compact
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
