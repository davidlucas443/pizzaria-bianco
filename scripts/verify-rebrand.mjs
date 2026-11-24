import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import { writeFile, mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const url = process.env.BIANCO_URL || 'http://127.0.0.1:5173';
const errors = [], results = [];
await mkdir('.qa/rebrand', { recursive: true });
try {
  for (const motion of (process.env.QA_MOTION ? [process.env.QA_MOTION] : ['reduce', 'no-preference'])) {
    for (const width of [320, 360, 390, 768, 900, 1023, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: motion });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(1600);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('.loading-screen').count(), 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow ${width}`);
      assert.ok(await page.evaluate(() => [...document.querySelectorAll('main > section')].every(section => section.offsetHeight >= innerHeight - 2 && section.offsetWidth >= innerWidth - 2)), 'Full viewport sections');
      assert.equal(await page.locator('header').evaluate(el => getComputedStyle(el).backgroundColor), 'rgba(0, 0, 0, 0)');
      assert.ok(await page.locator('.hero-pizza').evaluate(img => img.complete && img.naturalWidth > 0));
      await page.keyboard.press('Tab'); assert.equal(await page.locator(':focus').innerText(), 'Pular para o conteúdo');
      await page.keyboard.press('Enter'); await page.waitForTimeout(1400);
      assert.equal(await page.locator(':focus').getAttribute('id'), 'conteudo');
      const menu = page.locator('button[aria-controls="navigation"]');
      await menu.click(); assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape'); assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      await page.locator('.header-order button[aria-haspopup]').click(); assert.equal(await page.locator('dialog[open]').count(), 1);
      await page.keyboard.press('Escape');
      await page.locator('.hero a[href="#cardapio"]').click(); await page.waitForTimeout(1600);
      const position = await page.locator('#cardapio').evaluate(el => el.getBoundingClientRect().top);
      assert.ok(position >= 75 && position < 160, `anchor ${width} ${motion}: ${position}`);
      await page.goto(url + '/#cardapio', { waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
      assert.ok(await page.locator('#cardapio').evaluate(el => el.getBoundingClientRect().top >= 75), 'direct hash');
      await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(1600);
      if ([390,1440].includes(width)) await page.screenshot({ path: `.qa/rebrand/after-${motion}-${width}.png`, fullPage: motion === 'reduce' });
      if (width === 1440 && motion === 'no-preference') {
        await page.evaluate(() => { window.framesMeasured = []; let last = performance.now(); function frame(now) { window.framesMeasured.push(now-last); last = now; window.frameId = requestAnimationFrame(frame); } window.frameId = requestAnimationFrame(frame); });
        for (let i = 0; i < 18; i++) { await page.mouse.wheel(0, 240); await page.waitForTimeout(80); }
        const frames = await page.evaluate(() => { cancelAnimationFrame(window.frameId); return window.framesMeasured; });
        results.push({ motion, width, frames });
        await page.waitForTimeout(2200);
        await page.evaluate(() => scrollTo(0, document.querySelector('.flavor-journey').offsetTop + 1000)); await page.waitForTimeout(1200);
        await page.screenshot({ path: '.qa/rebrand/pinned.png' });
        assert.equal(await page.locator('.is-pinned').count(), 1);
        assert.ok(await page.locator('.flavor-journey').evaluate(el => el.offsetHeight >= innerHeight * 2.7), 'Pin reserves the full scroll distance');
        assert.equal(new Set(await page.locator('.flavor-visual img').evaluateAll(images => images.map(img => img.src))).size, 3);
        for (const [progress, expected] of [[.05,0],[.52,1],[.95,2],[.52,1]]) {
          await page.evaluate(progress => scrollTo(0,document.querySelector('.flavor-journey').offsetTop + innerHeight * 1.8 * progress),progress);
          await page.waitForTimeout(1200);
          const opacity = await page.locator('.flavor-visual img').evaluateAll(images => images.map(img => Number(getComputedStyle(img).opacity)));
          assert.ok(opacity[expected] > .95, `Photo ${expected}: ${opacity}`);
        }
        await page.mouse.wheel(0,-800); await page.waitForTimeout(1000);
      }
      if (motion === 'reduce') {
        assert.equal(await page.locator('.pin-spacer').count(), 0);
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
        results.push({ width, motion, violations: axe.violations });
        assert.deepEqual(axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], 'axe');
      }
      console.log(`${width}px ${motion}: OK`); await context.close();
    }
  }
  for (const mode of ['slow', 'failed']) {
    const page = await browser.newPage();
    await page.route('**/bianco-margherita-*.webp', async route => { if (mode === 'slow') await new Promise(r => setTimeout(r,4000)); await route.abort(); });
    await page.goto(url, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(1900);
    assert.equal(await page.locator('.loading-screen').count(), 0);
    await page.locator('.header-order button[aria-haspopup]').click(); assert.equal(await page.locator('dialog[open]').count(), 1);
    await page.close(); console.log(`Image ${mode}: usable`);
  }
  assert.deepEqual(errors, []);
} finally { await writeFile('.qa/rebrand/report.json', JSON.stringify({ results, errors }, null, 2)); await browser.close(); }
