import { http, HttpResponse } from "msw";
import { campaigns } from "./fixtures";

/**
 * Mock implementations of the draft API contract (src/lib/api/schemas.ts). Used by:
 *  - unit/component tests via src/mocks/node.ts
 *  - local development via `npm run mock:api` (scripts/mock-api.ts)
 * Add a handler here whenever a frontend feature needs an endpoint the backend has not shipped.
 */
export const handlers = [
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
