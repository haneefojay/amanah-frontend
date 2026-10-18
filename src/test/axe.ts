import axe from "axe-core";
import { expect } from "vitest";

/**
 * Runs axe on rendered markup and fails with a readable list of violations (F1.6).
 * jsdom has no layout, so colour-contrast is checked in Playwright instead
 * (tests/e2e/helpers/a11y.ts). "region" is off because components render outside a page.
 */
export async function expectNoA11yViolations(container: Element) {
  const results = await axe.run(container, {
    rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
  });
  expect(
    results.violations.map(
      (v) => `${v.id}: ${v.help} -> ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
    ),
  ).toEqual([]);
}
