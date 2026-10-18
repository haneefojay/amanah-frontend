"use client";

import { reemKufiAmanah, schibstedGrotesk } from "./fonts";
import "./globals.css";

/** Replaces the root layout if it fails (F1.5). Must render its own <html> and <body>. */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en-NG" className={`${schibstedGrotesk.variable} ${reemKufiAmanah.variable}`}>
      <body className="min-h-dvh antialiased">
        <title>Something went wrong · Amanah</title>
        <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-5 px-6 text-center">
          <h1 className="text-3xl font-extrabold text-brand-900">Something went wrong</h1>
          <p className="text-ink-600">
            Amanah couldn&apos;t load. Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="h-11 rounded-full bg-brand-900 px-6 font-semibold text-sand-100"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
