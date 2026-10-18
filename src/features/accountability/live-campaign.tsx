"use client";

import { onlineManager, useQuery } from "@tanstack/react-query";
import { CloudOffIcon, RefreshCwIcon } from "lucide-react";
import {
  createContext,
  type ReactNode,
  use,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { CampaignStatusBadge } from "@/components/ui/status-badges";
import { CampaignItems } from "@/features/campaigns/campaign-items";
import { FundingPanel } from "@/features/campaigns/funding-panel";
import { api } from "@/lib/api/client";
import type { CampaignDetail } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";
import { formatTime } from "@/lib/date";
import { AccountabilitySection } from "./accountability-section";

/** How often a visible campaign page asks for fresh figures (F3.7: every 10 to 15 seconds). */
export const LIVE_REFRESH_MS = 15_000;

type Live = {
  campaign: CampaignDetail;
  /** When the figures on screen were fetched (ms since epoch). */
  updatedAt: number;
  /** The last refresh failed; the figures on screen are the last good ones. */
  failed: boolean;
};

const LiveContext = createContext<Live | null>(null);

function useLive(): Live {
  const live = use(LiveContext);
  if (!live) throw new Error("useLive must be used inside <LiveCampaign>");
  return live;
}

/**
 * Keeps one campaign's figures live (F3.7). The page renders on the server with fresh data, then
 * this polls `GET /api/campaigns/:slug` every 15 seconds while the tab is visible. Polling stops
 * when the tab is hidden and resumes, with an immediate refresh, when it comes back. Responses
 * are never cached or stored (ADR-002): only the in-memory query cache holds them.
 */
export function LiveCampaign({
  initial,
  children,
}: {
  initial: CampaignDetail;
  children: ReactNode;
}) {
  // The server fetched `initial` moments before the page arrived, so the first refresh is due one
  // interval after hydration.
  const [renderedAt] = useState(() => Date.now());
  const query = useQuery({
    queryKey: ["campaign", initial.slug],
    queryFn: () => api.getCampaign(initial.slug, { cache: "no-store" }).then((r) => r.data),
    initialData: initial,
    initialDataUpdatedAt: renderedAt,
    staleTime: LIVE_REFRESH_MS,
    refetchInterval: LIVE_REFRESH_MS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const live: Live = {
    campaign: query.data,
    updatedAt: query.dataUpdatedAt,
    failed: query.isError,
  };
  return <LiveContext value={live}>{children}</LiveContext>;
}

export function LiveFundingPanel() {
  return <FundingPanel campaign={useLive().campaign} />;
}

export function LiveStatusBadge() {
  return <CampaignStatusBadge status={useLive().campaign.status} />;
}

export function LiveCampaignItems() {
  const { campaign } = useLive();
  return <CampaignItems items={campaign.items} target={campaign.targetAmount} />;
}

export function LiveAccountability() {
  return <AccountabilitySection campaign={useLive().campaign} status={<LiveIndicator />} />;
}

function useOnline(): boolean {
  return useSyncExternalStore(
    (notify) => onlineManager.subscribe(notify),
    () => onlineManager.isOnline(),
    () => true,
  );
}

/** Re-renders every `ms` so relative times ("3 minutes ago") stay true. */
function useNow(ms: number): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(timer);
  }, [ms]);
  return now;
}

/** "Updated just now", "Updated 3 minutes ago", or why the figures may be out of date. */
export function liveIndicatorText({
  updatedAt,
  now,
  failed,
  online,
}: {
  updatedAt: number;
  now: number;
  failed: boolean;
  online: boolean;
}): { text: string; tone: "fresh" | "aging" | "failed" | "offline" } {
  const at = formatTime(updatedAt);
  if (!online) return { text: `You’re offline. Figures from ${at}.`, tone: "offline" };
  if (failed)
    return { text: `Couldn’t refresh. Figures from ${at}. Trying again.`, tone: "failed" };
  const minutes = Math.floor(Math.max(0, now - updatedAt) / 60_000);
  if (minutes < 1) return { text: "Updated just now", tone: "fresh" };
  return {
    text: `Updated ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`,
    tone: "aging",
  };
}

const toneClass = {
  fresh: "border border-brand-300 bg-white text-brand-900",
  aging: "border border-mist-300 bg-white text-ink-650",
  failed: "bg-gold-100 text-gold-800",
  offline: "bg-mist-100 text-ink-650",
} as const;

/** The small live-refresh indicator beside "Where the money went" (F3.7). */
export function LiveIndicator() {
  const { updatedAt, failed } = useLive();
  const online = useOnline();
  const now = useNow(15_000);
  const { text, tone } = liveIndicatorText({
    updatedAt,
    now: Math.max(now, updatedAt),
    failed,
    online,
  });
  return (
    <p
      role="status"
      className={cn(
        "inline-flex items-center gap-2 self-start rounded-full px-3.5 py-2 text-sm font-semibold",
        toneClass[tone],
      )}
    >
      {tone === "fresh" && (
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-brand-700 shadow-[0_0_0_4px_var(--color-brand-100)]"
        />
      )}
      {tone === "aging" && <span aria-hidden="true" className="size-2 rounded-full bg-ink-400" />}
      {tone === "failed" && <RefreshCwIcon aria-hidden="true" className="size-[15px]" />}
      {tone === "offline" && <CloudOffIcon aria-hidden="true" className="size-[15px]" />}
      {text}
    </p>
  );
}
