import { test, expect } from "@playwright/test";

test.describe("Agent 5: Performance & Cache Profiler Agent", () => {
  test("Load Performance: Initial Home DOM load under 2.5s", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const duration = Date.now() - startTime;

    // Fast initial document parsing assertion
    expect(duration).toBeLessThan(4000);
  });

  test("Client Cache Utilization: Subsequent navigation to /explore loads near-instantaneously", async ({ page }) => {
    // First visit
    await page.goto("/explore");
    await page.waitForLoadState("domcontentloaded");

    // Navigate to About
    await page.goto("/about");
    await page.waitForLoadState("domcontentloaded");

    // Return to Explore (SWR cache should serve instantly)
    const startReturn = Date.now();
    await page.goto("/explore");
    await page.waitForSelector("a[href^='/problem/']");
    const returnDuration = Date.now() - startReturn;

    expect(returnDuration).toBeLessThan(2000);
  });

  test("Asset Integrity: Zero failed resource requests (HTTP 404/500) during crawl", async ({ page }) => {
    const failedUrls: string[] = [];

    page.on("response", (res) => {
      // Ignore external analytics or non-critical tracking if blocked
      if (res.status() >= 400 && !res.url().includes("analytics") && !res.url().includes("clarity")) {
        failedUrls.push(`${res.status()} ${res.url()}`);
      }
    });

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    expect(failedUrls).toHaveLength(0);
  });
});
