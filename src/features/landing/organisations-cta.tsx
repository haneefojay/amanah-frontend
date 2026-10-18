import { Container } from "./container";
import { PhoneIcon } from "./icons";
import { KhatamPattern } from "./khatam-pattern";
import { sectionIds } from "./nav-links";

type Props = {
  /** Where "Register your organisation" goes. */
  registerHref: string;
  /** mailto link for "Talk to the team"; the button is hidden when there is no contact email. */
  contactHref?: string;
};

/** An inset green panel with the khatam lattice on its right side. */
export function OrganisationsCta({ registerHref, contactHref }: Props) {
  return (
    <section
      id={sectionIds.organisations}
      aria-labelledby="orgs-title"
      className="scroll-mt-4 bg-white"
    >
      <Container className="py-[clamp(56px,7vw,104px)]">
        <div className="relative flex overflow-hidden rounded-[40px] bg-brand-900 p-[clamp(32px,6vw,80px)] text-sand-100">
          <KhatamPattern
            id="khatam-orgs"
            className="top-0 right-0 hidden w-[44%] min-[600px]:block"
          />
          <div className="relative flex max-w-[640px] flex-col gap-6">
            <h2
              id="orgs-title"
              className="text-[clamp(38px,5vw,72px)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance"
            >
              Doing honest work? Let it show.
            </h2>
            <p className="max-w-[46ch] text-[19px] leading-[1.6] text-sand-100/85">
              Register your mosque, orphanage, Islamic society or community group. Once verified,
              publish your first campaign and give donors the proof they have been waiting for.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={registerHref}
                className="rounded-full bg-gold-500 px-[30px] py-[17px] text-[17px] font-bold text-ink-900 hover:bg-gold-300"
              >
                Register your organisation
              </a>
              {contactHref && (
                <a
                  href={contactHref}
                  className="rounded-full bg-sand-100/10 px-[26px] py-[17px] text-[17px] font-semibold text-sand-100 hover:bg-sand-100/20"
                >
                  Talk to the team
                </a>
              )}
            </div>
            <p className="flex items-center gap-2.5 text-[15px] text-sand-100/80">
              <PhoneIcon size={20} strokeWidth={1.8} className="flex-none text-gold-500" />
              Works on any phone. Add it to your home screen, no app store needed.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
