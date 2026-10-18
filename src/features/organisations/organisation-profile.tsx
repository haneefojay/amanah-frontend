import { CheckIcon, ChevronLeftIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { VerifiedBadge } from "@/components/ui/status-badges";
import { Container } from "@/features/landing/container";
import { AmanahMark } from "@/features/landing/icons";
import type { OrganisationProfile as Profile } from "@/lib/api/schemas";
import { formatMonth, formatShortDate } from "@/lib/date";
import { formatNaira } from "@/lib/money";
import { OrganisationCampaigns } from "./organisation-campaigns";

const panel = "flex flex-col gap-5 rounded-3xl border border-mist-200 bg-white p-7";
const h2 = "text-xl font-extrabold tracking-[-0.02em]";

const verifiedMeans = [
  "Registration documents reviewed by the Amanah team.",
  "Every campaign is reviewed before it goes live.",
  "Its own admins can never be its witnesses.",
];

/**
 * A verified organisation's public profile (F2.4): who they are, their track record and every
 * public campaign as a card. Type and registration number are deliberately not shown.
 */
export function OrganisationProfile({ organisation: o }: { organisation: Profile }) {
  const stillDelivering = o.endedCount - o.completedCount;
  return (
    <Container className="flex flex-col gap-8 pt-6 pb-[clamp(64px,8vw,112px)]">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-1.5 self-start py-2.5 text-[15px] font-semibold text-brand-900"
      >
        <ChevronLeftIcon aria-hidden="true" className="size-4" />
        All campaigns
      </Link>

      <div className="grid items-stretch gap-6 min-[980px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] min-[980px]:gap-8">
        <section aria-labelledby="o-name" className={`${panel} justify-between gap-8`}>
          <div className="flex items-start gap-5">
            <span aria-hidden="true" className="flex-none">
              <AmanahMark size={72} tone="brand" />
            </span>
            <div className="flex min-w-0 flex-col gap-2.5">
              <VerifiedBadge />
              <h1
                id="o-name"
                className="text-[clamp(32px,4vw,52px)] leading-[1.02] font-extrabold tracking-[-0.04em] [overflow-wrap:anywhere] text-brand-950"
              >
                {o.name}
              </h1>
              <p className="flex items-center gap-1.5 text-base text-ink-600">
                <MapPinIcon aria-hidden="true" className="size-4 flex-none" />
                {o.city}, {o.state} State
              </p>
            </div>
          </div>
          <dl className="m-0 grid gap-3 min-[560px]:grid-cols-2">
            <div className="flex flex-col gap-0.5 rounded-2xl bg-mist-50 px-4 py-3.5">
              <dt className="text-[13px] text-ink-600">Address</dt>
              <dd className="m-0 font-semibold">{o.address}</dd>
            </div>
            <div className="flex flex-col gap-0.5 rounded-2xl bg-mist-50 px-4 py-3.5">
              <dt className="text-[13px] text-ink-600">On Amanah since</dt>
              <dd className="m-0 font-semibold">{formatMonth(o.verifiedAt)}</dd>
            </div>
          </dl>
        </section>

        <div className="flex flex-col gap-6">
          <section aria-labelledby="o-record" className={panel}>
            <h2 id="o-record" className={h2}>
              Track record
            </h2>
            {o.endedCount > 0 ? (
              <div className="flex flex-col gap-3">
                <p className="flex items-baseline gap-3">
                  <span className="text-[44px] leading-none font-extrabold tracking-[-0.03em] text-brand-950">
                    {o.completedCount}
                  </span>
                  <span className="text-[15px] text-ink-700">
                    of {o.endedCount} ended campaigns completed and confirmed
                  </span>
                </p>
                <div
                  role="img"
                  aria-label={`${o.completedCount} completed, ${stillDelivering} still delivering`}
                  className="flex h-3 gap-1 overflow-hidden rounded-full"
                >
                  <span
                    className="bg-brand-700"
                    style={{ flexGrow: o.completedCount, flexBasis: 0 }}
                  />
                  <span
                    className="bg-gold-400"
                    style={{ flexGrow: stillDelivering, flexBasis: 0 }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-[15px] text-ink-700">
                No campaign has ended yet, so there is no completion record to show.
              </p>
            )}
            <dl className="m-0 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-0.5 rounded-2xl bg-mist-50 px-4 py-3.5">
                <dt className="text-[13px] text-ink-600">Campaigns</dt>
                <dd className="m-0 text-xl font-bold">{o.campaignCount}</dd>
              </div>
              <div className="flex flex-col gap-0.5 rounded-2xl bg-mist-50 px-4 py-3.5">
                <dt className="text-[13px] text-ink-600">Raised on Amanah</dt>
                <dd className="m-0 text-xl font-bold">{formatNaira(o.raisedAmount)}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="o-verified" className={panel}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 id="o-verified" className={h2}>
                What verified means
              </h2>
              <span className="rounded-full bg-brand-100 px-3 py-1 text-[13px] font-semibold text-brand-900">
                Since {formatShortDate(o.verifiedAt)}
              </span>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] leading-normal text-ink-700">
              {verifiedMeans.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-0.5 size-4 flex-none text-brand-700"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <OrganisationCampaigns campaigns={o.campaigns} />
    </Container>
  );
}
