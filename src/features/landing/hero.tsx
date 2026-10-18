import { ItemStatusBadge } from "@/components/ui/status-badges";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatNaira } from "@/lib/money";
import { Container } from "./container";
import { exampleCampaign } from "./example-campaign";
import { CheckIcon, LockIcon, VerifiedIcon } from "./icons";
import { KhatamPattern } from "./khatam-pattern";
import { CAMPAIGNS_HREF, sectionIds } from "./nav-links";

const trustPoints = [
  "Fixed targets, never exceeded",
  "Receipts for every purchase",
  "Delivery confirmed by a witness",
] as const;

/** The example campaign card that overlaps the arch. Always labelled "Example campaign". */
function ExampleCampaignCard() {
  const c = exampleCampaign;
  return (
    <article
      aria-labelledby="example-title"
      className="relative mx-4 -mt-[120px] flex flex-col gap-4 rounded-[22px] border border-mist-200 bg-white p-[22px] text-ink-900 shadow-[0_24px_48px_-28px_rgba(15,42,29,0.55)] min-[600px]:absolute min-[600px]:bottom-[76px] min-[600px]:-left-16 min-[600px]:mx-0 min-[600px]:mt-0 min-[600px]:w-[360px] min-[900px]:max-[1180px]:-left-6"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-mist-100 px-2.5 py-1 text-xs font-semibold text-ink-600">
          Example campaign
        </span>
        <span className="text-[13px] text-ink-500">{c.location}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h2 id="example-title" className="text-[19px] font-bold tracking-[-0.01em]">
          {c.title}
        </h2>
        <span className="flex items-center gap-1.5 text-sm text-ink-600">
          <VerifiedIcon size={15} strokeWidth={2.4} className="text-brand-700" />
          {c.organisation}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[26px] font-extrabold tracking-[-0.02em]">
            {formatNaira(c.raisedAmount)}
          </span>
          <span className="text-[13px] text-ink-500">of {formatNaira(c.targetAmount)}</span>
        </div>
        <ProgressBar
          value={c.raisedAmount}
          max={c.targetAmount}
          label="Raised"
          showLabel={false}
          trackClassName="h-2 bg-brand-150"
        />
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-900">
          <LockIcon size={14} strokeWidth={2.4} />
          Target reached. Donations closed.
        </p>
      </div>
      <ul aria-label="Items and their status" className="flex flex-col gap-2.5 text-sm">
        {c.items.map((item) => (
          <li key={item.name} className="flex items-center justify-between gap-2">
            <span>{item.name}</span>
            <ItemStatusBadge status={item.status} />
          </li>
        ))}
      </ul>
    </article>
  );
}

/** The arch window: a mihrab arch with the khatam lattice, أمانة at its crown, and the example. */
function ArchWindow() {
  return (
    <div className="relative w-full max-w-[460px] justify-self-center min-[900px]:max-w-[500px] min-[900px]:justify-self-end">
      <div className="relative h-[420px] overflow-hidden rounded-[999px_999px_32px_32px] bg-brand-900 min-[600px]:h-[600px]">
        <KhatamPattern id="khatam-hero" className="inset-0" />
        <div className="absolute inset-x-0 top-[86px] flex justify-center">
          <span
            lang="ar"
            dir="rtl"
            className="font-arabic-display text-[clamp(72px,8vw,116px)] leading-none font-bold text-gold-500"
          >
            أمانة
          </span>
        </div>
      </div>
      <ExampleCampaignCard />
      <p className="mx-1 mt-3.5 text-sm leading-normal text-ink-500">
        <strong className="text-ink-900">Amānah</strong>: the trust placed in your care, and the
        duty to return it intact.
      </p>
      <div
        aria-hidden="true"
        className="absolute top-[300px] -right-5 hidden items-center gap-2.5 rounded-full border border-mist-200 bg-white py-2.5 pr-4 pl-2.5 text-sm font-semibold shadow-[0_16px_32px_-20px_rgba(15,42,29,0.5)] min-[1180px]:flex"
      >
        <span className="flex size-[30px] flex-none items-center justify-center rounded-full bg-brand-700 text-white">
          <CheckIcon size={15} strokeWidth={3} />
        </span>
        Witness confirmed delivery
      </div>
    </div>
  );
}

/** Hero on white: the promise on the left, the arch window on the right (below it on phones). */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <Container className="grid grid-cols-1 items-center gap-12 pt-[clamp(40px,6vw,88px)] pb-[clamp(56px,7vw,104px)] min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[900px]:gap-[clamp(48px,6vw,88px)]">
        <div className="flex min-w-0 flex-col gap-7">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-brand-150 py-2 pr-3.5 pl-2.5 text-sm font-semibold text-brand-900">
            <VerifiedIcon size={18} strokeWidth={2.4} className="text-brand-700" />
            Verified Islamic organisations in Nigeria
          </span>
          <h1
            id="hero-title"
            className="text-[clamp(44px,6.2vw,92px)] leading-[0.96] font-extrabold tracking-[-0.045em] text-brand-950"
          >
            Give with certainty. Follow every naira.
          </h1>
          <p className="max-w-[38ch] text-[clamp(18px,1.5vw,21px)] leading-[1.55] text-ink-600">
            Mosques, orphanages and community groups list exactly what they need. You give, then
            follow every naira to delivery.
          </p>
          <div className="flex flex-wrap items-center gap-3 min-[380px]:flex-nowrap min-[600px]:flex-wrap">
            <a
              href={CAMPAIGNS_HREF}
              className="rounded-full bg-brand-900 px-5 py-4 text-base font-bold whitespace-nowrap text-white hover:bg-brand-700 min-[600px]:px-[30px] min-[600px]:py-[17px] min-[600px]:text-[17px]"
            >
              Browse campaigns
            </a>
            <a
              href={`#${sectionIds.how}`}
              className="rounded-full bg-mist-100 px-3.5 py-4 text-base font-bold whitespace-nowrap text-brand-900 hover:bg-mist-200 min-[600px]:px-[22px] min-[600px]:py-[17px] min-[600px]:text-[17px]"
            >
              See how it works
            </a>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-7 gap-y-3.5 border-t border-mist-200 pt-[22px] text-[15px] font-medium text-ink-650">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckIcon size={18} strokeWidth={2.6} className="text-brand-700" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <ArchWindow />
      </Container>
    </section>
  );
}
