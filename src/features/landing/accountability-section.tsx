import { ItemStatusBadge } from "@/components/ui/status-badges";
import { formatNaira } from "@/lib/money";
import { Container } from "./container";
import { exampleBalanceHeld, exampleCampaign, exampleSpent, riceItem } from "./example-campaign";
import { CameraIcon, EyeIcon } from "./icons";
import { sectionIds } from "./nav-links";

const cardTitle = "text-xl font-bold";
const cardBody = "text-[15px] leading-normal text-ink-600";

/** Raised, spent and held: the large green card. */
function FundingCard() {
  return (
    <div className="flex flex-col justify-between gap-8 rounded-[28px] bg-brand-900 p-8 text-sand-100 min-[600px]:col-span-2 min-[900px]:col-span-1 min-[900px]:row-span-2">
      <div className="flex flex-col gap-2.5">
        <h3 className="text-2xl font-bold tracking-[-0.01em]">Raised, spent and held</h3>
        <p className="text-base leading-[1.55] text-sand-100/80">
          The target, what came in, what was spent and the balance still held, always adding up.
        </p>
      </div>
      <div className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-sand-100/70">Raised</span>
          <span className="text-[44px] leading-none font-extrabold tracking-[-0.03em]">
            {formatNaira(exampleCampaign.raisedAmount)}
          </span>
        </div>
        <div aria-hidden="true" className="flex h-3 overflow-hidden rounded-full bg-sand-100/15">
          <div className="bg-gold-500" style={{ flexGrow: exampleSpent }} />
          <div className="bg-sand-100/35" style={{ flexGrow: exampleBalanceHeld }} />
        </div>
        <dl className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-0.5">
            <dt className="flex items-center gap-1.5 text-sm text-sand-100/70">
              <span aria-hidden="true" className="size-2 rounded-full bg-gold-500" />
              Spent
            </dt>
            <dd className="text-[22px] font-bold">{formatNaira(exampleSpent)}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="flex items-center gap-1.5 text-sm text-sand-100/70">
              <span aria-hidden="true" className="size-2 rounded-full bg-sand-100/50" />
              Balance held
            </dt>
            <dd className="text-[22px] font-bold">{formatNaira(exampleBalanceHeld)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/** "What every campaign shows" as a grid of cards of different weights (bento). */
export function AccountabilitySection() {
  const shownItems = exampleCampaign.items.filter((i) => i.status !== "NEEDED");
  return (
    <section id={sectionIds.trail} aria-labelledby="trail-title" className="scroll-mt-4 bg-white">
      <Container className="flex flex-col gap-12 py-[clamp(72px,9vw,128px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <h2
            id="trail-title"
            className="max-w-[16ch] text-[clamp(34px,4vw,56px)] leading-[1.02] font-extrabold tracking-[-0.035em] text-brand-950"
          >
            Every campaign comes with its receipts.
          </h2>
          <p className="max-w-[40ch] text-lg leading-[1.55] text-ink-600">
            The accountability page is public and updates as money moves. This is what you see on
            every campaign.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
          <FundingCard />

          <div className="flex flex-col gap-[18px] rounded-[28px] bg-mist-50 p-7">
            <h3 className={cardTitle}>Item by item</h3>
            <ul className="flex flex-col gap-2.5 text-[15px]">
              {shownItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-2 rounded-[14px] bg-white px-3.5 py-3"
                >
                  <span>{item.name}</span>
                  <ItemStatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-5 rounded-[28px] bg-mist-50 p-7">
            <div
              aria-hidden="true"
              className="flex h-[120px] w-[92px] flex-none -rotate-4 flex-col gap-[7px] rounded-[10px] border border-mist-300 bg-white px-3 py-3.5"
            >
              <span className="h-1 rounded-sm bg-sand-500" />
              <span className="h-1 w-[70%] rounded-sm bg-sand-500" />
              <span className="h-1 rounded-sm bg-sand-500" />
              <span className="h-1 w-1/2 rounded-sm bg-sand-500" />
              <span className="mt-auto h-[5px] w-[60%] rounded-sm bg-ink-900" />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <h3 className={cardTitle}>A receipt for every purchase</h3>
              <p className={cardBody}>
                Rice, local market. {formatNaira(riceItem.total)}, receipt attached.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-[28px] bg-brand-150 p-7">
            <h3 className={`${cardTitle} text-brand-950`}>Photos with time and place</h3>
            <div className="flex min-h-[110px] flex-1 items-end justify-between gap-2 rounded-[18px] bg-brand-300 p-3">
              <span className="rounded-full bg-brand-950/85 px-2.5 py-1.5 text-xs font-semibold text-white">
                Uploaded 10:42 WAT in Offa, Kwara
              </span>
              <CameraIcon size={28} strokeWidth={1.8} className="flex-none text-brand-700" />
            </div>
          </div>

          <div className="flex flex-col gap-3.5 rounded-[28px] border-[1.5px] border-brand-700 bg-white p-7">
            <span
              aria-hidden="true"
              className="flex size-12 items-center justify-center rounded-[999px_999px_12px_12px] bg-brand-900 text-gold-500"
            >
              <EyeIcon size={22} strokeWidth={2.2} />
            </span>
            <h3 className={cardTitle}>An independent witness</h3>
            <p className={cardBody}>
              A respected community member confirms each delivery, or disputes it in public. A
              disputed item is never shown as delivered.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
