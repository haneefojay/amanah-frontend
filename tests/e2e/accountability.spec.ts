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

test.describe("Expenses and receipts (F3.3)", () => {
  test("opens a receipt full size and closes it with Escape", async ({ page }) => {
    await page.goto("/campaigns/ramadan-food-drive-offa");
    const section = page.getByRole("region", { name: "Where the money went" });
    await expect(section.getByRole("heading", { name: "Expenses" })).toBeVisible();
    await expect(section.locator('text="Total spent" >> visible=true')).toBeVisible();
    const thumbnail = section
      .getByRole("button", { name: "View the receipt for Rice, 5 bags of 50 kg" })
      .locator("visible=true");
    await thumbnail.click();
    const dialog = page.getByRole("dialog", { name: "Receipt: Rice, 5 bags of 50 kg" });
    await expect(dialog).toBeVisible();
    const receipt = dialog.getByRole("img", { name: /Receipt from Musa & Sons Grains/ });
    await expect(receipt).toBeVisible();
    await expect
      .poll(() => receipt.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    await expectNoA11yViolations(page);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(thumbnail).toBeFocused();
  });

  test("shows the empty state when nothing has been spent", async ({ page }) => {
    await page.goto("/campaigns/quran-learning-materials");
    await expect(
      page.getByText("No spending yet. Each purchase will appear here with its receipt."),
    ).toBeVisible();
  });
});
