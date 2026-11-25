import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  // 1. Academy Home showing all 6 courses
  await page.goto('http://localhost:5173/learn', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const coursesSec = page.locator('#courses');
  if (await coursesSec.count() > 0) {
    await coursesSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_all_6_courses.png' });
  console.log('Captured all 6 courses on /learn');

  // 2. Course 6 Subject Page
  await page.goto('http://localhost:5173/learn/startup-fundamentals', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course6_subject_page.png' });
  console.log('Captured course 6 subject page');

  // 3. Course 6 Chapter 1 (Venture Pathways Diagram)
  await page.goto('http://localhost:5173/learn/startup-fundamentals/the-startup-mindset-and-venture-types', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const fig1 = page.locator('figure').first();
  if (await fig1.count() > 0) {
    await fig1.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course6_pathways_diagram.png' });
  console.log('Captured course 6 pathways diagram');

  // 4. Course 6 Chapter 3 (Equity Vesting Diagram)
  await page.goto('http://localhost:5173/learn/startup-fundamentals/founders-teams-and-equity', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const fig2 = page.locator('figure').first();
  if (await fig2.count() > 0) {
    await fig2.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course6_equity_vesting_diagram.png' });
  console.log('Captured course 6 equity vesting diagram');

  // 5. Mobile reader view of Course 6
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/learn/startup-fundamentals/the-startup-mindset-and-venture-types', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(1000);
  const mFig = mobilePage.locator('figure').first();
  if (await mFig.count() > 0) {
    await mFig.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
  }
  await mobilePage.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course6_mobile_reader.png' });
  console.log('Captured course 6 mobile reader');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
