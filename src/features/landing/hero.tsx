import { CampaignLedger } from "./campaign-ledger";
import { Container } from "./container";
import { sectionIds } from "./nav-links";

/** Hero and the أمانة signature on the deep green ground. Starts the page's <main>. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-brand-900 text-sand-100">
      <Container className="flex flex-wrap items-start gap-[clamp(40px,5vw,56px)] pt-[clamp(24px,4vw,56px)] pb-10">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5 pt-[clamp(0px,2vw,24px)] sm:gap-7">
          {/* Phones: the signature opens the hero so it is on the first screen. */}
          <div className="-mt-2 flex items-end justify-between gap-4 md:hidden">
            <p className="mb-3 max-w-[22ch] text-[13px] leading-[1.45] text-sand-100/80">
              <strong className="font-bold text-sand-100">Amānah</strong>: the trust placed in your
              care, and the duty to return it intact.
            </p>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic-display text-[clamp(96px,30vw,150px)] leading-[0.9] font-bold text-gold-500"
            >
              أمانة
            </span>
          </div>
          <p className="text-base text-sand-100/80 sm:text-[17px]">
            Transparent giving to verified Islamic organisations in Nigeria
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(46px,6.4vw,88px)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance"
          >
            Give with certainty. Follow every naira.
          </h1>
          <p className="max-w-[36ch] text-[17px] leading-[1.5] text-sand-100/90 sm:text-xl">
            Mosques, orphanages and Islamic community groups publish exactly what they need. You
            give to those needs, then watch the money become rice, books and roofs, with receipts,
            photos and an independent witness to confirm it.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href={`#${sectionIds.trail}`}
              className="rounded-full bg-gold-500 px-7 py-4 text-[17px] font-bold text-ink-900 hover:bg-gold-300"
            >
              Browse campaigns
            </a>
            <a
              href={`#${sectionIds.how}`}
              className="border-b-2 border-sand-100/40 px-2 py-4 text-[17px] font-semibold text-sand-100 hover:border-sand-100"
            >
              See how it works
            </a>
          </div>
          <p className="text-sm text-sand-100/75">
            Verified organisations only. Every campaign is capped at its target.
          </p>
        </div>
        <CampaignLedger />
      </Container>

      {/* Tablets and up: the signature closes the hero, as in the approved design. */}
      <Container className="hidden flex-wrap items-end justify-between gap-x-10 gap-y-2 pt-6 md:flex">
        <p className="mb-10 max-w-[40ch] flex-[1_1_300px] text-[17px] leading-[1.55] text-sand-100/85">
          <strong className="font-bold text-sand-100">Amānah</strong> is the trust placed in your
          care, and the duty to return it intact. Every campaign on this platform is held to it.
        </p>
        <span
          lang="ar"
          dir="rtl"
          className="-mb-[0.16em] font-arabic-display text-[clamp(120px,19vw,280px)] leading-[0.95] font-bold text-gold-500"
        >
          أمانة
        </span>
      </Container>
    </section>
  );
}
