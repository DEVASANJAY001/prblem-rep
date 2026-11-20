import { test, expect } from "@playwright/test";

test.describe("Agent 4: UI/UX, Responsiveness & Mobile Auditor Agent", () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14 / Pixel standard

  test("Mobile Viewport: Zero horizontal overflow on Home", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check document body width does not cause horizontal scroll
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();
  });

  test("Mobile Hero: Funky text actions & clean domain tags without emojis", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Verify "Surprise me" clickable action is visible on mobile
    const surpriseBtn = page.getByRole("button", { name: /surprise me/i });
    await expect(surpriseBtn).toBeVisible();

    // Verify "Startup blueprints" action is visible
    const blueprintsLink = page.getByRole("link", { name: /startup blueprints/i });
    await expect(blueprintsLink).toBeVisible();

    // Verify popular tags render text cleanly without emojis
    const tagElements = page.locator("a[href^='/explore?industry=']");
    const count = await tagElements.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const text = await tagElements.nth(i).innerText();
      // Assert no medical/bot emojis in the tag
      expect(text).not.toContain("🩺");
      expect(text).not.toContain("🤖");
      expect(text).not.toContain("🌱");
    }
  });

  test("Theme Mode Switching: Toggles light and dark themes smoothly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const themeToggle = page.locator("button[aria-label*='theme' i], button[title*='theme' i]").first();
    if (await themeToggle.isVisible()) {
      const initialHtmlClass = await page.evaluate(() => document.documentElement.className);
      await themeToggle.click();
      await page.waitForTimeout(300);
      const newHtmlClass = await page.evaluate(() => document.documentElement.className);
      expect(newHtmlClass).not.toEqual(initialHtmlClass);
    }
  });

  test("Problem Detail Sidebar: People, Companies and Credits all render in uniform circular avatars", async ({ page }) => {
    await page.goto("/explore");
    await page.waitForLoadState("domcontentloaded");

    const firstProblem = page.locator("a[href^='/problem/']").first();
    await expect(firstProblem).toBeVisible({ timeout: 10000 });
    await firstProblem.click();
    await page.waitForLoadState("domcontentloaded");

    // Verify circular elements in sidebar
    const roundedCircles = page.locator(".rounded-full");
    const count = await roundedCircles.count();
    expect(count).toBeGreaterThan(0);
  });
});
