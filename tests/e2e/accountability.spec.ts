import { expect, test } from "@playwright/test";
import { expectNoA11yViolations } from "./helpers/a11y";

/** F3: the accountability section of the campaign page. Runs on the mobile and desktop projects. */

test.describe("Items and witness confirmation (F3.2)", () => {
  test("shows who confirmed a delivery and a dispute with its comment", async ({ page }) => {
    await page.goto("/campaigns/school-supplies-40-orphans");
    await expect(
      page.locator('text="Confirmed by Alhaja Rukayat Adebayo" >> visible=true').first(),
    ).toBeVisible();
    await expect(
      page.locator('text="Disputed by Alhaja Rukayat Adebayo" >> visible=true'),
    ).toBeVisible();
    await expect(page.locator("text=/Only 24 of the 30 bags/ >> visible=true")).toBeVisible();
    await expectNoA11yViolations(page);
  });
});
