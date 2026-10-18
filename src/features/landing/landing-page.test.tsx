import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LandingPage } from "./landing-page";
import { navLinks } from "./nav-links";

describe("LandingPage", () => {
  it("leads with the approved headline", () => {
    render(<LandingPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Give with certainty. Follow every naira.",
    );
  });

  it("renders every section of the approved design", () => {
    render(<LandingPage />);
    for (const name of [
      "Ramadan food drive",
      "Generosity runs on trust. Trust needs proof.",
      "From need to delivery, in the open",
      "Never a kobo beyond the target.",
      "Every campaign comes with its receipts.",
      "Everyone in the chain of trust has a part",
      "Doing honest work? Let it show.",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(5);
  });

  it("formats every amount from kobo with the exact spec copy for a funded campaign", () => {
    render(<LandingPage />);
    const ledger = screen.getByRole("article", { name: "Ramadan food drive" });
    expect(within(ledger).getByText("₦500,000")).toBeInTheDocument();
    expect(within(ledger).getByText("of ₦500,000 target")).toBeInTheDocument();
    expect(within(ledger).getByText("₦420,000")).toBeInTheDocument();
    expect(within(ledger).getAllByText("₦80,000")).toHaveLength(2); // dates item and balance held
    expect(within(ledger).getByText("Target reached. Donations closed.")).toBeInTheDocument();
    expect(within(ledger).getByRole("progressbar", { name: "Raised" })).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    expect(within(ledger).getByText("Example campaign")).toBeInTheDocument();
  });

  it("describes the cap illustration in text for screen readers", () => {
    render(<LandingPage />);
    expect(
      screen.getByText(/A second donor enters ₦300,000 and is offered ₦200,000/),
    ).toBeInTheDocument();
  });

  it("points every navigation link at a section that exists", () => {
    const { container } = render(<LandingPage />);
    for (const link of navLinks) {
      expect(container.querySelector(link.href)).not.toBeNull();
    }
  });

  it("marks the Arabic signature as Arabic, right to left, in both the phone and wide layouts", () => {
    render(<LandingPage />);
    const words = screen.getAllByText("أمانة");
    expect(words).toHaveLength(2); // one shown on phones, one on wider screens
    for (const word of words) {
      expect(word).toHaveAttribute("lang", "ar");
      expect(word).toHaveAttribute("dir", "rtl");
    }
  });

  it("hides the contact button when no contact email is configured", () => {
    render(<LandingPage contactEmail={undefined} />);
    expect(screen.queryByRole("link", { name: "Talk to the team" })).not.toBeInTheDocument();
    const sectionCta = within(
      screen.getByRole("region", { name: "Doing honest work? Let it show." }),
    ).getByRole("link", { name: "Register your organisation" });
    expect(sectionCta).toHaveAttribute("href", "#organisations");
  });

  it("uses the contact email for registration and contact when configured", () => {
    render(<LandingPage contactEmail="team@example.org" />);
    expect(screen.getByRole("link", { name: "Talk to the team" })).toHaveAttribute(
      "href",
      "mailto:team@example.org",
    );
    const sectionCta = within(
      screen.getByRole("region", { name: "Doing honest work? Let it show." }),
    ).getByRole("link", { name: "Register your organisation" });
    expect(sectionCta.getAttribute("href")).toMatch(/^mailto:team@example\.org\?subject=/);
  });

  it("never shows internal or pilot wording on the public page", () => {
    const { container } = render(<LandingPage />);
    expect(container.textContent).not.toMatch(/pilot|test mode|hackathon|AMETTSA|sample/i);
  });
});
