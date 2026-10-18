import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/mocks/node";
import { api, ApiError } from "./client";

describe("api client", () => {
  it("returns validated campaign data", async () => {
    const { data } = await api.listCampaigns();
    expect(data.length).toBeGreaterThan(0);
    expect(Number.isInteger(data[0]!.targetAmount)).toBe(true);
  });

  it("turns error bodies into ApiError", async () => {
    server.use(
      http.get("*/api/campaigns", () =>
        HttpResponse.json({ error: { code: "DOWN", message: "Maintenance" } }, { status: 503 }),
      ),
    );
    await expect(api.listCampaigns()).rejects.toMatchObject({ status: 503, code: "DOWN" });
  });

  it("rejects responses that break the contract", async () => {
    server.use(
      http.get("*/api/campaigns", () =>
        HttpResponse.json({ data: [{ id: "x", targetAmount: 10.5 }] }),
      ),
    );
    const error = await api.listCampaigns().catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).code).toBe("CONTRACT_MISMATCH");
  });
});
