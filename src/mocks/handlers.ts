import { http, HttpResponse } from "msw";
import type { UserRole } from "@/lib/api/schemas";
import { campaignListBody, campaigns, PAGE_SIZE, publicCampaigns, usersByRole } from "./fixtures";

function mockRole(): UserRole {
  const role = typeof process !== "undefined" ? process.env.MOCK_ROLE : undefined;
  return role === "WITNESS" || role === "PLATFORM_ADMIN" ? role : "ORG_ADMIN";
}

/**
 * Mock implementations of the draft API contract (src/lib/api/schemas.ts). Used by:
 *  - unit/component tests via src/mocks/node.ts
 *  - local development via `npm run mock:api` (scripts/mock-api.ts)
 * Add a handler here whenever a frontend feature needs an endpoint the backend has not shipped.
 */
export const handlers = [
  // Signed-in staff member. Run `MOCK_ROLE=WITNESS npm run mock:api` to try another role.
  http.get("*/api/me", () => HttpResponse.json({ data: usersByRole[mockRole()] })),

  // Public list (B5.1): live and recently completed only, filtered by city and organisation.
  http.get("*/api/campaigns", ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get("city");
    const organisationId = url.searchParams.get("organisationId");
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const matching = publicCampaigns.filter(
      (c) => (!city || c.city === city) && (!organisationId || c.organisationId === organisationId),
    );
    const totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
    const body = campaignListBody(matching.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), {
      page,
      total: matching.length,
      totalPages,
    });
    return HttpResponse.json(body);
  }),

  http.get("*/api/campaigns/:slug", ({ params }) => {
    const campaign = campaigns.find((c) => c.slug === params.slug);
    return campaign
      ? HttpResponse.json({ data: campaign })
      : HttpResponse.json(
          { error: { code: "NOT_FOUND", message: "Campaign not found" } },
          { status: 404 },
        );
  }),
];
