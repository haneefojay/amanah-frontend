/**
 * Standalone mock backend for frontend development: serves the MSW handlers over real HTTP so
 * both Server Components and the browser can call it. Run: npm run mock:api
 */
import { createServer } from "node:http";
import { getResponse } from "msw";
import { handlers } from "../src/mocks/handlers";

const port = Number(process.env.MOCK_API_PORT ?? 4000);
const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const cors = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
};

createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, cors).end();
    return;
  }
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const body = chunks.length && req.method !== "GET" ? Buffer.concat(chunks) : undefined;

  const request = new Request(new URL(req.url ?? "/", `http://localhost:${port}`), {
    method: req.method,
    headers: req.headers as Record<string, string>,
    body,
  });
  const response = await getResponse(handlers, request);

  if (!response) {
    res
      .writeHead(501, { ...cors, "Content-Type": "application/json" })
      .end(JSON.stringify({ error: { code: "NOT_MOCKED", message: `${req.method} ${req.url}` } }));
    return;
  }
  res.writeHead(response.status, { ...Object.fromEntries(response.headers), ...cors });
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(port, () => console.log(`Mock API listening on http://localhost:${port}`));
