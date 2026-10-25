// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { campaignListResponse } from "@/lib/api/schemas";
import { GET, POST } from "./route";

const BASE = "https://amanah.example";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("same-origin mock API route", () => {
  it("returns 404 when ENABLE_MOCK_API is not set", async () => {
    vi.stubEnv("ENABLE_MOCK_API", "");
    const response = await GET(new Request(`${BASE}/api/campaigns`));
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: { code: "NOT_FOUND", message: "Mock API is disabled" },
    });
  });

  it("serves the mock campaign list when enabled, matching the contract", async () => {
    vi.stubEnv("ENABLE_MOCK_API", "1");
    const response = await GET(new Request(`${BASE}/api/campaigns`));
    expect(response.status).toBe(200);
    expect(campaignListResponse.safeParse(await response.json()).success).toBe(true);
  });

  it("returns 501 NOT_MOCKED for an endpoint with no handler", async () => {
    vi.stubEnv("ENABLE_MOCK_API", "1");
    const response = await POST(new Request(`${BASE}/api/not-a-real-endpoint`, { method: "POST" }));
    expect(response.status).toBe(501);
    expect(await response.json()).toEqual({
      error: { code: "NOT_MOCKED", message: "POST /api/not-a-real-endpoint" },
    });
  });
});
