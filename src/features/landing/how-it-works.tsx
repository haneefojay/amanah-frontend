import { cn } from "@/lib/cn";
import { Container } from "./container";
import { sectionIds } from "./nav-links";

const steps = [
  {
    title: "Verified first",
    body: "The Amanah team checks every organisation before it can publish a single campaign.",
  },
  {
    title: "Itemised needs",
    body: "Each campaign lists exactly what it needs, item by item, with a fixed target that adds up to the naira.",
  },
  {
    title: "You give",
    body: "Pay securely through Paystack. Your amount is held for you while you pay, so the target is never overshot.",
  },
  {
    title: "Spending, with proof",
    body: "Every purchase is logged with its receipt and photos taken in the app, stamped with time and place.",
  },
  {
    title: "A witness confirms",
    body: "A respected community member, independent of the organisation, confirms each delivery, or disputes it in public.",
  },
] as const;

/** Five steps as cards, each numbered on a small arch tile. */
export function HowItWorks() {
  return (
    <section id={sectionIds.how} aria-labelledby="how-title" className="scroll-mt-4 bg-mist-50">
      <Container className="flex flex-col gap-12 py-[clamp(72px,9vw,128px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <h2
            id="how-title"
            className="max-w-[14ch] text-[clamp(34px,4vw,56px)] leading-[1.02] font-extrabold tracking-[-0.035em] text-brand-950"
          >
            From need to delivery, in the open
          </h2>
          <p className="max-w-[40ch] text-lg leading-[1.55] text-ink-600">
            Five steps, each one visible on the campaign page. If a step is missing, everyone can
            see it.
          </p>
        </div>
        <ol className="grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-5">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.title} className="flex flex-col gap-3.5 rounded-3xl bg-white p-6">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-[52px] w-11 items-end justify-center rounded-[999px_999px_10px_10px] pb-2.5 text-lg font-extrabold",
                    last ? "bg-gold-500 text-ink-900" : "bg-brand-900 text-white",
                  )}
                >
                  {i + 1}
                </span>
                <h3 className="text-[19px] font-bold">{step.title}</h3>
                <p className="text-[15px] leading-[1.55] text-ink-600">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
