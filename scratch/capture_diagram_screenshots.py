import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await context.new_page()

        # 1. Course 5 - Chapter 5 (RAG Architecture)
        await page.goto("http://localhost:5173/learn/ai-for-builders/grounding-with-your-own-data-rag", wait_until="domcontentloaded")
        await page.wait_for_timeout(1000)
        # Scroll to figure
        figure = page.locator("figure").first
        if await figure.count() > 0:
            await figure.scroll_into_view_if_needed()
            await page.wait_for_timeout(500)
        await page.screenshot(path="C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course5_rag_diagram.png")
        print("Captured course5 RAG diagram screenshot")

        # 2. Course 5 - Chapter 2 (LLM Token Pipeline)
        await page.goto("http://localhost:5173/learn/ai-for-builders/how-large-language-models-work", wait_until="domcontentloaded")
        await page.wait_for_timeout(1000)
        figure = page.locator("figure").first
        if await figure.count() > 0:
            await figure.scroll_into_view_if_needed()
            await page.wait_for_timeout(500)
        await page.screenshot(path="C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course5_token_pipeline_diagram.png")
        print("Captured course5 token pipeline diagram screenshot")

        # 3. Course 4 - Chapter 1 (Double Diamond)
        await page.goto("http://localhost:5173/learn/solution-design-and-mvp-building/human-centered-mindset", wait_until="domcontentloaded")
        await page.wait_for_timeout(1000)
        figure = page.locator("figure").first
        if await figure.count() > 0:
            await figure.scroll_into_view_if_needed()
            await page.wait_for_timeout(500)
        await page.screenshot(path="C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course4_double_diamond_diagram.png")
        print("Captured course4 double diamond diagram screenshot")

        # 4. Mobile reader view of Course 5 diagram
        mobile_context = await browser.new_context(viewport={"width": 390, "height": 844})
        mobile_page = await mobile_context.new_page()
        await mobile_page.goto("http://localhost:5173/learn/ai-for-builders/grounding-with-your-own-data-rag", wait_until="domcontentloaded")
        await mobile_page.wait_for_timeout(1000)
        figure = mobile_page.locator("figure").first
        if await figure.count() > 0:
            await figure.scroll_into_view_if_needed()
            await mobile_page.wait_for_timeout(500)
        await mobile_page.screenshot(path="C:/Users/devas/.gemini/antigravity/brain/ef1f2699-1dfc-402a-891a-60fd42c360d2/verified_course5_mobile_diagram.png")
        print("Captured course5 mobile diagram screenshot")

        await browser.close()

asyncio.run(main())
