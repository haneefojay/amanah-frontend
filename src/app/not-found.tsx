import Link from "next/link";
import { AmanahMark } from "@/components/brand/amanah-mark";
import { Button } from "@/components/ui/button";

/** Branded 404 (F1.5). */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-5 px-6 text-center">
      <AmanahMark size={48} tone="dark" />
      <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-brand-900">
        We couldn&apos;t find that page
      </h1>
      <p className="text-ink-600">
        The link may be old or mistyped. Campaign links shared by organisations always start with
        this site&apos;s address.
      </p>
      <Button asChild>
        <Link href="/">Go to the home page</Link>
      </Button>
    </main>
  );
}
