import { Container } from "./container";

/** One bold statement on soft off-white: why proof matters. */
export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="bg-mist-50">
      <Container className="flex flex-col gap-8 py-[clamp(72px,9vw,128px)]">
        <h2
          id="why-title"
          className="max-w-[24ch] text-[clamp(30px,4.2vw,60px)] leading-[1.06] font-bold tracking-[-0.035em] text-brand-950"
        >
          Most giving ends at the payment. On Amanah, it ends at the delivery.
        </h2>
        <p className="max-w-[56ch] text-[19px] leading-[1.6] text-ink-600">
          Every campaign is an open record: what was needed, what was given, what was bought, and
          who saw it delivered. Organisations doing honest work finally have a simple way to show
          it.
        </p>
      </Container>
    </section>
  );
}
