import { formatNaira } from "@/lib/money";
import { Container } from "./container";
import { capDemo, capDemoRemaining } from "./example-campaign";
import { LockIcon } from "./icons";
import { sectionIds } from "./nav-links";

const rules = [
  "Targets are fixed before a campaign goes live, and locked after the first gift.",
  `Two donors paying for the last ${formatNaira(10_000_000)} at the same moment cannot push it over. Each amount is set aside while the donor pays.`,
  "If a late payment ever slips past, the excess is returned to the donor, or passed to Bayt al-Mal where return is not possible.",
] as const;

/** Visual-only buttons for the illustration: they look like the real dialog but do nothing. */
function FakeButton({ primary, children }: { primary?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={
        primary
          ? "rounded-full bg-brand-900 px-[22px] py-[13px] text-[15px] font-bold text-white"
          : "rounded-full bg-mist-100 px-[22px] py-[13px] text-[15px] font-semibold text-ink-900"
      }
    >
      {children}
    </span>
  );
}

/** The cap: the rule on the left, a dark panel showing the over-target dialog on the right. */
export function CapSection() {
  return (
    <section id={sectionIds.cap} aria-labelledby="cap-title" className="scroll-mt-4 bg-white">
      <Container className="grid grid-cols-1 items-center gap-[clamp(40px,6vw,96px)] py-[clamp(72px,9vw,128px)] min-[900px]:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-6">
          <h2
            id="cap-title"
            className="text-[clamp(36px,4.4vw,64px)] leading-none font-extrabold tracking-[-0.04em] text-balance text-brand-950"
          >
            Never a kobo beyond the target.
          </h2>
          <p className="max-w-[44ch] text-[19px] leading-[1.6] text-ink-600">
            When a campaign is fully funded, it closes itself. No organisation on Amanah can receive
            more than it asked for. Amanah enforces it, not good intentions.
          </p>
          <ul className="flex flex-col text-base leading-[1.55]">
            {rules.map((rule) => (
              <li key={rule} className="border-t border-mist-200 py-4 last:border-b">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <figure className="flex min-w-0 flex-col gap-5 rounded-[32px] bg-ink-900 p-[clamp(24px,3vw,40px)] text-sand-100">
          <figcaption className="sr-only">
            Example: a campaign with a {formatNaira(capDemo.target)} target has received{" "}
            {formatNaira(capDemo.donorA)}. A second donor enters{" "}
            {formatNaira(capDemo.donorBRequested)} and is offered {formatNaira(capDemoRemaining)}{" "}
            instead. After that, the campaign closes.
          </figcaption>
          <div className="flex flex-col gap-3" aria-hidden="true">
            <div className="flex justify-between text-sm text-sand-100/70">
              <span>Raised {formatNaira(capDemo.donorA)}</span>
              <span>Target {formatNaira(capDemo.target)}</span>
            </div>
            <div className="flex h-[52px] overflow-hidden rounded-[14px] bg-sand-100/10">
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
            className="flex flex-col gap-3.5 rounded-[22px] bg-white p-6 text-ink-900"
          >
            <span className="text-[19px] font-bold">
              Only {formatNaira(capDemoRemaining)} can be accepted
            </span>
            <p className="text-[15px] leading-[1.55] text-ink-600">
              Donor B entered {formatNaira(capDemo.donorBRequested)}, but this campaign needs only{" "}
              {formatNaira(capDemoRemaining)} more to reach its target.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <FakeButton primary>Give {formatNaira(capDemoRemaining)} instead</FakeButton>
              <FakeButton>Cancel</FakeButton>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="flex items-center gap-2.5 text-[15px] font-semibold text-gold-500"
          >
            <LockIcon size={18} strokeWidth={2.2} />
            Then: Target reached. Donations closed.
          </div>
        </figure>
      </Container>
    </section>
  );
}
