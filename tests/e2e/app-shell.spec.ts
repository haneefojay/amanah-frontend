import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./helpers/a11y";

/** F1.4 app shell and F1.5 boundaries. */
test.describe("Staff app shell", () => {
  for (const [path, label, items] of [
    ["/org", "Organisation", ["Overview", "Campaigns", "Organisation"]],
    ["/witness", "Witness", ["Assigned", "History"]],
    ["/admin", "Admin", ["Verification", "Reviews", "Excess", "Audit log"]],
  ] as const) {
    test(`${path} uses the ${label} navigation`, async ({ page }) => {
      await page.goto(path);
      const nav = page.getByRole("navigation", { name: `${label} navigation` });
      await expect(nav.getByRole("link")).toHaveText([...items]);
      await expect(nav.getByRole("link", { name: items[0] })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await expectNoA11yViolations(page);
    });
  }

  test("navigates between sections and never scrolls sideways at 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/org");
    await page.getByRole("link", { name: "Campaigns" }).click();
    await expect(page).toHaveURL(/\/org\/campaigns$/);
    await expect(page.getByRole("heading", { level: 1, name: "Campaigns" })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("staff pages are not indexed by search engines", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});

test.describe("Boundaries", () => {
  test("unknown pages show the branded not-found page", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "We couldn't find that page" })).toBeVisible();
  });

  test("unknown staff pages are 404s too", async ({ page }) => {
    const res = await page.goto("/org/not-a-real-section");
    expect(res?.status()).toBe(404);
  });

  test("the component showcase is not available in production", async ({ page }) => {
    const res = await page.goto("/dev/ui");
    expect(res?.status()).toBe(404);
  });
});
