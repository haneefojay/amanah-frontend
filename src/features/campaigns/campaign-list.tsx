import { SearchXIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { CampaignCard } from "@/features/campaigns/campaign-card";
import { CampaignFilters } from "@/features/campaigns/campaign-filters";
import { CampaignPagination } from "@/features/campaigns/campaign-pagination";
import { VerifiedIcon } from "@/features/landing/icons";
import { Container } from "@/features/landing/container";
import { EmptyState } from "@/components/ui/empty-state";
import type { CampaignListResponse } from "@/lib/api/schemas";

type Props = {
  /** The API response, or null when it could not be loaded. */
  result: CampaignListResponse | null;
  city?: string;
  organisation?: string;
};

function ListHeading() {
  return (
    <div>
      <Container className="flex flex-col items-start gap-3.5 pt-[clamp(40px,5vw,72px)] pb-7">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 py-2 pr-3.5 pl-2.5 text-sm font-semibold text-brand-900">
          <VerifiedIcon size={18} strokeWidth={2.4} className="text-brand-700" />
          Every organisation is verified
        </span>
        <h1
          id="list-h"
          className="text-[clamp(44px,5vw,72px)] leading-none font-extrabold tracking-[-0.045em] text-brand-950"
        >
          Campaigns
        </h1>
        <p className="max-w-[52ch] text-[19px] leading-[1.55] text-ink-600">
          Verified organisations, each with a fixed target and a public record. Choose a need, give,
          then follow every naira to delivery.
        </p>
      </Container>
    </div>
  );
}

/** The campaigns page body (F2.1): heading, filters, cards, pagination and its states. */
export function CampaignList({ result, city, organisation }: Props) {
  const filtered = Boolean(city || organisation);
  return (
    <>
      <ListHeading />
      {result === null ? (
        <Container className="pb-24">
          <div
            role="alert"
            className="flex flex-col items-center gap-4 rounded-3xl bg-mist-50 px-6 py-14 text-center"
          >
            <TriangleAlertIcon aria-hidden="true" className="size-8 text-gold-800" />
            <h2 className="text-xl font-bold">We couldn’t load campaigns</h2>
            <p className="max-w-[46ch] text-ink-600">
              Check your connection and try again. Amounts are always loaded fresh, so nothing you
              see is out of date.
            </p>
            <a
              href={
                filtered
                  ? `/campaigns?${new URLSearchParams({ ...(city ? { city } : {}), ...(organisation ? { organisation } : {}) })}`
                  : "/campaigns"
              }
              className="min-h-12 rounded-full bg-brand-900 px-6 py-3 font-bold text-white hover:bg-brand-700"
            >
              Try again
            </a>
          </div>
        </Container>
      ) : (
        <>
          <section aria-label="Filter campaigns">
            <Container>
              <CampaignFilters
                filters={result.filters}
                city={city}
                organisationId={organisation}
                total={result.meta.total}
              />
            </Container>
          </section>
          <section aria-label="Campaigns">
            <Container className="flex flex-col gap-10 pt-7 pb-[clamp(64px,8vw,112px)]">
              {result.data.length === 0 ? (
                <EmptyState
                  icon={<SearchXIcon aria-hidden="true" />}
                  title={filtered ? "No campaigns match these filters" : "No campaigns yet"}
                  description={
                    filtered
                      ? "Try another city or organisation."
                      : "When verified organisations publish campaigns, they appear here."
                  }
                  action={
                    filtered ? (
                      <Link
                        href="/campaigns"
                        className="min-h-12 rounded-full bg-brand-900 px-6 py-3 font-bold text-white hover:bg-brand-700"
                      >
                        Clear filters
                      </Link>
                    ) : (
                      <Link
                        href="/#how"
                        className="min-h-12 rounded-full border-[1.5px] border-brand-300 px-6 py-3 font-bold text-brand-900"
                      >
                        See how Amanah works
                      </Link>
                    )
                  }
                />
              ) : (
                <ul className="grid list-none grid-cols-1 gap-5 p-0 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3">
                  {result.data.map((campaign) => (
                    <li key={campaign.id} className="flex min-w-0">
                      <CampaignCard campaign={campaign} className="flex-1" headingLevel={2} />
                    </li>
                  ))}
                </ul>
              )}
              <CampaignPagination
                page={result.meta.page}
                totalPages={result.meta.totalPages}
                city={city}
                organisation={organisation}
              />
            </Container>
          </section>
        </>
      )}
    </>
  );
}
