import { ProgressBar } from "@/components/ui/progress-bar";
import { formatNaira } from "@/lib/money";

// Temporary landing page for the F0 foundation. Replaced by the campaign list in F2.1.
export default function HomePage() {
  const target = 50_000_000; // ₦500,000 in kobo
  const raised = 30_000_000; // ₦300,000 in kobo

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-8 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-widest text-brand-700 uppercase">Amanah</p>
        <h1 className="text-3xl leading-tight font-semibold text-brand-900 sm:text-4xl">
          Give with trust. See every naira at work.
        </h1>
        <p className="text-ink-600">
          Verified Islamic organisations publish specific needs. You give to those needs and follow
          exactly how the money is spent.
        </p>
      </header>

      <section
        aria-labelledby="sample-campaign"
        className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
      >
        <h2 id="sample-campaign" className="font-semibold text-ink-900">
          Sample: Ramadan food drive
        </h2>
        <ProgressBar value={raised} max={target} label="Raised so far" />
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="text-ink-600">Raised</dt>
          <dd className="text-right font-medium">{formatNaira(raised)}</dd>
          <dt className="text-ink-600">Target</dt>
          <dd className="text-right font-medium">{formatNaira(target)}</dd>
        </dl>
      </section>

      <p className="text-xs text-ink-400">
        Development build. Campaigns arrive in roadmap phase F2.
      </p>
    </main>
  );
}
