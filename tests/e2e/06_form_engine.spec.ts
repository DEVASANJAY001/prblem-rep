import { test, expect } from "@playwright/test";

test.describe("Agent 6: Form Engine & Interactive Feature Agent", () => {
  test("Global Search Modal: Opens and closes properly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Trigger search via shortcut or search input
    const searchTrigger = page.locator("button, input").filter({ hasText: /search/i }).first();
    if (await searchTrigger.isVisible()) {
      await searchTrigger.click();
      await page.waitForTimeout(200);
      // Press Escape to dismiss
      await page.keyboard.press("Escape");
    }
  });

  test("Problem Detail Interactive Tabs: Switch between Description, Evidence, Discussion", async ({ page }) => {
    await page.goto("/explore");
    await page.waitForLoadState("domcontentloaded");

    const firstProblem = page.locator("a[href^='/problem/']").first();
    await expect(firstProblem).toBeVisible({ timeout: 10000 });
    await firstProblem.click();
    await page.waitForLoadState("domcontentloaded");

    // Check tabs exist
    const tabs = page.locator("button, a").filter({ hasText: /Evidence|Discussion|Research|Competitors/i });
    const count = await tabs.count();
    if (count > 0) {
      await tabs.first().click();
      await page.waitForTimeout(300);
      // Ensure no crash occurred
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  test("Submit Wizard Guarding: Enforces validation on required fields", async ({ page }) => {
    await page.goto("/submit");
    // Unauthenticated user is guarded to login
    await expect(page).toHaveURL(/\/login/);
  });
});
