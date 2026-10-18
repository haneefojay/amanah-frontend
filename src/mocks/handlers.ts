import { http, HttpResponse } from "msw";
import type { UserRole } from "@/lib/api/schemas";
import { campaigns, usersByRole } from "./fixtures";

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

  http.get("*/api/campaigns", () => HttpResponse.json({ data: campaigns })),

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
