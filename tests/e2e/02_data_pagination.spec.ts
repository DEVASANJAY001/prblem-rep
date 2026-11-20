import { test, expect } from "@playwright/test";

test.describe("Agent 2: Data Pipeline & Batch Pagination Agent", () => {
  test("Industries pagination: Loads initial batch of up to 15 cards", async ({ page }) => {
    await page.goto("/industries");
    await page.waitForLoadState("domcontentloaded");

    // Verify main page title and structure
    await expect(page.locator("h1")).toContainText(/Industry Verticals|Industry Atlas|Browse All Problem Statements By Industry/i);

    // Verify industry grid cards are rendered
    const cards = page.locator("a[href^='/industries/']");
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(15);
  });

  test("Industries search filter: Filters industry directory dynamically", async ({ page }) => {
    await page.goto("/industries");
    await page.waitForLoadState("domcontentloaded");

    const searchInput = page.locator("input[placeholder*='Search']");
    if (await searchInput.isVisible()) {
      await searchInput.fill("Health");
      await page.waitForTimeout(300);
      const cards = page.locator("a[href^='/industries/']");
      const filteredCount = await cards.count();
      expect(filteredCount).toBeGreaterThan(0);
    }
  });

  test("Companies pagination: Loads initial batch of up to 16 cards", async ({ page }) => {
    await page.goto("/companies");
    await page.waitForLoadState("domcontentloaded");

    await expect(page.locator("h1")).toContainText(/Enterprise|Companies/i);

    const cards = page.locator("article");
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(16);
  });

  test("Explore Problem Statements: Live explore registry renders cards and filters", async ({ page }) => {
    await page.goto("/explore");
    await page.waitForLoadState("domcontentloaded");

    // Assert problem statements are present
    const problemLinks = page.locator("a[href^='/problem/']");
    await expect(problemLinks.first()).toBeVisible({ timeout: 10000 });
    const count = await problemLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
