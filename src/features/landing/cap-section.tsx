import { formatNaira } from "@/lib/money";
import { Container } from "./container";
import { capDemo, capDemoRemaining } from "./example-campaign";
import { AlertIcon, CheckIcon, LockIcon } from "./icons";
import { sectionIds } from "./nav-links";

const rules = [
  "Targets are fixed before a campaign goes live, and locked after the first gift.",
  `Two donors paying for the last ${formatNaira(10_000_000)} at the same moment cannot push it over. Amounts are reserved before payment.`,
  "If a late payment ever slips past, the excess is flagged and returned to the donor, or passed to Bayt al-Mal where return is not possible.",
] as const;

/** Visual-only buttons for the illustration: they look like the real dialog but do nothing. */
function FakeButton({ primary, children }: { primary?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={
        primary
          ? "rounded-full bg-brand-900 px-6 py-3.5 text-base font-bold text-sand-100"
          : "rounded-full border-[1.5px] border-sand-600 px-6 py-3.5 text-base font-semibold text-ink-900"
      }
    >
      {children}
    </span>
  );
}

export function CapSection() {
  return (
    <section
      id={sectionIds.cap}
      aria-labelledby="cap-title"
      className="scroll-mt-4 bg-ink-900 text-sand-100"
    >
      <Container className="flex flex-wrap items-center gap-16 py-[clamp(72px,10vw,120px)]">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
          <h2
            id="cap-title"
            className="text-[clamp(38px,4.6vw,64px)] leading-none font-extrabold tracking-[-0.035em] text-balance"
          >
            Never a kobo beyond the target.
          </h2>
          <p className="max-w-[44ch] text-[19px] leading-[1.6] text-sand-100/80">
            When a campaign is fully funded, it closes itself. No organisation on Amanah can receive
            more than it asked for. The rule is enforced by the system, not left to good intentions.
          </p>
          <ul className="flex flex-col gap-4 text-[17px] leading-[1.55]">
            {rules.map((rule) => (
              <li key={rule} className="flex gap-3.5">
                <CheckIcon size={22} strokeWidth={2.4} className="mt-0.5 flex-none text-gold-500" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="flex min-w-0 flex-[1_1_440px] flex-col gap-5">
          <figcaption className="sr-only">
            Example: a campaign with a {formatNaira(capDemo.target)} target has received{" "}
            {formatNaira(capDemo.donorA)}. A second donor enters{" "}
            {formatNaira(capDemo.donorBRequested)} and is offered {formatNaira(capDemoRemaining)}{" "}
            instead. After that, the campaign closes.
          </figcaption>
          <div className="flex flex-col gap-3" aria-hidden="true">
            <div className="flex justify-between text-[15px] text-sand-100/75">
              <span>Raised {formatNaira(capDemo.donorA)}</span>
              <span>Target {formatNaira(capDemo.target)}</span>
            </div>
            <div className="flex h-14 overflow-hidden rounded-[14px] bg-sand-100/10">
              <div
                className="flex min-w-0 items-center bg-brand-700 px-3 text-[13px] font-bold whitespace-nowrap sm:px-4 sm:text-[15px]"
                style={{ flexGrow: capDemo.donorA }}
              >
                Donor A, {formatNaira(capDemo.donorA)}
              </div>
              <div
                className="flex min-w-0 items-center justify-center rounded-r-[14px] border-2 border-dashed border-gold-500 px-2 text-[13px] font-semibold whitespace-nowrap text-gold-500 sm:text-[15px]"
                style={{ flexGrow: capDemoRemaining }}
              >
                {formatNaira(capDemoRemaining)} left
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="flex flex-col gap-[18px] rounded-[22px] bg-sand-50 p-6 text-ink-900 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)] sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 flex-none items-center justify-center rounded-full bg-gold-100 text-gold-800">
                <AlertIcon size={20} strokeWidth={2.2} />
              </span>
              <span className="text-xl font-bold">
                Only {formatNaira(capDemoRemaining)} can be accepted
              </span>
            </div>
            <p className="text-base leading-[1.55] text-ink-600">
              Donor B entered {formatNaira(capDemo.donorBRequested)}, but this campaign needs only{" "}
              {formatNaira(capDemoRemaining)} more to reach its target.
            </p>
            <div className="flex flex-wrap gap-3">
              <FakeButton primary>Give {formatNaira(capDemoRemaining)} instead</FakeButton>
              <FakeButton>Cancel</FakeButton>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="flex items-center gap-3 rounded-2xl bg-sand-100/10 px-5 py-4 text-base font-semibold"
          >
            <LockIcon size={18} strokeWidth={2.2} className="text-gold-500" />
            Then: Target reached. Donations closed.
          </div>
        </figure>
      </Container>
    </section>
  );
}
