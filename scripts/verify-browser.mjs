import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const sites = [
  { name: 'bianco', url: process.env.BIANCO_URL || 'http://127.0.0.1:4173', anchor: '#cardapio' },
  { name: 'advocacia', url: process.env.ADVOCACIA_URL || 'http://127.0.0.1:4174', anchor: '#atuacao' },
  { name: 'corretagem', url: process.env.CORRETAGEM_URL || 'http://127.0.0.1:4175', anchor: '#imoveis' },
];
const checks = [], errors = [], servers = [];
await mkdir('.qa', { recursive: true });
try {
  if (!process.env.QA_USE_EXISTING_SERVERS) {
    for (const [directory, port] of [['.', '4173'], ['advocacia', '4174'], ['corretagem', '4175']]) {
      const server = spawn(process.execPath, [resolve(directory, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', port, '--strictPort'], { cwd: resolve(directory), windowsHide: true, stdio: 'ignore' });
      servers.push(server);
      let ready = false;
      for (let attempt = 0; attempt < 30; attempt++) {
        if (server.exitCode !== null) throw new Error('Servidor não iniciou: ' + directory);
        try { if ((await fetch('http://127.0.0.1:' + port)).ok) { ready = true; break; } } catch {}
        await new Promise(resolve => setTimeout(resolve, 250));
      }
      assert.ok(ready, 'Servidor disponível: ' + directory);
    }
  }
  for (const site of sites) {
    for (const width of [320, 390, 768, 900, 1023, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(site.name + ': ' + error.message));
      page.on('response', response => { if (response.url().startsWith(site.url) && response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
      assert.equal((await page.goto(site.url, { waitUntil: 'networkidle' }))?.status(), 200);
      assert.equal(await page.locator('h1').count(), 1);
      await page.evaluate(async () => { for (const image of document.images) { image.loading = 'eager'; await image.decode(); } });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), site.name + ' overflow ' + width);
      assert.deepEqual(await page.locator('a').evaluateAll(links => links.filter(link => !link.getAttribute('href') || link.getAttribute('href') === '#').map(link => link.outerHTML)), []);
      assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash)), []);
      assert.equal(await page.locator('a[href*="wa.me"], a[href^="tel:"], a[href*="maps"], a[href*="instagram.com"]').count(), 0, 'Contatos vazios não geram links externos');
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').innerText(), 'Pular para o conteúdo');
      assert.notEqual(await page.locator(':focus').evaluate(element => getComputedStyle(element).outlineStyle), 'none');
      await page.keyboard.press('Enter');
      assert.equal(await page.locator(':focus').getAttribute('id'), 'conteudo');
      const toggle = page.locator('button[aria-controls="navigation"]');
      if (await toggle.isVisible()) {
        await toggle.click(); assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
        await page.locator('nav a').first().focus(); await page.keyboard.press('Escape');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        await toggle.click(); await page.locator('nav a').first().click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      } else { assert.ok(await page.locator('nav').isVisible(), 'Navegação disponível ' + width); }
      const action = page.locator('main button[aria-haspopup="dialog"]').first();
      await action.click();
      const dialog = page.locator('dialog[open]');
      assert.equal(await dialog.count(), 1); assert.ok(await dialog.getByRole('heading').isVisible());
      await page.keyboard.press('Escape'); assert.equal(await page.locator('dialog[open]').count(), 0);
      await action.click(); await page.locator('dialog[open] button').click();
      assert.equal(await page.locator('dialog[open]').count(), 0);
      assert.ok(await action.evaluate(element => element === document.activeElement), 'Foco devolvido ao botão');
      if (site.name === 'advocacia') {
        const summary = page.locator('#duvidas summary').first(); await summary.focus(); await page.keyboard.press('Enter');
        assert.equal(await page.locator('#duvidas details').first().getAttribute('open'), '');
        await page.keyboard.press('Enter');
      }
      if (site.name === 'corretagem') {
        await page.getByRole('button', { name: 'Casa', exact: true }).click();
        assert.equal(await page.locator('#imoveis article').count(), 1);
        assert.ok((await page.locator('#imoveis article').innerText()).includes('CL-202'));
        await page.getByRole('button', { name: 'Todos os imóveis', exact: true }).click();
        assert.equal(await page.locator('#imoveis article').count(), 3);
        const summary = page.locator('#imoveis summary').first(); await summary.focus(); await page.keyboard.press('Enter');
        assert.equal(await page.locator('#imoveis details').first().getAttribute('open'), '');
        await page.evaluate(async () => { for (const image of document.querySelectorAll('details[open] img')) { image.loading = 'eager'; await image.decode(); } });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Detalhes sem overflow');
        await page.keyboard.press('Enter');
      }
      await page.goto(site.url + '/' + site.anchor, { waitUntil: 'networkidle' });
      await page.waitForTimeout(100);
      const offset = await page.locator(site.anchor).evaluate(element => element.getBoundingClientRect().top);
      const header = await page.locator('header').evaluate(element => element.getBoundingClientRect().height);
      assert.ok(offset >= header - 2, 'Âncora visível abaixo do cabeçalho: ' + site.name + ' ' + width);
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const violations = axe.violations.map(item => ({ id: item.id, impact: item.impact, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }));
      checks.push({ site: site.name, width, overflow: false, axeViolations: violations, axeIncomplete: axe.incomplete.map(item => item.id) });
      await page.goto(site.url, { waitUntil: 'networkidle' });
      if ([390, 1440].includes(width)) await page.screenshot({ path: '.qa/' + site.name + '-' + width + '.png', fullPage: true, animations: 'disabled' });
      console.log(site.name + ' ' + width + 'px: interações OK; Axe ' + violations.length);
      await context.close();
    }
  }
  await writeFile('.qa/report.json', JSON.stringify({ browser: browser.version(), checks, errors }, null, 2));
  assert.deepEqual(errors, []);
  assert.deepEqual(checks.filter(check => check.axeViolations.length), [], 'Falhas de acessibilidade; consultar .qa/report.json');
  console.log('PASS: 18 combinações de projeto/largura. Relatório e capturas em .qa/.');
} finally { await browser.close(); for (const server of servers) server.kill(); }
