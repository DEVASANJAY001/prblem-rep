import { test, expect } from "@playwright/test";

test.describe("Academy Flow E2E Tests: Home, Subject Page & Reader", () => {
  test("1. Academy Home renders exact layout and interactive elements", async ({ page }) => {
    console.log("🎓 [Academy E2E] Testing /learn (Academy Home)...");
    await page.goto("/learn");
    await page.waitForLoadState("domcontentloaded");

    // Header & Hero Branding
    await expect(page.locator("h1")).toContainText("Learn to find problems worth solving");
    await expect(page.locator("a:has-text('Start Module 1')")).toBeVisible();

    // Module Cards in Learning Paths
    await expect(page.locator("text=Problem Discovery & Validation").first()).toBeVisible();
    await expect(page.locator("text=Market Sizing & Opportunity")).toBeVisible();
    await expect(page.locator("text=Full-Stack Cloud for Founders")).toBeVisible();

    // Search bar functionality in universal header
    const isMobile = (page.viewportSize()?.width ?? 1280) < 640;
    if (isMobile) {
      await page.locator("button[aria-label*='navigation menu']").click();
      const mobileSearchInput = page.locator("input[placeholder='What do you want to learn?']").last();
      await expect(mobileSearchInput).toBeVisible();
      await mobileSearchInput.fill("surgery");
      await mobileSearchInput.press("Enter");
      await expect(page.locator("text=Vitamin, Painkiller, Surgery")).toBeVisible();
      // Clear filter on page
      await page.locator("button:has-text('Clear filter')").click();
    } else {
      const searchInput = page.locator("input[placeholder='What do you want to learn?']").first();
      await expect(searchInput).toBeVisible();
      await searchInput.fill("surgery");
      await expect(page.locator("text=Vitamin, Painkiller, Surgery")).toBeVisible();

      // Clear search
      await page.locator("button[aria-label='Clear search']").first().click();
      await expect(searchInput).toHaveValue("");
    }

    // Part filter: click 'Foundations'
    await page.locator("button:has-text('Foundations')").click();
    await expect(page.locator("text=Showing 4 of 15")).toBeVisible();

    // Reset part filter to 'All'
    await page.locator("button:has-text('All')").click();
    await expect(page.locator("text=Showing 15 of 15")).toBeVisible();
    console.log("✅ [Academy E2E] Academy Home passed 100%");
  });

  test("2. Subject Page renders syllabus and learning outcomes", async ({ page }) => {
    console.log("📚 [Academy E2E] Testing /learn/module-1 (Subject Page)...");
    await page.goto("/learn/module-1");
    await page.waitForLoadState("domcontentloaded");

    // Hero title & metadata
    await expect(page.locator("h1")).toContainText("Problem Discovery & Validation");
    await expect(page.locator("text=15 chapters")).toBeVisible();
    await expect(page.locator("text=78 sections")).toBeVisible();

    // What you will learn
    await expect(page.locator("text=Spot problems in real workplaces")).toBeVisible();
    await expect(page.locator("text=Score pain on a 0 to 100 scale")).toBeVisible();

    // Skills
    await expect(page.locator("text=Customer discovery")).toBeVisible();
    await expect(page.locator("text=Pain scoring")).toBeVisible();

    // Syllabus accordion toggle
    const part2Btn = page.locator("button:has-text('PART 2')");
    await expect(part2Btn).toBeVisible();
    await part2Btn.click();
    await expect(page.locator("text=Customer Discovery Interviews").first()).toBeVisible();

    console.log("✅ [Academy E2E] Subject Page passed 100%");
  });

  test("3. Chapter Reader renders reading canvas, tables, details and quiz", async ({ page }) => {
    console.log("📖 [Academy E2E] Testing /learn/what-is-a-problem (Chapter Reader)...");
    await page.goto("/learn/what-is-a-problem");
    await page.waitForLoadState("domcontentloaded");

    // Title & Intro
    await expect(page.locator("h1")).toContainText("Foundations: What Is a Problem?");
    await expect(page.locator("text=In this chapter")).toBeVisible();

    // Section 1.1 Comparison Table
    await expect(page.locator("h2:has-text('1.1 Problem, idea, solution')")).toBeVisible();
    await expect(page.locator("text=Clinic staff lose part of every week")).toBeVisible();

    // Section 1.3 Template
    await expect(page.locator("h2:has-text('1.3 The template')")).toBeVisible();

    // Interactive <details> check yourself question
    const summaryQuestion = page.locator("summary:has-text('we need a mobile app')");
    await expect(summaryQuestion).toBeVisible();
    await summaryQuestion.click();
    await expect(page.locator("text=It names a solution. Ask what the shop owner cannot do today.")).toBeVisible();

    // Checkpoint Quiz
    const quizOptionB = page.locator("button:has-text('Cold-chain vaccine shippers lose $42,000')").first();
    await expect(quizOptionB).toBeVisible();
    await quizOptionB.click();
    await expect(page.locator("text=Correct. Option B specifies the victim")).toBeVisible();

    // Mark Finished Toggle
    const finishBtn = page.locator("button:has-text('Mark chapter finished')").or(page.locator("button:has-text('Finished')")).first();
    await expect(finishBtn).toBeVisible();
    await finishBtn.click();

    console.log("✅ [Academy E2E] Chapter Reader passed 100%");
  });
});
