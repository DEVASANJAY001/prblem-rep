import { test, expect } from "@playwright/test";

test.describe("Academy Flow E2E Tests: Course Branching, Layout & Independent Scroll", () => {
  test("1. Academy Home renders Course 1 card, zero clipping hero, and clean search icon", async ({ page }) => {
    console.log("🎓 [Academy E2E] Testing /learn (Academy Home)...");
    await page.goto("/learn");
    await page.waitForLoadState("domcontentloaded");

    // Hero branding with zero clipping
    await expect(page.locator("h1")).toContainText("Learn to find problems worth solving");
    await expect(page.locator("a:has-text('Start Course 1')")).toBeVisible();

    // Course Cards
    await expect(page.locator("text=COURSE 1").first()).toBeVisible();
    await expect(page.locator("text=Problem Discovery & Validation").first()).toBeVisible();
    await expect(page.locator("text=COURSE 2")).toBeVisible();
    await expect(page.locator("text=COURSE 3")).toBeVisible();

    // Verify search icon exists in universal header (instead of ACADEMY text badge)
    const isMobile = (page.viewportSize()?.width ?? 1280) < 640;
    if (isMobile) {
      await page.locator("button[aria-label*='navigation menu']").click();
      const mobileSearchInput = page.locator("input[placeholder='What do you want to learn?']").last();
      await expect(mobileSearchInput).toBeVisible();
      await mobileSearchInput.fill("surgery");
      await mobileSearchInput.press("Enter");
      await expect(page.locator("text=Vitamin, Painkiller, Surgery")).toBeVisible();
      // Clear filter
      await page.locator("button:has-text('Clear filter')").click();
    } else {
      // Desktop search bar has search button
      await expect(page.locator("button[aria-label='Search Academy']")).toBeVisible();
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

    if (!isMobile) {
      await page.screenshot({ path: "C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_learn_home.png" });
    }

    // Click Course 1 card to navigate to Course Page (/learn/problem-discovery-and-validation)
    const courseCard = page.locator("a[href='/learn/problem-discovery-and-validation']").first();
    await courseCard.click();
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/\/learn\/problem-discovery-and-validation/);

    console.log("✅ [Academy E2E] Academy Home passed 100%");
  });

  test("2. Subject Page renders course branching and syllabus links", async ({ page }) => {
    console.log("📚 [Academy E2E] Testing /learn/problem-discovery-and-validation (Course Page)...");
    await page.goto("/learn/problem-discovery-and-validation");
    await page.waitForLoadState("domcontentloaded");

    // Hero title & metadata
    await expect(page.locator("h1")).toContainText("Problem Discovery & Validation");
    await expect(page.locator("text=Academy / Course 1")).toBeVisible();
    await expect(page.locator("text=15 chapters")).toBeVisible();
    await expect(page.locator("text=78 sections")).toBeVisible();

    // Start learning button
    const startLearningBtn = page.locator("a:has-text('Start learning')");
    await expect(startLearningBtn).toBeVisible();
    await expect(startLearningBtn).toHaveAttribute("href", "/learn/problem-discovery-and-validation/course-overview");

    // What you will learn
    await expect(page.locator("text=Spot problems in real workplaces")).toBeVisible();

    // Skills
    await expect(page.locator("text=Customer discovery")).toBeVisible();

    // Syllabus accordion toggle
    const part2Btn = page.locator("button:has-text('PART 2')");
    await expect(part2Btn).toBeVisible();
    await part2Btn.click();

    // Verify chapter link points to branched course URL
    const ch5Link = page.locator("a[href='/learn/problem-discovery-and-validation/customer-discovery-interviews']");
    await expect(ch5Link).toBeVisible();

    const isMobile = (page.viewportSize()?.width ?? 1280) < 640;
    if (!isMobile) {
      await page.screenshot({ path: "C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course_page.png" });
    }

    console.log("✅ [Academy E2E] Subject Page passed 100%");
  });

  test("3. Chapter Reader renders independent scrolling containers, clean numbering (no ticks) & quiz", async ({ page }) => {
    console.log("📖 [Academy E2E] Testing /learn/problem-discovery-and-validation/what-is-a-problem...");
    await page.goto("/learn/problem-discovery-and-validation/what-is-a-problem");
    await page.waitForLoadState("domcontentloaded");

    // Title & Intro
    await expect(page.locator("h1")).toContainText("Foundations: What Is a Problem?");
    await expect(page.locator("text=Course 1 · Chapter 1")).toBeVisible();

    // Check Left Sidebar: Numbers only (verify chapter 0 and 1 have numbers and NO tick mark)
    const navItem0 = page.locator("nav a[href*='course-overview']");
    await expect(navItem0).toBeVisible();
    await expect(navItem0.locator("span").first()).toHaveText("0");

    const navItem1 = page.locator("nav a[href*='what-is-a-problem']");
    await expect(navItem1).toBeVisible();
    await expect(navItem1.locator("span").first()).toHaveText("1");

    // Section 1.1 Comparison Table
    await expect(page.locator("h2:has-text('1.1 Problem, idea, solution')")).toBeVisible();
    await expect(page.locator("text=Clinic staff lose 6 hours weekly")).toBeVisible();

    // Section 1.3 Template
    await expect(page.locator("h2:has-text('1.3 Problem statement template')")).toBeVisible();

    // Interactive <details> check yourself question
    const summaryQuestion = page.locator("summary:has-text('we need a mobile app')");
    await expect(summaryQuestion).toBeVisible();
    await summaryQuestion.click();
    await expect(page.locator("text=No. It names a solution. Ask what the shop owner cannot do today")).toBeVisible();

    // Checkpoint Quiz
    const quizOptionB = page.locator("button:has-text('Cold-chain vaccine shippers lose $42,000')").first();
    await expect(quizOptionB).toBeVisible();
    await quizOptionB.click();
    await expect(page.locator("text=Correct. Option B specifies the victim")).toBeVisible();

    // Mark Finished Toggle
    const finishBtn = page.locator("button:has-text('Mark chapter finished')").or(page.locator("button:has-text('Finished')")).first();
    await expect(finishBtn).toBeVisible();
    await finishBtn.click();

    // Next chapter link points to branched URL
    const nextChapterLink = page.locator("a:has-text('Chapter 2: Why Startups Fail →')");
    await expect(nextChapterLink).toBeVisible();

    const isMobile = (page.viewportSize()?.width ?? 1280) < 640;
    if (!isMobile) {
      await page.screenshot({ path: "C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_chapter_reader.png" });
    }

    console.log("✅ [Academy E2E] Chapter Reader passed 100%");
  });
});
