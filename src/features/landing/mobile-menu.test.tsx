import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileMenu } from "./mobile-menu";

describe("MobileMenu", () => {
  it("starts closed with the panel hidden", () => {
    render(<MobileMenu registerHref="#organisations" />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Main" })).not.toBeInTheDocument();
  });

  it("opens to show the section links and the registration link", async () => {
    const user = userEvent.setup();
    render(<MobileMenu registerHref="#organisations" />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toBeVisible();
    expect(screen.getByRole("link", { name: "The cap" })).toHaveAttribute("href", "#cap");
    expect(screen.getByRole("link", { name: "Register your organisation" })).toHaveAttribute(
      "href",
      "#organisations",
    );
  });

  it("closes when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<MobileMenu registerHref="#organisations" />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("link", { name: "How it works" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes on Escape and returns focus to the menu button", async () => {
    const user = userEvent.setup();
    render(<MobileMenu registerHref="#organisations" />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.keyboard("{Escape}");
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });
});
