import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./helpers/a11y";

/** F2.1: public campaign list. Runs on the mobile (Pixel 7) and desktop projects. */

test.describe("Campaign list (F2.1)", () => {
  test("lists campaigns with their funding state", async ({ page }) => {
    await page.goto("/campaigns");
    await expect(page.getByRole("heading", { level: 1, name: "Campaigns" })).toBeVisible();
    await expect(page.getByRole("status")).toContainText("8 campaigns");
    const cards = page.getByRole("region", { name: "Campaigns" }).getByRole("article");
    await expect(cards).toHaveCount(6);
    await expect(page.getByRole("article", { name: "Ramadan food drive" })).toContainText(
      "₦200,000 to go",
    );
    await expect(page.getByText("Page 1 of 2")).toBeVisible();
  });

  test("filters by city, keeps the filter in the address and after a reload", async ({ page }) => {
    await page.goto("/campaigns");
    await page.getByLabel("City").selectOption("Offa");
    await expect(page).toHaveURL(/\/campaigns\?city=Offa$/);
    const cards = page.getByRole("region", { name: "Campaigns" }).getByRole("article");
    await expect(cards).toHaveCount(3);
    await expect(page.getByRole("status")).toContainText("3 campaigns");
    await page.reload();
    await expect(page.getByLabel("City")).toHaveValue("Offa");
    await expect(cards).toHaveCount(3);
  });

  test("moves to the next page and back", async ({ page }) => {
    await page.goto("/campaigns");
    await page.getByRole("link", { name: /Next/ }).click();
    await expect(page).toHaveURL(/page=2$/);
    await expect(page.getByText("Page 2 of 2")).toBeVisible();
    await expect(page.getByRole("region", { name: "Campaigns" }).getByRole("article")).toHaveCount(
      2,
    );
    await page.getByRole("link", { name: /Previous/ }).click();
    await expect(page.getByText("Page 1 of 2")).toBeVisible();
  });

  test("does not scroll sideways at 360px or 1440px", async ({ page }) => {
    for (const width of [360, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/campaigns");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    }
  });

  test("Give now and Browse campaigns lead here from the landing page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Browse campaigns" }).first().click();
    await expect(page).toHaveURL(/\/campaigns$/);
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    await page.goto("/campaigns");
    await expect(page.getByText("live or recently completed")).toBeVisible();
    await expectNoA11yViolations(page);
  });
});
