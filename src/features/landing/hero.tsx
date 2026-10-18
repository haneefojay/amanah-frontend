import { CampaignLedger } from "./campaign-ledger";
import { Container } from "./container";
import { sectionIds } from "./nav-links";

/**
 * Hero and the أمانة signature on the deep green ground. Starts the page's <main>.
 * On phones the example campaign is not in the hero: it follows it (PhoneExampleCampaign),
 * the buttons share one line, and أمانة is left out so the meaning sentence closes the hero.
 * From 900px to 1180px (for example "desktop site" on a phone, about 980px) the example
 * campaign stays beside the headline, as on desktop.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-brand-900 text-sand-100">
      <Container className="flex flex-wrap items-start gap-[clamp(40px,5vw,56px)] pt-[clamp(24px,4vw,56px)] min-[900px]:max-[1180px]:flex-nowrap min-[900px]:max-[1180px]:gap-10 md:pb-10">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-7 pt-[clamp(0px,2vw,24px)] min-[900px]:max-[1180px]:flex-[1_1_0]">
          <p className="text-[17px] text-sand-100/80">
            Transparent giving to verified Islamic organisations in Nigeria
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(46px,6.4vw,88px)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance"
          >
            Give with certainty. Follow every naira.
          </h1>
          <p className="max-w-[34ch] text-[clamp(18px,1.6vw,20px)] leading-[1.55] text-sand-100/90">
            Mosques, orphanages and community groups list exactly what they need. You give, then
            follow every naira to delivery.
          </p>
          <div className="flex flex-nowrap items-center gap-3 md:flex-wrap md:gap-3.5">
            <a
              href={`#${sectionIds.trail}`}
              className="rounded-full bg-gold-500 px-5 py-3.5 text-base font-bold whitespace-nowrap text-ink-900 hover:bg-gold-300 md:px-7 md:py-4 md:text-[17px]"
            >
              Browse campaigns
            </a>
            <a
              href={`#${sectionIds.how}`}
              className="border-b-2 border-sand-100/40 px-0.5 py-3.5 text-base font-semibold whitespace-nowrap text-sand-100 hover:border-sand-100 md:px-2 md:py-4 md:text-[17px]"
            >
              See how it works
            </a>
          </div>
        </div>
        {/* Wide screens: beside the headline. Phones: after the hero (see LandingPage). */}
        <CampaignLedger
          headingId="ledger-title"
          className="hidden min-[900px]:max-[1180px]:flex-[0_1_420px] md:flex"
        />
      </Container>

      <Container className="flex items-end justify-between gap-x-10 gap-y-5 pt-7 md:pt-6">
        <p className="mb-8 max-w-[40ch] min-w-0 flex-auto text-[clamp(14px,1.3vw,17px)] leading-[1.55] text-sand-100/85 md:mb-[clamp(18px,3vw,40px)]">
          <strong className="font-bold text-sand-100">Amānah</strong> is the trust placed in your
          care, and the duty to return it intact. Every campaign on this platform is held to it.
        </p>
        <span
          lang="ar"
          dir="rtl"
          className="-mb-[0.16em] hidden flex-none font-arabic-display text-[clamp(84px,19vw,280px)] leading-[0.95] font-bold text-gold-500 md:block"
        >
          أمانة
        </span>
      </Container>
    </section>
  );
}
