"use client";

import { useOffline } from "next/offline";

export function OfflineBanner() {
  const isOffline = useOffline();
  if (!isOffline) return null;

  return (
    <div
      role="status"
      className="sticky top-0 z-50 bg-warning-600 px-4 py-2 text-center text-sm font-medium text-white"
    >
      You are offline. Donations and live totals will resume when you reconnect.
    </div>
  );
}
