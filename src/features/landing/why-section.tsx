import { Container } from "./container";

export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="bg-sand-100">
      <Container className="flex flex-wrap gap-x-20 gap-y-10 py-[clamp(72px,10vw,120px)]">
        <h2
          id="why-title"
          className="flex-[1_1_420px] text-[clamp(34px,4vw,52px)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-brand-900"
        >
          Generosity runs on trust. Trust needs proof.
        </h2>
        <div className="flex flex-[1_1_420px] flex-col gap-5 text-[19px] leading-[1.6] text-ink-700">
          <p>
            Most giving ends at the payment. Donors send money and hope it arrives. Organisations
            doing honest work have no simple way to show where it went.
          </p>
          <p>
            Amanah turns every campaign into an open record: what was needed, what was given, what
            was bought, and who saw it delivered. Nothing to take on faith.
          </p>
        </div>
      </Container>
    </section>
  );
}
