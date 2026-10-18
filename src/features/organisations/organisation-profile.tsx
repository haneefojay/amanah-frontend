import { CheckIcon, ChevronLeftIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/features/landing/container";
import { VerifiedIcon } from "@/features/landing/icons";
import type { OrganisationProfile as Profile } from "@/lib/api/schemas";
import { formatMonth, formatShortDate } from "@/lib/date";
import { formatNaira } from "@/lib/money";
import { OrganisationCampaigns } from "./organisation-campaigns";

const verifiedMeans = [
  "Registration documents reviewed by the Amanah team.",
  "Every campaign is reviewed before it goes live.",
  "Its own admins can never be its witnesses.",
];

/** The organisation's mark: a mihrab arch with a mosque outline, as on the approved board. */
function ArchTile() {
  return (
    <span
      aria-hidden="true"
      className="flex h-[84px] w-[72px] flex-none items-end justify-center rounded-t-[36px] rounded-b-2xl bg-brand-900 pb-4 min-[640px]:h-28 min-[640px]:w-24 min-[640px]:rounded-t-[48px] min-[640px]:rounded-b-[20px] min-[640px]:pb-[22px]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-9 text-gold-500 min-[640px]:size-11"
      >
        <path d="M5 21V11a7 7 0 0 1 14 0v10" />
        <path d="M3 21h18" />
        <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
      </svg>
    </span>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-[18px] bg-white px-[18px] py-4">
      <dt className="text-[13px] text-ink-600">{label}</dt>
      <dd className="m-0 font-semibold">{value}</dd>
    </div>
  );
}

/** Ended campaigns as segments: gold for completed and confirmed, faint for still delivering. */
function RecordBar({ completed, ended }: { completed: number; ended: number }) {
  return (
    <div
      role="img"
      aria-label={`${completed} completed, ${ended - completed} still delivering`}
      className="flex h-2.5 gap-1"
    >
      {Array.from({ length: ended }, (_, i) => (
        <span
          key={i}
          className={
            i < completed ? "flex-1 rounded-full bg-gold-500" : "flex-1 rounded-full bg-sand-100/20"
          }
        />
      ))}
    </div>
  );
}

/**
 * A verified organisation's public profile (F2.4), built to the approved board: who they are
 * (left), their track record and what verified means (right, same height), then every public
 * campaign as a card. Type and registration number are deliberately not shown.
 */
export function OrganisationProfile({ organisation: o }: { organisation: Profile }) {
  return (
    <Container className="flex flex-col gap-6 pt-6 pb-[clamp(64px,8vw,112px)]">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-1.5 self-start py-2.5 text-[15px] font-semibold text-brand-900"
      >
        <ChevronLeftIcon aria-hidden="true" className="size-4" />
        All campaigns
      </Link>

      <div className="grid items-stretch gap-5 min-[980px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section
          aria-labelledby="o-name"
          className="flex flex-col gap-7 rounded-[26px] bg-mist-50 px-[22px] py-6 min-[640px]:rounded-[32px] min-[640px]:p-[clamp(28px,3.4vw,40px)]"
        >
          {o.coverImageUrl && (
            <div className="relative h-[180px] overflow-hidden rounded-[22px] bg-brand-150 min-[640px]:h-[220px] min-[980px]:h-auto min-[980px]:min-h-[140px] min-[980px]:flex-1">
              <Image
                src={o.coverImageUrl}
                alt=""
                fill
                priority
                sizes="(min-width: 980px) 640px, 100vw"
                className="object-cover"
                unoptimized={!o.coverImageUrl.startsWith("/")}
              />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
            <ArchTile />
            <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-brand-300 bg-brand-150 py-[7px] pr-[13px] pl-[9px] text-sm font-semibold text-brand-900">
                <VerifiedIcon size={18} strokeWidth={2.4} className="text-brand-700" />
                Verified by Amanah
              </span>
              <h1
                id="o-name"
                className="text-[34px] leading-none font-extrabold tracking-[-0.04em] [overflow-wrap:anywhere] text-brand-950 min-[640px]:text-[clamp(36px,4vw,56px)]"
              >
                {o.name}
              </h1>
              <p className="flex items-center gap-1.5 text-[15px] text-ink-600 min-[640px]:text-[17px]">
                <MapPinIcon aria-hidden="true" className="size-[17px] flex-none" />
                {o.city}, {o.state} State
              </p>
            </div>
          </div>
          <dl className="m-0 mt-auto grid gap-3 min-[640px]:grid-cols-2">
            <Fact label="Address" value={o.address} />
            <Fact label="On Amanah since" value={formatMonth(o.verifiedAt)} />
          </dl>
        </section>

        <div className="flex min-w-0 flex-col gap-5">
          <section
            aria-labelledby="o-record"
            className="flex flex-col gap-5 rounded-[26px] bg-brand-900 p-7 text-sand-100 min-[640px]:rounded-[32px]"
          >
            <h2 id="o-record" className="text-xl font-bold">
              Track record
            </h2>
            {o.endedCount > 0 ? (
              <div className="flex flex-col gap-2.5">
                <p className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className="text-5xl leading-none font-extrabold tracking-[-0.03em]">
                    {o.completedCount}
                  </span>
                  <span className="text-base text-sand-100/85">
                    of {o.endedCount} ended {o.endedCount === 1 ? "campaign" : "campaigns"}{" "}
                    completed and confirmed
                  </span>
                </p>
                <RecordBar completed={o.completedCount} ended={o.endedCount} />
              </div>
            ) : (
              <p className="text-base text-sand-100/85">
                No campaign has ended yet, so there is no completion record to show.
              </p>
            )}
            <dl className="m-0 grid grid-cols-2 gap-3 border-t border-sand-100/15 pt-[18px]">
              <div className="flex flex-col gap-0.5">
                <dt className="text-[13px] text-sand-100/75">Campaigns</dt>
                <dd className="m-0 text-2xl font-extrabold">{o.campaignCount}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-[13px] text-sand-100/75">Raised on Amanah</dt>
                <dd className="m-0 text-2xl font-extrabold">{formatNaira(o.raisedAmount)}</dd>
              </div>
            </dl>
            <p className="text-sm leading-normal text-sand-100/75">
              A campaign is completed when every item is delivered and a witness has confirmed it.
            </p>
          </section>

          <section
            aria-labelledby="o-verified"
            className="flex flex-1 flex-col gap-3.5 rounded-[26px] border border-mist-200 px-7 py-[26px] min-[640px]:rounded-[32px]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h2 id="o-verified" className="text-lg font-bold text-brand-950">
                What verified means
              </h2>
              <span className="text-sm text-ink-600">Since {formatShortDate(o.verifiedAt)}</span>
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] leading-normal text-ink-700">
              {verifiedMeans.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <CheckIcon
                    aria-hidden="true"
                    strokeWidth={2.6}
                    className="mt-0.5 size-[18px] flex-none text-brand-700"
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
