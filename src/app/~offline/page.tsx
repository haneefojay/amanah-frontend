import type { Metadata } from "next";

export const metadata: Metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold text-brand-900">You are offline</h1>
      <p className="text-ink-600">
        Amanah needs a connection to show live campaign totals and to accept donations. Pages you
        opened recently are still available.
      </p>
    </main>
  );
}
