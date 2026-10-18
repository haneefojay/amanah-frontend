import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "@/test/axe";
import { Button } from "./button";

describe("Button", () => {
  it("is a real button that responds to keyboard and click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Give ₦5,000</Button>);
    const button = screen.getByRole("button", { name: "Give ₦5,000" });
    await user.click(button);
    button.focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("blocks double submits while loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Pay now
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Pay now" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("respects disabled", () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("is touch-sized by default (44px) and supports the gold call-to-action variant", () => {
    render(<Button variant="gold">Browse campaigns</Button>);
    const button = screen.getByRole("button", { name: "Browse campaigns" });
    expect(button.className).toContain("h-11");
    expect(button).toHaveAttribute("data-variant", "gold");
  });

  it("can render as a link", async () => {
    const { container } = render(
      <Button asChild>
        <a href="/campaigns">See campaigns</a>
      </Button>,
    );
    expect(screen.getByRole("link", { name: "See campaigns" })).toHaveAttribute(
      "href",
      "/campaigns",
    );
    await expectNoA11yViolations(container);
  });
});
