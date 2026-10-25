import { getResponse } from "msw";
import { handlers } from "@/mocks/handlers";

/**
 * Same-origin mock API for preview deployments, until the real backend ships.
 *
 * Serves the MSW handlers (src/mocks/handlers.ts) over HTTP, the same way scripts/mock-api.ts
 * does locally. Enabled only when ENABLE_MOCK_API=1 (a server-only env var), so production
 * cannot accidentally serve fixtures once the backend is live: unset it and this route 404s.
 *
 * To use it on Vercel: set ENABLE_MOCK_API=1 and NEXT_PUBLIC_API_BASE_URL to the deployment's
 * own URL, then redeploy (NEXT_PUBLIC_* values are inlined at build time).
 */
export const dynamic = "force-dynamic";

async function handle(request: Request): Promise<Response> {
  if (process.env.ENABLE_MOCK_API !== "1") {
    return Response.json(
      { error: { code: "NOT_FOUND", message: "Mock API is disabled" } },
      { status: 404 },
    );
  }

  const response = await getResponse(handlers, request);
  if (!response) {
    const { pathname } = new URL(request.url);
    return Response.json(
      { error: { code: "NOT_MOCKED", message: `${request.method} ${pathname}` } },
      { status: 501 },
    );
  }
  return response;
}

export { handle as GET, handle as POST, handle as PATCH, handle as PUT, handle as DELETE };
