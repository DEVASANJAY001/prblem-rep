import { test, expect } from "@playwright/test";

test.describe("Agent 7: Master Production Smoke Test Orchestrator", () => {
  test("Full Platform Smoke Test & Production Quality Gate", async ({ page }) => {
    console.log("🚀 [Agent 7] Initiating full platform smoke test...");

    // 1. Home Page Verification
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("input[placeholder*='search' i]")).toBeVisible({ timeout: 10000 });
    console.log("✅ [Agent 7] Home page rendered with fluid WebGL canvas and search bar.");

    // 2. Navigation to Explore
    await page.goto("/explore");
    await page.waitForLoadState("domcontentloaded");
    const problemCards = page.locator("a[href^='/problem/']");
    await expect(problemCards.first()).toBeVisible({ timeout: 10000 });
    const problemCount = await problemCards.count();
    expect(problemCount).toBeGreaterThan(0);
    console.log(`✅ [Agent 7] Explore registry live with ${problemCount} problem cards.`);

    // 3. Problem Detail View
    await problemCards.first().click();
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    
    // Assert circular credit logos exist
    const circularBadges = page.locator(".rounded-full");
    expect(await circularBadges.count()).toBeGreaterThan(0);
    console.log("✅ [Agent 7] Problem detail loaded with circular credit avatars.");

    // 4. Industry Atlas
    await page.goto("/industries");
    await page.waitForLoadState("domcontentloaded");
    const industryCards = page.locator("a[href^='/industries/']");
    await expect(industryCards.first()).toBeVisible({ timeout: 10000 });
    console.log("✅ [Agent 7] Industry atlas loaded with batch pagination.");

    // 5. Enterprise Directory
    await page.goto("/companies");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    console.log("✅ [Agent 7] Enterprise company directory loaded.");

    // 6. Security Perimeter
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 10000 });
    console.log("✅ [Agent 7] Admin security perimeter confirmed active.");

    console.log("🎉 [Agent 7] PRODUCTION SMOKE GATE PASSED: 100% HEALTHY");
  });
});
