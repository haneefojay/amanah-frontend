import { publicEnv } from "@/lib/env";
import { AccountabilitySection } from "./accountability-section";
import { AudienceSection } from "./audience-section";
import { CampaignLedger } from "./campaign-ledger";
import { CapSection } from "./cap-section";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { sectionIds } from "./nav-links";
import { OrganisationsCta } from "./organisations-cta";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { WhySection } from "./why-section";

/** Phones only: the example campaign follows the hero, on paper, so the hero stays short. */
function PhoneExampleCampaign() {
  return (
    <section aria-label="Example campaign" className="bg-sand-100 px-5 pt-9 md:hidden">
      <p className="mb-4 text-[15px] font-semibold text-brand-900">
        What you see on every campaign
      </p>
      <CampaignLedger headingId="ledger-title-phone" variant="paper" />
    </section>
  );
}

type LandingPageProps = { contactEmail?: string };

/**
 * Public landing page (F2.6), built from the approved design in docs/design/landing-page.
 * Organisation registration (F6.1) does not exist yet, so "Register your organisation" emails the
 * team when a contact address is configured, and otherwise scrolls to the organisations section.
 */
export function LandingPage({
  contactEmail = publicEnv.NEXT_PUBLIC_CONTACT_EMAIL,
}: LandingPageProps) {
  const contactHref = contactEmail ? `mailto:${contactEmail}` : undefined;
  const registerHref = contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent("Register my organisation on Amanah")}`
    : `#${sectionIds.organisations}`;

  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:font-bold focus:text-ink-900"
      >
        Skip to content
      </a>
      <SiteHeader registerHref={`#${sectionIds.organisations}`} />
      <main id="main">
        <Hero />
        <PhoneExampleCampaign />
        <WhySection />
        <HowItWorks />
        <CapSection />
        <AccountabilitySection />
        <AudienceSection />
        <OrganisationsCta registerHref={registerHref} contactHref={contactHref} />
      </main>
      <SiteFooter />
    </div>
  );
}
