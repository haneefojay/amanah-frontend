import type { Metadata } from "next";
import { CampaignList } from "@/features/campaigns/campaign-list";
import { PublicShell } from "@/features/public/public-shell";
import { api } from "@/lib/api/client";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Verified Islamic organisations in Nigeria, each with a fixed target and a public record.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) || undefined;

/** Public campaign list (F2.1). Server-rendered; filters and page live in the URL. */
export default async function CampaignsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const city = first(params.city);
  const organisation = first(params.organisation);
  const page = Math.max(1, Number(first(params.page)) || 1);

  // Money data is never cached (spec §9): always ask the API.
  const result = await api
    .listCampaigns({ city, organisationId: organisation, page }, { cache: "no-store" })
    .catch(() => null);

  return (
    <PublicShell>
      <CampaignList result={result} city={city} organisation={organisation} />
    </PublicShell>
  );
}
