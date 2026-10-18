"use client";

import { Share2Icon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  /** "icon" is the round button beside the give button; "full" is a wide button on its own. */
  variant: "icon" | "full";
};

const COPIED = "Campaign link copied. Paste it anywhere to share.";

/**
 * Shares the campaign with the phone's share sheet (Web Share API). Where that is missing, such
 * as most desktop browsers, it copies the link and says so.
 */
export function ShareButton({ title, variant }: Props) {
  async function share() {
    const url = `${window.location.origin}${window.location.pathname}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text: `${title} on Amanah`, url });
        return;
      } catch (error) {
        // Closing the share sheet is not a failure; anything else falls back to copying.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success(COPIED);
    } catch {
      toast.error("We couldn’t copy the link. Copy it from the address bar instead.");
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={variant === "icon" ? "Share this campaign" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-brand-300 bg-white font-bold text-brand-900 hover:border-brand-700",
        variant === "icon" ? "size-14 flex-none" : "min-h-12 px-6 text-base",
      )}
    >
      <Share2Icon aria-hidden="true" className={variant === "icon" ? "size-5" : "size-4"} />
      {variant === "full" && "Share this campaign"}
    </button>
  );
}
