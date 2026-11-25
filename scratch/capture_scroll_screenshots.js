import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  // 1. Desktop - 4 courses in view initially (Courses 1-4)
  await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
  await page.waitForSelector('#courses [role="button"]');
  await page.waitForTimeout(1000);
  
  const coursesSec = page.locator('#courses');
  await coursesSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  
  await page.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_courses_4_in_view_initial.png' });
  console.log('Captured 4 courses in view initially');

  // 2. Click Right Scroll Arrow -> Scrolled to show remaining courses (Course 5 & 6)
  const rightBtn = page.locator("button[aria-label='Scroll courses right']");
  if (await rightBtn.count() > 0) {
    await rightBtn.click();
    await page.waitForTimeout(1000);
  }
  await page.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_courses_scrolled_right.png' });
  console.log('Captured courses scrolled right (showing remaining)');

  // 3. Mobile View of Course scroll track
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
  await mobilePage.waitForSelector('#courses [role="button"]');
  await mobilePage.waitForTimeout(800);
  
  const mCourses = mobilePage.locator('#courses');
  await mCourses.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(800);
  
  await mobilePage.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_courses_mobile_scroll.png' });
  console.log('Captured mobile courses scroll view');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
