import { cn } from "@/lib/cn";
import { formatNaira } from "@/lib/money";
import { Container } from "./container";
import {
  exampleCampaign,
  exampleSpent,
  riceItem,
  type ExampleItemStatus,
} from "./example-campaign";
import { VerifiedIcon } from "./icons";
import { sectionIds } from "./nav-links";

const statusChip: Record<ExampleItemStatus, { label: string; className: string }> = {
  DELIVERED: { label: "Delivered", className: "bg-brand-100 text-brand-900" },
  PURCHASED: { label: "Purchased", className: "bg-gold-100 text-gold-800" },
  NEEDED: { label: "Needed", className: "bg-sand-300 text-ink-600" },
};

/** Short item names for the narrow phone illustration. */
const phoneItemNames = ["Rice, 5 × 50 kg", "Cooking oil, 4 × 25 L", "Dates and sugar, 40"] as const;

const features = [
  {
    title: "Raised, spent and held",
    body: "Target, money raised, money spent and the balance still held, live.",
  },
  { title: "Item by item", body: "Each need marked needed, purchased or delivered." },
  {
    title: "Receipts and photos",
    body: "Captured in the app, with the server's timestamp and the location.",
  },
  {
    title: "An independent witness",
    body: "Confirms or disputes delivery. A disputed item is never shown as delivered.",
    accent: true,
  },
] as const;

function PhonePreview() {
  const c = exampleCampaign;
  return (
    <figure className="mx-auto w-full max-w-[380px] min-w-0 flex-[1_1_320px]">
      <div
        aria-hidden="true"
        className="mx-auto w-full max-w-[360px] rounded-[48px] bg-ink-900 p-3 shadow-[0_40px_80px_-30px_rgba(15,81,50,0.55)]"
      >
        <div className="flex flex-col overflow-hidden rounded-[38px] bg-sand-50">
          <div className="flex flex-col gap-2.5 bg-brand-900 px-[22px] pt-7 pb-[22px] text-sand-100">
            <span className="text-[13px] text-sand-100/75">Verified mosque, Offa</span>
            <span className="text-xl font-bold">{c.title}</span>
            <div className="h-2 overflow-hidden rounded-full bg-sand-100/20">
              <div className="h-full w-full bg-gold-500" />
            </div>
            <div className="flex justify-between text-[13px]">
              <span>{formatNaira(c.raisedAmount)} raised</span>
              <span>Spent {formatNaira(exampleSpent)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-[18px] pt-[18px] pb-1.5">
            <span className="text-sm font-bold">Items</span>
            {c.items.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between gap-2 text-sm">
                <span>{phoneItemNames[i] ?? item.name}</span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-bold",
                    statusChip[item.status].className,
                  )}
                >
                  {statusChip[item.status].label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 px-[18px] py-3.5">
            <span className="text-sm font-bold">Latest expense</span>
            <div className="flex items-center gap-3 rounded-[14px] bg-sand-200 p-2.5">
              <div className="flex h-16 w-[52px] flex-none flex-col gap-1 rounded-lg border border-sand-500 bg-white px-[7px] py-2">
                <span className="h-[3px] rounded-sm bg-sand-600" />
                <span className="h-[3px] w-[70%] rounded-sm bg-sand-600" />
                <span className="h-[3px] rounded-sm bg-sand-600" />
                <span className="h-[3px] w-1/2 rounded-sm bg-sand-600" />
                <span className="mt-auto h-[3px] w-[60%] rounded-sm bg-ink-900" />
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-sm font-semibold">Rice, local market</span>
                <span className="text-[13px] text-ink-600">
                  {formatNaira(riceItem.total)}, receipt attached
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-[18px] pb-3.5">
            <span className="text-sm font-bold">Evidence</span>
            <div className="flex h-[120px] items-end rounded-[14px] bg-[repeating-linear-gradient(135deg,var(--color-brand-100)_0_10px,var(--color-brand-200)_10px_20px)] p-2.5">
              <span className="rounded-lg bg-ink-900/80 px-2 py-[5px] text-[11px] font-semibold text-white">
                Uploaded 10:42 WAT in Offa, Kwara
              </span>
            </div>
          </div>

          <div className="mx-[18px] mb-[22px] flex items-start gap-2.5 rounded-[14px] border-[1.5px] border-brand-700 px-3.5 py-3">
            <VerifiedIcon size={18} strokeWidth={2.4} className="mt-px flex-none text-brand-700" />
            <span className="text-[13px] leading-[1.45]">
              <strong>Witness confirmed</strong> delivery of the rice to the mosque store.
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3.5 text-center text-sm text-ink-600">
        An example campaign page
        <span className="sr-only">
          : {formatNaira(c.raisedAmount)} raised and {formatNaira(exampleSpent)} spent. Rice
          delivered and confirmed by a witness, cooking oil purchased, dates and sugar still needed.
          The rice receipt and a delivery photo uploaded at 10:42 WAT in Offa, Kwara are shown.
        </span>
      </figcaption>
    </figure>
  );
}

export function AccountabilitySection() {
  return (
    <section
      id={sectionIds.trail}
      aria-labelledby="trail-title"
      className="scroll-mt-4 bg-sand-100"
    >
      <Container className="flex flex-wrap-reverse items-center gap-16 py-[clamp(72px,10vw,120px)]">
        <PhonePreview />
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-7">
          <h2
            id="trail-title"
            className="text-[clamp(36px,4.4vw,60px)] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance text-brand-900"
          >
            Every campaign comes with its receipts.
          </h2>
          <p className="max-w-[46ch] text-[19px] leading-[1.6] text-ink-700">
            The accountability page is public and updates as money moves. Open any campaign and you
            see the whole trail, not a thank-you note.
          </p>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-8 gap-y-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={cn(
                  "flex flex-col gap-1.5 border-t-[3px] pt-3.5",
                  "accent" in f ? "border-gold-500" : "border-brand-900",
                )}
              >
                <dt className="text-lg font-bold">{f.title}</dt>
                <dd className="text-base leading-normal text-ink-600">{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
