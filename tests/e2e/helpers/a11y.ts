import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

/** Full axe scan of the current page, including colour contrast (F1.6). */
export async function expectNoA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
}
