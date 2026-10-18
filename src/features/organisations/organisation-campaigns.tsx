"use client";

import { useState } from "react";
import { CampaignCard } from "@/features/campaigns/campaign-card";
import type { CampaignSummary } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";

type Filter = "all" | "now" | "past";

/** Campaigns that still take donations. Funded, closed and completed ones are "past". */
export const isRaisingNow = (c: CampaignSummary) => c.status === "LIVE";

/** The organisation's campaigns as cards, with a switch between all, raising now and past. */
export function OrganisationCampaigns({ campaigns }: { campaigns: CampaignSummary[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const now = campaigns.filter(isRaisingNow);
  const past = campaigns.filter((c) => !isRaisingNow(c));
  const options: { id: Filter; label: string; list: CampaignSummary[] }[] = [
    { id: "all", label: "All", list: campaigns },
    { id: "now", label: "Raising now", list: now },
    { id: "past", label: "Past", list: past },
  ];
  const shown = options.find((o) => o.id === filter)!.list;

  return (
    <section aria-labelledby="o-camps" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <h2
          id="o-camps"
          className="text-[28px] leading-[1.1] font-extrabold tracking-[-0.03em] text-brand-950"
        >
          Campaigns
        </h2>
        <div role="group" aria-label="Show" className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={filter === o.id}
              onClick={() => setFilter(o.id)}
              className={cn(
                "min-h-11 rounded-full border-[1.5px] px-4 text-[15px] font-bold",
                filter === o.id
                  ? "border-brand-900 bg-brand-900 text-white"
                  : "border-brand-300 bg-white text-brand-900 hover:border-brand-700",
              )}
            >
              {o.label} <span className="font-semibold opacity-80">{o.list.length}</span>
            </button>
          ))}
        </div>
      </div>
      {shown.length === 0 ? (
        <p className="rounded-3xl bg-mist-50 px-6 py-10 text-center text-ink-600">
          {filter === "now"
            ? "No campaigns are raising money right now."
            : "No past campaigns yet."}
        </p>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-5 p-0 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3 min-[1180px]:grid-cols-4">
          {shown.map((campaign) => (
            <li key={campaign.id} className="flex min-w-0">
              <CampaignCard campaign={campaign} className="flex-1" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
