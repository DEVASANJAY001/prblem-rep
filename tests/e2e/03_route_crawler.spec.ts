import { test, expect } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/",
  "/explore",
  "/industries",
  "/companies",
  "/research",
  "/community",
  "/about",
  "/features",
  "/solutions",
  "/contact",
  "/terms",
  "/privacy",
  "/cookies",
  "/competitions",
  "/login",
  "/register",
];

test.describe("Agent 3: Route, Link & Navigation Crawler Agent", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`Verify Route Accessibility: ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);

      // Verify no ErrorBoundary crash is rendered
      const errorBoundaryText = page.locator("text=Something went wrong");
      await expect(errorBoundaryText).not.toBeVisible();

      // Ensure page rendered basic layout
      await expect(page.locator("body")).toBeVisible();
    });
  }

  test("Verify 404 Fallback: Unrecognized route renders styled NotFound component", async ({ page }) => {
    await page.goto("/completely-invalid-url-404-check");
    await expect(page.locator("h1")).toContainText(/Stuck somewhere|Not Found/i);
    
    // Check Home navigation recovery link
    const returnHomeBtn = page.locator("a[href='/']").first();
    await expect(returnHomeBtn).toBeVisible();
  });
});
