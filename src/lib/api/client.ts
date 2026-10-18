import type { z } from "zod";
import { publicEnv } from "@/lib/env";
import {
  apiErrorBody,
  campaignDetailResponse,
  campaignListResponse,
  currentUserResponse,
  organisationProfileResponse,
} from "./schemas";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

/**
 * Typed fetch wrapper for the Amanah backend. Validates every response with Zod and turns
 * error bodies into ApiError. The backend is a separate service (ADR-003).
 */
export async function apiFetch<T extends z.ZodType>(
  path: string,
  schema: T,
  { body, headers, ...init }: RequestOptions = {},
): Promise<z.infer<T>> {
  const response = await fetch(new URL(path, publicEnv.NEXT_PUBLIC_API_BASE_URL), {
    ...init,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const parsed = apiErrorBody.safeParse(json);
    throw parsed.success
      ? new ApiError(response.status, parsed.data.error.code, parsed.data.error.message)
      : new ApiError(response.status, "UNKNOWN", `Request failed with status ${response.status}`);
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    throw new ApiError(response.status, "CONTRACT_MISMATCH", `Unexpected response for ${path}`);
  }
  return result.data;
}

export type CampaignListParams = { city?: string; organisationId?: string; page?: number };

export const api = {
  listCampaigns: (params: CampaignListParams = {}, init?: RequestInit) => {
    const query = new URLSearchParams();
    if (params.city) query.set("city", params.city);
    if (params.organisationId) query.set("organisationId", params.organisationId);
    if (params.page && params.page > 1) query.set("page", String(params.page));
    const qs = query.toString();
    return apiFetch(`/api/campaigns${qs ? `?${qs}` : ""}`, campaignListResponse, init);
  },
  getCampaign: (slug: string, init?: RequestInit) =>
    apiFetch(`/api/campaigns/${encodeURIComponent(slug)}`, campaignDetailResponse, init),
  getOrganisation: (id: string, init?: RequestInit) =>
    apiFetch(`/api/organisations/${encodeURIComponent(id)}`, organisationProfileResponse, init),
  getMe: () => apiFetch("/api/me", currentUserResponse),
};
