import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  // 1. Course 5 - Chapter 5 (RAG Architecture)
  await page.goto('http://localhost:5173/learn/ai-for-builders/grounding-with-your-own-data-rag', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const fig1 = page.locator('figure').first();
  if (await fig1.count() > 0) {
    await fig1.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course5_rag_diagram.png' });
  console.log('Captured course5 RAG diagram screenshot');

  // 2. Course 5 - Chapter 2 (LLM Token Pipeline)
  await page.goto('http://localhost:5173/learn/ai-for-builders/how-large-language-models-work', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const fig2 = page.locator('figure').first();
  if (await fig2.count() > 0) {
    await fig2.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course5_token_pipeline_diagram.png' });
  console.log('Captured course5 token pipeline diagram screenshot');

  // 3. Course 4 - Chapter 1 (Double Diamond)
  await page.goto('http://localhost:5173/learn/solution-design-and-mvp-building/human-centered-mindset', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const fig3 = page.locator('figure').first();
  if (await fig3.count() > 0) {
    await fig3.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course4_double_diamond_diagram.png' });
  console.log('Captured course4 double diamond diagram screenshot');

  // 4. Mobile reader view of Course 5 diagram
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/learn/ai-for-builders/grounding-with-your-own-data-rag', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(1000);
  const mFig = mobilePage.locator('figure').first();
  if (await mFig.count() > 0) {
    await mFig.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
  }
  await mobilePage.screenshot({ path: 'C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course5_mobile_diagram.png' });
  console.log('Captured course5 mobile diagram screenshot');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
