import { expect, test } from "@playwright/test";

test.describe("PWA foundation (F0.3)", () => {
  test("home page renders the brand and sample progress", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Give with trust");
    await expect(page.getByRole("progressbar", { name: "Raised so far" })).toHaveAttribute(
      "aria-valuenow",
      "60",
    );
  });

  test("serves a valid web app manifest", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    expect(res.ok()).toBe(true);
    const manifest = await res.json();
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons.length).toBeGreaterThanOrEqual(3);
  });

  test("registers the service worker and falls back offline", async ({ page, context }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    // Wait until the worker controls the page so navigations go through it.
    await page
      .waitForFunction(() => navigator.serviceWorker.controller !== null, null, {
        timeout: 15_000,
      })
      .catch(async () => page.reload());

    await context.setOffline(true);
    await page.goto("/a-page-never-visited");
    await expect(page.getByRole("heading", { name: "You are offline" })).toBeVisible();
    await context.setOffline(false);
  });
});
