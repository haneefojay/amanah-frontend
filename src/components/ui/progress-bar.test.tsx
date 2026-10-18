import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "./progress-bar";

describe("ProgressBar", () => {
  it("exposes accessible progress", () => {
    render(<ProgressBar value={30_000_000} max={50_000_000} label="Raised so far" />);
    const bar = screen.getByRole("progressbar", { name: "Raised so far" });
    expect(bar).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByText("60%")).toBeInTheDocument();
  });
});
