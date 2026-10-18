import { Container } from "./container";
import { PhoneIcon } from "./icons";
import { sectionIds } from "./nav-links";

type Props = {
  /** Where "Register your organisation" goes. */
  registerHref: string;
  /** mailto link for "Talk to the team"; the button is hidden when there is no contact email. */
  contactHref?: string;
};

export function OrganisationsCta({ registerHref, contactHref }: Props) {
  return (
    <section
      id={sectionIds.organisations}
      aria-labelledby="orgs-title"
      className="scroll-mt-4 bg-brand-900 text-sand-100"
    >
      <Container className="flex flex-wrap items-end justify-between gap-x-20 gap-y-12 py-[clamp(72px,10vw,120px)]">
        <div className="flex flex-[1_1_520px] flex-col gap-6">
          <h2
            id="orgs-title"
            className="text-[clamp(40px,5.2vw,72px)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance"
          >
            Doing honest work? Let it show.
          </h2>
          <p className="max-w-[46ch] text-[19px] leading-[1.6] text-sand-100/85">
            Register your mosque, orphanage, Islamic society or community group. Once verified,
            publish your first campaign and give donors the proof they have been waiting for.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href={registerHref}
              className="rounded-full bg-gold-500 px-7 py-4 text-[17px] font-bold text-ink-900 hover:bg-gold-300"
            >
              Register your organisation
            </a>
            {contactHref && (
              <a
                href={contactHref}
                className="rounded-full border-[1.5px] border-sand-100/45 px-6 py-4 text-[17px] font-semibold text-sand-100 hover:border-sand-100"
              >
                Talk to the team
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-[0_1_340px] items-start gap-4 rounded-[20px] bg-sand-100/10 p-[22px]">
          <PhoneIcon size={28} strokeWidth={1.8} className="flex-none text-gold-500" />
          <div className="flex flex-col gap-1.5">
            <span className="text-[17px] font-bold">Works on any phone</span>
            <span className="text-[15px] leading-normal text-sand-100/80">
              Add Amanah to your home screen like an app. No app store, light on data.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
