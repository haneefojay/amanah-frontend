"use client";

import { ErrorState } from "@/components/ui/error-state";

/** Route-level error boundary (F1.5). Never shows raw error details to visitors. */
export default function RouteError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60dvh] max-w-md items-center justify-center px-6">
      <ErrorState
        title="Something went wrong"
        description="This page didn't load properly. Try again, or come back in a moment."
        onRetry={retry}
      />
    </main>
  );
}
