import { expect, test, type Page } from "@playwright/test";
import { expectNoA11yViolations } from "./helpers/a11y";

/** F2.6: public landing page. Runs on the mobile (Pixel 7) and desktop projects. */

async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe("Landing page (F2.6)", () => {
  test("shows the headline, the example campaign and the meaning of Amānah", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Give with certainty. Follow every naira.",
    );
    const ledger = page.getByRole("article", { name: "Ramadan food drive" });
    await expect(ledger.getByText("Target reached. Donations closed.")).toBeVisible();
    await expect(page.getByText("is the trust placed in your care")).toBeVisible();
  });

  test("desktop: the hero closes with أمانة", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop layout only");
    await page.goto("/");
    await expect(page.getByText("أمانة")).toBeVisible();
  });

  test("never scrolls sideways at 360px, 980px or 1440px", async ({ page }) => {
    for (const width of [360, 980, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await expectNoHorizontalScroll(page);
    }
  });

  test("loads the self-hosted fonts", async ({ page, isMobile }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const loaded = await page.evaluate(() =>
      [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family),
    );
    expect(loaded.join(" ")).toMatch(/schibsted/i);
    // The Arabic display face is only needed where أمانة shows (not on phones).
    if (!isMobile) expect(loaded.join(" ")).toMatch(/reem/i);
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    await page.goto("/");
    await expectNoA11yViolations(page);
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
  test("the hero leaves out أمانة and closes with the meaning sentence", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Phone layout only");
    await page.goto("/");
    await expect(page.getByText("أمانة")).toBeHidden();
    const meaning = page.getByText("is the trust placed in your care");
    const ledger = page.getByRole("article", { name: "Ramadan food drive" });
    await expect(meaning).toBeVisible();
    await expect(ledger).toHaveCount(1); // only the phone copy is visible
    const meaningBox = await meaning.boundingBox();
    const ledgerBox = await ledger.boundingBox();
    expect(meaningBox && ledgerBox && meaningBox.y < ledgerBox.y).toBe(true);
  });

  test("the two hero buttons share one line, with the meaning close below", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Phone layout only");
    for (const width of [360, 412]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const browse = await page.getByRole("link", { name: "Browse campaigns" }).boundingBox();
      const how = await page.getByRole("link", { name: "See how it works" }).boundingBox();
      const meaning = await page.getByText("is the trust placed in your care").boundingBox();
      expect(browse && how).toBeTruthy();
      if (!browse || !how || !meaning) return;
      expect(Math.abs(browse.y + browse.height / 2 - (how.y + how.height / 2))).toBeLessThan(4);
      expect(how.x + how.width).toBeLessThanOrEqual(width);
      expect(meaning.y - (browse.y + browse.height)).toBeLessThan(48);
    }
  });

  test("buttons keep the original pill and underlined link", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Browse campaigns" })).toBeVisible();
    await expect(page.getByRole("link", { name: "See how it works" })).toBeVisible();
  });
});

test.describe("Landing layout as a desktop site on a phone (980px)", () => {
  test.use({ viewport: { width: 980, height: 1400 }, isMobile: false, hasTouch: false });

  test("matches the desktop layout", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "For organisations" })).toBeHidden();
    // Section links and the register button sit on one line.
    const tops = await nav
      .getByRole("link")
      .evaluateAll((links) =>
        links
          .filter((l) => (l as HTMLElement).offsetParent !== null)
          .map((l) => l.getBoundingClientRect().top + l.getBoundingClientRect().height / 2),
      );
    expect(Math.max(...tops) - Math.min(...tops)).toBeLessThan(4);
    // The example campaign sits beside the headline, not under it.
    const heading = await page.getByRole("heading", { level: 1 }).boundingBox();
    const ledger = await page.getByRole("article", { name: "Ramadan food drive" }).boundingBox();
    expect(heading && ledger && ledger.x > heading.x + heading.width).toBe(true);
    expect(heading && ledger && ledger.y < heading.y + heading.height).toBe(true);
    await expect(page.getByText("أمانة")).toBeVisible();
    // The five steps share one row.
    const stepTops = await page
      .locator("#how ol > li")
      .evaluateAll((items) => items.map((i) => Math.round(i.getBoundingClientRect().top)));
    expect(stepTops).toHaveLength(5);
    expect(new Set(stepTops).size).toBe(1);
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
