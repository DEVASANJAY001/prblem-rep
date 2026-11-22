import { test, expect } from "@playwright/test";

test.describe("Academy Flow E2E Tests: Course Branching, Layout & Independent Scroll", () => {
  test("1. Academy Home renders Course 1 & Course 2 cards, course switcher pills, and search", async ({ page }) => {
    console.log("🎓 [Academy E2E] Testing /learn (Academy Home)...");
    await page.goto("/learn");
    await page.waitForLoadState("domcontentloaded");

    // Hero branding with zero clipping
    await expect(page.locator("h1")).toContainText("Learn to find problems worth solving");
    await expect(page.locator("a:has-text('Start Course 1')")).toBeVisible();
    await expect(page.locator("a:has-text('Explore Course 2')")).toBeVisible();

    // Course Cards: Both Course 1 and Course 2 are live
    await expect(page.locator("text=COURSE 1").first()).toBeVisible();
    await expect(page.locator("text=Problem Discovery & Validation").first()).toBeVisible();
    await expect(page.locator("text=COURSE 2").first()).toBeVisible();
    await expect(page.locator("text=Market Sizing & Opportunity Analysis").first()).toBeVisible();

    // Verify search icon exists in universal header
    const isMobile = (page.viewportSize()?.width ?? 1280) < 640;
    if (isMobile) {
      await page.locator("button[aria-label*='navigation menu']").click();
      const mobileSearchInput = page.locator("input[placeholder='What do you want to learn?']").last();
      await expect(mobileSearchInput).toBeVisible();
      await mobileSearchInput.fill("surgery");
      await mobileSearchInput.press("Enter");
      await expect(page.locator("text=Vitamin, Painkiller, Surgery")).toBeVisible();
      // Clear filter
      await page.locator("button:has-text('Clear filter')").or(page.locator("button:has-text('Clear search')")).first().click();
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

    // Switch to Course 2 chapters via interactive Course 2 Card in #courses
    const course2Card = page.locator("#courses [role='button']").nth(1);
    await expect(course2Card).toBeVisible();
    await course2Card.click();
    await expect(page.locator("text=Showing 18 of 18 chapters")).toBeVisible();

    // Switch back to Course 1 via interactive Course 1 Card in #courses
    const course1Card = page.locator("#courses [role='button']").nth(0);
    await expect(course1Card).toBeVisible();
    await course1Card.click();
    await expect(page.locator("text=Showing 15 of 15 chapters")).toBeVisible();

    if (!isMobile) {
      await page.screenshot({ path: "C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_learn_home.png" });
    }

    console.log("✅ [Academy E2E] Academy Home passed 100%");
  });

  test("2. Subject Page renders Course 1 syllabus and course branching", async ({ page }) => {
    console.log("📚 [Academy E2E] Testing Course 1 Subject Page...");
    await page.goto("/learn/problem-discovery-and-validation");
    await page.waitForLoadState("domcontentloaded");

    // Hero title & metadata
    await expect(page.locator("h1")).toContainText("Problem Discovery & Validation");
    await expect(page.locator("text=Academy / Course 1")).toBeVisible();
    await expect(page.locator("text=15 chapters").first()).toBeVisible();
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

    console.log("✅ [Academy E2E] Subject Page Course 1 passed 100%");
  });

  test("3. Subject Page renders Course 2 (Market Sizing) with 18 chapters and unit economics", async ({ page }) => {
    console.log("📊 [Academy E2E] Testing Course 2 Subject Page...");
    await page.goto("/learn/market-sizing-and-opportunity");
    await page.waitForLoadState("domcontentloaded");

    // Hero title & metadata for Course 2
    await expect(page.locator("h1")).toContainText("Market Sizing & Opportunity Analysis");
    await expect(page.locator("text=Academy / Course 2")).toBeVisible();
    await expect(page.locator("text=18 chapters").first()).toBeVisible();
    await expect(page.locator("text=76 sections")).toBeVisible();
    await expect(page.locator("text=Intermediate")).toBeVisible();

    // Start learning button points to Course 2
    const startLearningBtn = page.locator("a:has-text('Start learning')");
    await expect(startLearningBtn).toBeVisible();
    await expect(startLearningBtn).toHaveAttribute("href", "/learn/market-sizing-and-opportunity/course-overview");

    // Skills
    await expect(page.locator("text=Bottom-Up Sizing").first()).toBeVisible();
    await expect(page.getByText('Unit Economics', { exact: true }).first()).toBeVisible();

    // Syllabus accordion toggle
    const part3Btn = page.locator("button:has-text('PART 3')");
    await expect(part3Btn).toBeVisible();
    await part3Btn.click();

    // Verify chapter 8 link in syllabus
    const ch8Link = page.locator("a[href='/learn/market-sizing-and-opportunity/bottom-up-tam-step-by-step']");
    await expect(ch8Link).toBeVisible();

    const isMobile = (page.viewportSize()?.width ?? 1280) < 640;
    if (!isMobile) {
      await page.screenshot({ path: "C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course2_page.png" });
    }

    console.log("✅ [Academy E2E] Subject Page Course 2 passed 100%");
  });

  test("4. Chapter Reader renders Course 1 with clean numbers, quiz, and mobile controls", async ({ page }) => {
    console.log("📖 [Academy E2E] Testing Course 1 Chapter Reader...");
    await page.goto("/learn/problem-discovery-and-validation/what-is-a-problem");
    await page.waitForLoadState("domcontentloaded");

    // Title & Intro
    await expect(page.locator("h1")).toContainText("Foundations: What Is a Problem?");
    await expect(page.locator("text=Course 1 · Chapter 1")).toBeVisible();

    const isMobile = (page.viewportSize()?.width ?? 1280) < 640;
    if (isMobile) {
      // Mobile Top Bar should be visible
      const mobileChapterBtn = page.locator("button[aria-label='Open course chapters drawer']");
      await expect(mobileChapterBtn).toBeVisible();
      await page.screenshot({ path: "C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_mobile_reader.png" });

      await mobileChapterBtn.click();

      // Drawer panel open
      const closeBtn = page.locator("button[aria-label='Close chapters menu']");
      await expect(closeBtn).toBeVisible();
      await expect(page.locator("text=COURSE 1 CONTENTS").first()).toBeVisible();
      await page.screenshot({ path: "C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_mobile_drawer.png" });
      await closeBtn.click();
    } else {
      // Desktop Left Sidebar: Numbers only
      const navItem0 = page.locator("nav a[href*='course-overview']");
      await expect(navItem0).toBeVisible();
      await expect(navItem0.locator("span").first()).toHaveText("0");

      const navItem1 = page.locator("nav a[href*='what-is-a-problem']");
      await expect(navItem1).toBeVisible();
      await expect(navItem1.locator("span").first()).toHaveText("1");
    }

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

    console.log("✅ [Academy E2E] Course 1 Chapter Reader passed 100%");
  });

  test("5. Chapter Reader renders Course 2 with Bottom-Up TAM, worked examples & SVG diagram", async ({ page }) => {
    console.log("📈 [Academy E2E] Testing Course 2 Chapter Reader...");
    await page.goto("/learn/market-sizing-and-opportunity/bottom-up-tam-step-by-step");
    await page.waitForLoadState("domcontentloaded");

    // Title & Intro for Course 2 Chapter 8
    await expect(page.locator("h1")).toContainText("Bottom-Up TAM: Step by Step");
    await expect(page.locator("text=Course 2 · Chapter 8")).toBeVisible();

    // Check worked example clinic table
    await expect(page.locator("h2:has-text('8.2 Worked Example A: Clinic appointment no-shows')")).toBeVisible();
    await expect(page.locator("text=14,200 clinics").first()).toBeVisible();
    await expect(page.locator("text=$25,560,000")).toBeVisible();

    // Checkpoint Quiz
    const quizOptionB = page.locator("button:has-text('$18 Million (6,000 × $3,000)')").first();
    await expect(quizOptionB).toBeVisible();
    await quizOptionB.click();
    await expect(page.locator("text=Correct! 6,000 × $3,000 = $18,000,000.")).toBeVisible();

    const isMobile = (page.viewportSize()?.width ?? 1280) < 640;
    if (!isMobile) {
      await page.screenshot({ path: "C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course2_chapter8.png" });
    }

    console.log("✅ [Academy E2E] Course 2 Chapter Reader passed 100%");
  });

  test("6. Universal Navbar on Main Page shows Academy in mobile drawer", async ({ page }) => {
    console.log("📱 [Mobile Nav E2E] Testing main page mobile side nav for Academy link...");
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const isMobile = (page.viewportSize()?.width ?? 1280) < 640;
    if (isMobile) {
      const menuBtn = page.locator("button[aria-label*='navigation menu']");
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();

      // Verify Academy link exists in mobile drawer
      const academyLink = page.getByRole("link", { name: /Academy/i }).last();
      await expect(academyLink).toBeVisible();
      await page.screenshot({ path: "C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_mobile_navbar_academy.png" });

      await academyLink.click();
      await expect(page).toHaveURL(/\/learn/);
      await expect(page.locator("h1")).toContainText("Learn to find problems worth solving");
    } else {
      // Desktop navbar has Academy link
      const academyLink = page.locator("nav a[href='/learn']:has-text('Academy')");
      await expect(academyLink).toBeVisible();
    }
    console.log("✅ [Mobile Nav E2E] Mobile nav bar shows Academy link successfully!");
  });

  test("7. Course 3 (Full-Stack Cloud Development) Subject Page and Chapter Reader", async ({ page }) => {
    console.log("☁️ [Academy E2E] Testing Course 3 Subject Page & Reader...");
    await page.goto("/learn/full-stack-cloud-development");
    await page.waitForLoadState("domcontentloaded");

    await expect(page.locator("h1")).toContainText("Full-Stack Cloud Development");
    await expect(page.locator("body")).toContainText("18 chapters");

    // Click Start learning
    const startBtn = page.getByRole("link", { name: /Start learning/i });
    await expect(startBtn).toBeVisible();
    await startBtn.click();
    await expect(page).toHaveURL(/\/learn\/full-stack-cloud-development\/course-overview/);

    // Verify Chapter 0 content
    await expect(page.locator("h1")).toContainText("Course Overview");
    await expect(page.locator("body")).toContainText("0.1 What this subject covers");

    // Navigate to Chapter 7
    await page.goto("/learn/full-stack-cloud-development/data-modelling-with-cloud-firestore");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toContainText("Data Modelling with Cloud Firestore");
    await expect(page.locator("body")).toContainText("7.1 NoSQL document basics");
    console.log("✅ [Academy E2E] Course 3 Subject Page & Reader passed 100%");
  });
});
