"use client";

import { useQuery } from "@tanstack/react-query";
import { CampaignCard } from "@/features/campaigns/campaign-card";
import { api } from "@/lib/api/client";
import type { CampaignSummary } from "@/lib/api/schemas";
import { Container } from "./container";

const MAX_CARDS = 3;

/** Live campaigns first, then recently funded ones; drafts and closed campaigns never show. */
export function pickCampaigns(all: readonly CampaignSummary[]): CampaignSummary[] {
  const live = all.filter((c) => c.status === "LIVE");
  const funded = all.filter((c) => c.status === "FUNDED");
  return [...live, ...funded].slice(0, MAX_CARDS);
}

/**
 * "Raising now": campaigns from the API. The section renders nothing while loading, on any error
 * (for example before the backend is live) or when there is nothing to show, so the landing page
 * never displays placeholder campaigns as if they were real.
 */
export function RaisingNow() {
  const { data } = useQuery({
    queryKey: ["campaigns"],
    queryFn: api.listCampaigns,
    retry: false,
  });
  const shown = data ? pickCampaigns(data.data) : [];
  if (shown.length === 0) return null;

  return (
    <section aria-labelledby="now-title" className="bg-white">
      <Container className="flex flex-col gap-8 pb-[clamp(72px,9vw,120px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="flex flex-col gap-2">
            <h2
              id="now-title"
              className="text-[clamp(30px,3.4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-brand-950"
            >
              Raising now
            </h2>
            <p className="text-[17px] leading-normal text-ink-600">
              Verified organisations, each with a fixed target and a public record.
            </p>
          </div>
          <a
            href="/campaigns"
            className="rounded-full border-[1.5px] border-brand-300 px-5 py-3 text-base font-bold text-brand-900 hover:border-brand-700"
          >
            See all campaigns
          </a>
        </div>
        <ul
          aria-label="Campaigns raising now"
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 min-[600px]:mx-0 min-[600px]:flex-wrap min-[600px]:overflow-visible min-[600px]:px-0"
        >
          {shown.map((c) => (
            <li key={c.id} className="flex flex-[0_0_82%] snap-start min-[600px]:flex-[1_1_300px]">
              <CampaignCard campaign={c} className="w-full" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
