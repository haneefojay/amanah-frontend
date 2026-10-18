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

export function HowItWorks() {
  return (
    <section
      id={sectionIds.how}
      aria-labelledby="how-title"
      className="scroll-mt-4 border-t border-sand-400 bg-sand-50"
    >
      <Container className="flex flex-col gap-14 py-[clamp(72px,9vw,112px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2
            id="how-title"
            className="max-w-[16ch] text-[clamp(34px,4vw,52px)] leading-[1.05] font-extrabold tracking-[-0.03em]"
          >
            From need to delivery, in the open
          </h2>
          <p className="max-w-[42ch] text-lg leading-[1.55] text-ink-600">
            Five steps, each one visible on the campaign page. If a step is missing, everyone can
            see it.
          </p>
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-7 gap-y-10">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.title} className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3" aria-hidden="true">
                  <span
                    className={cn(
                      "flex size-11 flex-none items-center justify-center rounded-full text-lg font-extrabold",
                      last ? "bg-gold-500 text-ink-900" : "bg-brand-900 text-sand-100",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className={cn("h-0.5 flex-1", last ? "bg-transparent" : "bg-brand-900")} />
                </div>
                <h3 className="text-[21px] font-bold tracking-[-0.01em]">{step.title}</h3>
                <p className="text-base leading-[1.55] text-ink-600">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
