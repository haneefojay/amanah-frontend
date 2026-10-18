import Link from "next/link";
import { Container } from "@/features/landing/container";
import { PublicShell } from "@/features/public/public-shell";

/** Shown for an unknown or non-public campaign link. */
export default function CampaignNotFound() {
  return (
    <PublicShell>
      <Container className="flex flex-col items-center gap-5 py-24 text-center">
        <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-brand-900">
          We couldn’t find that campaign
        </h1>
        <p className="max-w-[46ch] text-ink-600">
          The link may be old or mistyped, or the campaign may not be public. You can browse every
          campaign that is open now.
        </p>
        <Link
          href="/campaigns"
          className="min-h-12 rounded-full bg-brand-900 px-6 py-3 font-bold text-white hover:bg-brand-700"
        >
          Browse campaigns
        </Link>
      </Container>
    </PublicShell>
  );
}
