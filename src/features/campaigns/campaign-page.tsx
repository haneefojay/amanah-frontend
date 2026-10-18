import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CampaignStatusBadge, VerifiedBadge } from "@/components/ui/status-badges";
import { Container } from "@/features/landing/container";
import { VerifiedIcon } from "@/features/landing/icons";
import { sectionIds } from "@/features/landing/nav-links";
import type { CampaignDetail } from "@/lib/api/schemas";
import { formatDate, formatMonth } from "@/lib/date";
import { formatNaira } from "@/lib/money";
import { CoverFallback } from "./campaign-card";
import { CampaignItems } from "./campaign-items";
import { FundingPanel } from "./funding-panel";

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[28px] leading-[1.1] font-extrabold tracking-[-0.03em] text-brand-950"
    >
      {children}
    </h2>
  );
}

function Facts({ rows }: { rows: [label: string, value: ReactNode][] }) {
  return (
    <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-[15px]">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-ink-600">{label}</dt>
          <dd className="m-0 text-right font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const card = "flex flex-col gap-4 rounded-3xl border border-mist-200 bg-white p-6";

/** The public campaign page (F2.3): story, items, funding and the organisation behind it. */
export function CampaignPage({ campaign: c }: { campaign: CampaignDetail }) {
  const org = c.organisation;
  return (
    <Container className="flex flex-col gap-6 pt-6 pb-[clamp(64px,8vw,112px)]">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-1.5 self-start py-2.5 text-[15px] font-semibold text-brand-900"
      >
        <ChevronLeftIcon aria-hidden="true" className="size-4" />
        All campaigns
      </Link>

      <div className="grid items-stretch gap-8 min-[980px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] min-[980px]:gap-14">
        <div className="relative h-[220px] overflow-hidden rounded-[22px] bg-brand-150 min-[640px]:h-[320px] min-[980px]:h-auto min-[980px]:min-h-[360px] min-[980px]:rounded-[28px]">
          {c.coverImageUrl ? (
            <Image
              src={c.coverImageUrl}
              alt=""
              fill
              priority
              sizes="(min-width: 980px) 640px, 100vw"
              className="object-cover"
              unoptimized={!c.coverImageUrl.startsWith("/")}
            />
          ) : (
            <CoverFallback />
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <CampaignStatusBadge status={c.status} />
              <span className="rounded-full bg-mist-100 px-[11px] py-[5px] text-[13px] font-semibold text-ink-700">
                {c.city}, {c.state}
              </span>
            </div>
            <h1 className="text-[clamp(32px,4vw,56px)] leading-[1.02] font-extrabold tracking-[-0.04em] [overflow-wrap:anywhere] text-brand-950">
              {c.title}
            </h1>
            <Link
              href={`/organisations/${org.id}`}
              className="inline-flex items-center gap-2 self-start text-base text-ink-700"
            >
              <VerifiedIcon size={17} strokeWidth={2.4} className="text-brand-700" />
              <span>
                By <strong className="text-ink-900">{org.name}</strong>
                <span className="sr-only"> (verified)</span>
              </span>
            </Link>
          </div>
          <FundingPanel campaign={c} />
        </div>
      </div>

      <div className="mt-8 grid items-start gap-10 min-[980px]:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] min-[980px]:gap-14">
        <article aria-label="About this campaign" className="flex min-w-0 flex-col gap-10">
          <section
            aria-labelledby="c-purpose"
            className="flex flex-col gap-2 rounded-3xl bg-brand-150 px-7 py-6"
          >
            <h2
              id="c-purpose"
              className="text-sm font-bold tracking-[0.08em] text-brand-900 uppercase"
            >
              Purpose
            </h2>
            <p className="text-[21px] leading-[1.45] font-semibold tracking-[-0.01em] text-brand-950">
              {c.purpose}
            </p>
          </section>

          <section aria-labelledby="c-about" className="flex flex-col gap-3.5">
            <H2 id="c-about">About this campaign</H2>
            {c.description.map((paragraph) => (
              <p key={paragraph} className="max-w-[64ch] text-[17px] leading-[1.65] text-ink-600">
                {paragraph}
              </p>
            ))}
          </section>

          <section aria-labelledby="c-items" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <H2 id="c-items">What the money buys</H2>
              <p className="text-base leading-normal text-ink-600">
                Each item has a fixed cost. Together they make the target.
              </p>
            </div>
            <CampaignItems items={c.items} target={c.targetAmount} />
          </section>

          {/* Accountability slot: receipts, photos and witness confirmations arrive in F3. */}
        </article>

        <aside aria-label="Organisation and campaign details" className="flex flex-col gap-5">
          <section aria-labelledby="c-org" className={card}>
            <div className="flex flex-col gap-2">
              <h2 id="c-org" className="text-xl font-extrabold tracking-[-0.02em]">
                {org.name}
              </h2>
              <VerifiedBadge />
              <p className="text-[15px] text-ink-600">
                {org.city}, {org.state} State · On Amanah since {formatMonth(org.verifiedAt)}
              </p>
            </div>
            <Facts
              rows={[
                ["Campaigns", org.campaignCount],
                ["Completed", `${org.completedCount} of ${org.endedCount} ended`],
              ]}
            />
            <Link
              href={`/organisations/${org.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-brand-300 px-5 font-bold text-brand-900 hover:border-brand-700"
            >
              View organisation
            </Link>
          </section>

          <section aria-labelledby="c-details" className={card}>
            <h2 id="c-details" className="text-xl font-extrabold tracking-[-0.02em]">
              Campaign details
            </h2>
            <Facts
              rows={[
                ["Published", formatDate(c.publishedAt)],
                ["Ends", c.endsAt ? formatDate(c.endsAt) : "No end date"],
                ["Items", `${c.items.length}, totalling ${formatNaira(c.targetAmount)}`],
                ["Location", `${c.city}, ${c.state}`],
              ]}
            />
          </section>

          <section aria-labelledby="c-protect" className={card}>
            <h2 id="c-protect" className="text-xl font-extrabold tracking-[-0.02em]">
              How your gift is protected
            </h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] leading-normal text-ink-700">
              <li>
                The target was fixed before going live and locks after the first gift. It can never
                be exceeded.
              </li>
              <li>Every purchase is published here with its receipt.</li>
              <li>A witness, independent of the organisation, confirms each delivery.</li>
            </ul>
            <a href={`/#${sectionIds.how}`} className="font-bold text-brand-900 underline">
              How Amanah works
            </a>
          </section>
        </aside>
      </div>
    </Container>
  );
}
