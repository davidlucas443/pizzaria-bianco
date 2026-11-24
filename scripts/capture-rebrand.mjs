import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
await mkdir('.qa/rebrand', { recursive: true });
const results = [];
try {
  for (const [name, url] of [['reference', 'https://viudespratas.vercel.app/'], ['before', 'http://127.0.0.1:5173']]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `.qa/rebrand/${name}.png` });
    results.push({ name, text: (await page.locator('body').innerText()).slice(0, 8000) });
    await page.evaluate(() => { window.framesMeasured = []; let last = performance.now(); function frame(now) { window.framesMeasured.push(now - last); last = now; window.frameId = requestAnimationFrame(frame); } window.frameId = requestAnimationFrame(frame); });
    for (let i = 0; i < 18; i++) { await page.mouse.wheel(0, 240); await page.waitForTimeout(80); }
    results.push({ name, frames: await page.evaluate(() => { cancelAnimationFrame(window.frameId); return window.framesMeasured; }) });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `.qa/rebrand/${name}-mobile.png` });
    await page.close();
  }
  await writeFile('.qa/rebrand/baseline.json', JSON.stringify(results, null, 2));
  console.log(results.filter(item => item.text));
} finally { await browser.close(); }
