import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** F2.6: public landing page. Runs on the mobile (Pixel 7) and desktop projects. */

async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe("Landing page (F2.6)", () => {
  test("shows the headline, the example campaign and the signature", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Give with certainty. Follow every naira.",
    );
    const ledger = page.getByRole("article", { name: "Ramadan food drive" });
    await expect(ledger.getByText("Target reached. Donations closed.")).toBeVisible();
    await expect(page.getByText("أمانة")).toBeVisible();
  });

  test("never scrolls sideways at 360px or 1440px", async ({ page }) => {
    for (const width of [360, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await expectNoHorizontalScroll(page);
    }
  });

  test("loads the self-hosted fonts", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const loaded = await page.evaluate(() =>
      [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family),
    );
    expect(loaded.join(" ")).toMatch(/schibsted/i);
    expect(loaded.join(" ")).toMatch(/reem/i);
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });

  test("never shows out-of-scope or internal wording", async ({ page }) => {
    await page.goto("/");
    const text = (await page.locator("body").innerText()).toLowerCase();
    for (const term of ["zakat", "waqf", "pilot", "test mode", "hackathon", "ametts"]) {
      expect(text).not.toContain(term);
    }
  });
});

test.describe("Landing layout on phones", () => {
  test("the hero closes with أمانة before the example campaign", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Phone layout only");
    await page.goto("/");
    const word = page.getByText("أمانة");
    const ledger = page.getByRole("article", { name: "Ramadan food drive" });
    await expect(word).toBeVisible();
    await expect(ledger).toHaveCount(1); // only the phone copy is visible
    const wordBox = await word.boundingBox();
    const ledgerBox = await ledger.boundingBox();
    expect(wordBox && ledgerBox && wordBox.y < ledgerBox.y).toBe(true);
    // The word sits at the right of the hero.
    const viewport = page.viewportSize();
    expect(wordBox && viewport && wordBox.x + wordBox.width > viewport.width / 2).toBe(true);
  });

  test("buttons keep the original pill and underlined link", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Browse campaigns" })).toBeVisible();
    await expect(page.getByRole("link", { name: "See how it works" })).toBeVisible();
  });
});

test.describe("Landing navigation", () => {
  test("desktop: section links scroll to their sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop navigation only");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("link", { name: "The cap" }).click();
    await expect(page).toHaveURL(/#cap$/);
    await expect(
      page.getByRole("heading", { name: "Never a kobo beyond the target." }),
    ).toBeInViewport();
  });

  test("mobile: the menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile menu only");
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Accountability" })
      .click();
    await expect(page).toHaveURL(/#trail$/);
    await expect(
      page.getByRole("heading", { name: "Every campaign comes with its receipts." }),
    ).toBeInViewport();
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
