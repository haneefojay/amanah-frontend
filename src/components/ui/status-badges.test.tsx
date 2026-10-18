import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { CampaignStatus } from "@/lib/api/schemas";
import { campaignStatusMessage, NEARLY_REACHED_MESSAGE } from "@/lib/status";
import { CampaignStatusBadge, ItemStatusBadge, VerifiedBadge } from "./status-badges";

describe("CampaignStatusBadge", () => {
  it.each<[CampaignStatus, string]>([
    ["DRAFT", "Draft"],
    ["PENDING_REVIEW", "In review"],
    ["REJECTED", "Rejected"],
    ["LIVE", "Live"],
    ["FUNDED", "Target reached"],
    ["CLOSED", "Closed"],
    ["COMPLETED", "Completed"],
  ])("labels %s as %s", (status, label) => {
    render(<CampaignStatusBadge status={status} />);
    const badge = screen.getByText(label);
    expect(badge).toHaveAttribute("data-status", status);
  });

  it("uses the exact spec sentences (§4.2)", () => {
    expect(campaignStatusMessage.FUNDED).toBe("Target reached. Donations closed.");
    expect(NEARLY_REACHED_MESSAGE).toBe(
      "Target nearly reached. Pending payments are being processed.",
    );
  });
});

describe("ItemStatusBadge", () => {
  it.each([
    ["NEEDED", "Needed", "bg-sand-300"],
    ["PURCHASED", "Purchased", "bg-gold-100"],
    ["DELIVERED", "Delivered", "bg-brand-100"],
    ["DISPUTED", "Disputed", "bg-danger-100"],
  ] as const)("shows %s as %s", (status, label, tone) => {
    render(<ItemStatusBadge status={status} />);
    expect(screen.getByText(label).className).toContain(tone);
  });
});

describe("VerifiedBadge", () => {
  it("reads as Verified", () => {
    render(<VerifiedBadge />);
    expect(screen.getByText("Verified")).toBeInTheDocument();
  });
});
