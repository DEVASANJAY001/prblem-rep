import { test, expect } from "@playwright/test";

test.describe("Agent 1: Auth, RBAC & Security Guardian Agent", () => {
  test("Strict Route Guarding: Unauthenticated access to /admin redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("Strict Route Guarding: Unauthenticated access to /admin/problems redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/problems");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("Strict Route Guarding: Unauthenticated access to /admin/companies redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/companies");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("Strict Route Guarding: Unauthenticated access to /admin/industries redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/industries");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("Strict Route Guarding: Unauthenticated access to /admin/app-controller redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin/app-controller");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("User Protected Route: Unauthenticated access to /submit redirects to /login", async ({ page }) => {
    await page.goto("/submit");
    await expect(page).toHaveURL(/\/login/);
  });

  test("User Protected Route: Unauthenticated access to /dashboard redirects to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("Anti-Tamper RBAC: Spoofing localStorage role does not grant admin access", async ({ page }) => {
    await page.goto("/");
    // Attempt local storage injection attack
    await page.evaluate(() => {
      localStorage.setItem("stuckhere_user", JSON.stringify({ uid: "fake-hacker", role: "admin" }));
      localStorage.setItem("userRole", "admin");
    });

    await page.goto("/admin");
    // AdminRoute must reject unauthenticated token and redirect
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
