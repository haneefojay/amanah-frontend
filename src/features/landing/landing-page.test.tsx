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

  it("renders every section of the approved design, in order", () => {
    render(<LandingPage />);
    const names = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(names).toEqual([
      "Ramadan food drive",
      "Most giving ends at the payment. On Amanah, it ends at the delivery.",
      "Every campaign comes with its receipts.",
      "From need to delivery, in the open",
      "Never a kobo beyond the target.",
      "Everyone in the chain of trust has a part",
      "Doing honest work? Let it show.",
    ]);
  });

  it("shows the hero's three trust points", () => {
    render(<LandingPage />);
    for (const point of [
      "Fixed targets, never exceeded",
      "Receipts for every purchase",
      "Delivery confirmed by a witness",
    ]) {
      expect(screen.getByText(point)).toBeInTheDocument();
    }
  });

  it("formats the example campaign from kobo, with the exact spec copy for a funded campaign", () => {
    render(<LandingPage />);
    const card = screen.getByRole("article", { name: "Ramadan food drive" });
    expect(within(card).getByText("Example campaign")).toBeInTheDocument();
    expect(within(card).getByText("₦500,000")).toBeInTheDocument();
    expect(within(card).getByText("of ₦500,000")).toBeInTheDocument();
    expect(within(card).getByText("Target reached. Donations closed.")).toBeInTheDocument();
    expect(within(card).getByRole("progressbar", { name: "Raised" })).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    const items = within(card).getByRole("list", { name: "Items and their status" });
    expect(within(items).getAllByRole("listitem")).toHaveLength(3);
  });

  it("shows raised, spent and balance held that add up", () => {
    render(<LandingPage />);
    const section = screen.getByRole("region", { name: "Every campaign comes with its receipts." });
    expect(within(section).getByText("₦500,000")).toBeInTheDocument();
    expect(within(section).getByText("Spent").nextSibling).toHaveTextContent("₦420,000");
    expect(within(section).getByText("Balance held").nextSibling).toHaveTextContent("₦80,000");
  });

  it("numbers the five steps in order", () => {
    render(<LandingPage />);
    const section = screen.getByRole("region", { name: "From need to delivery, in the open" });
    const steps = within(section).getAllByRole("heading", { level: 3 });
    expect(steps.map((s) => s.textContent)).toEqual([
      "Verified first",
      "Itemised needs",
      "You give",
      "Spending, with proof",
      "A witness confirms",
    ]);
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

  it("marks أمانة as Arabic, right to left, in the hero arch and the footer", () => {
    render(<LandingPage />);
    const words = screen.getAllByText("أمانة");
    expect(words).toHaveLength(2);
    for (const word of words) {
      expect(word).toHaveAttribute("lang", "ar");
      expect(word).toHaveAttribute("dir", "rtl");
    }
    expect(screen.getByText(/the trust placed in your care/)).toBeInTheDocument();
  });

  it("hides the contact links when no contact email is configured", () => {
    render(<LandingPage contactEmail={undefined} />);
    expect(screen.queryByRole("link", { name: "Talk to the team" })).not.toBeInTheDocument();
    const sectionCta = within(
      screen.getByRole("region", { name: "Doing honest work? Let it show." }),
    ).getByRole("link", { name: "Register your organisation" });
    expect(sectionCta).toHaveAttribute("href", "#organisations");
  });

  it("uses the contact email for registration and contact when configured", () => {
    render(<LandingPage contactEmail="team@example.org" />);
    const talk = screen.getAllByRole("link", { name: "Talk to the team" });
    expect(talk).toHaveLength(2); // the organisations panel and the footer
    for (const link of talk) expect(link).toHaveAttribute("href", "mailto:team@example.org");
    const sectionCta = within(
      screen.getByRole("region", { name: "Doing honest work? Let it show." }),
    ).getByRole("link", { name: "Register your organisation" });
    expect(sectionCta.getAttribute("href")).toMatch(/^mailto:team@example\.org\?subject=/);
  });

  it("groups the footer links under Give, Organisations and Trust", () => {
    render(<LandingPage />);
    const footer = screen.getByRole("contentinfo");
    for (const name of ["Give", "Organisations", "Trust"]) {
      expect(within(footer).getByRole("navigation", { name })).toBeInTheDocument();
    }
  });

  it("never shows internal or pilot wording on the public page", () => {
    const { container } = render(<LandingPage />);
    expect(container.textContent).not.toMatch(/pilot|test mode|hackathon|AMETTSA|sample/i);
    // No payment-provider names or technical terms either.
    expect(container.textContent).not.toMatch(
      /paystack|audit log|server|database|\bAPI\b|webhook|reservation|timestamp/i,
    );
  });
});
