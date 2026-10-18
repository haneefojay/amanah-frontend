import { screen, within } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import type { CampaignSummary } from "@/lib/api/schemas";
import { campaigns } from "@/mocks/fixtures";
import { server } from "@/mocks/node";
import { expectNoA11yViolations } from "@/test/axe";
import { renderWithProviders } from "@/test/render";
import { pickCampaigns, RaisingNow } from "./raising-now";

const fixture = (over: Partial<CampaignSummary>): CampaignSummary => ({
  ...campaigns[0]!,
  ...over,
});

describe("pickCampaigns", () => {
  it("shows live campaigns first, then funded ones, at most three, never drafts or closed", () => {
    const list = [
      fixture({ id: "a", status: "FUNDED" }),
      fixture({ id: "b", status: "DRAFT" }),
      fixture({ id: "c", status: "LIVE" }),
      fixture({ id: "d", status: "CLOSED" }),
      fixture({ id: "e", status: "LIVE" }),
      fixture({ id: "f", status: "LIVE" }),
    ];
    expect(pickCampaigns(list).map((c) => c.id)).toEqual(["c", "e", "f"]);
  });
});

describe("RaisingNow", () => {
  it("shows a card per campaign from the API", async () => {
    const { container } = renderWithProviders(<RaisingNow />);
    const list = await screen.findByRole("list", { name: "Campaigns raising now" });
    const cards = within(list).getAllByRole("article");
    expect(cards).toHaveLength(3);
    const food = screen.getByRole("article", { name: "Ramadan food drive" });
    expect(within(food).getByText("₦200,000 to go")).toBeInTheDocument();
    expect(within(food).getByRole("link", { name: /Give to this campaign/ })).toHaveAttribute(
      "href",
      "/campaigns/ramadan-food-drive-offa",
    );
    const borehole = screen.getByRole("article", { name: "Borehole for the Islamiyya school" });
    expect(within(borehole).getByText("Target reached. Donations closed.")).toBeInTheDocument();
    expect(
      within(borehole).getByRole("link", { name: /See where the money went/ }),
    ).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it("shows nothing when the API fails, so no placeholder campaigns appear", async () => {
    server.use(http.get("*/api/campaigns", () => HttpResponse.json({}, { status: 503 })));
    const { container } = renderWithProviders(<RaisingNow />);
    await new Promise((r) => setTimeout(r, 50));
    expect(container).toBeEmptyDOMElement();
  });

  it("shows nothing when there are no live or funded campaigns", async () => {
    server.use(
      http.get("*/api/campaigns", () =>
        HttpResponse.json({ data: [fixture({ status: "CLOSED" })] }),
      ),
    );
    const { container } = renderWithProviders(<RaisingNow />);
    await new Promise((r) => setTimeout(r, 50));
    expect(container).toBeEmptyDOMElement();
  });

  it("falls back to an arch outline when a campaign has no cover photo", async () => {
    server.use(
      http.get("*/api/campaigns", () =>
        HttpResponse.json({ data: [fixture({ coverImageUrl: null })] }),
      ),
    );
    renderWithProviders(<RaisingNow />);
    const card = await screen.findByRole("article", { name: "Ramadan food drive" });
    expect(card.querySelector("img")).toBeNull();
  });
});
