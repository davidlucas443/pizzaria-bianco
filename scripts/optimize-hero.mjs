import { chromium } from 'playwright-core';
import { readFile, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage();
  const source = 'data:image/png;base64,' + (await readFile('design/bianco/margherita-source.png')).toString('base64');
  for (const size of [480, 800, 1280]) {
    const data = await page.evaluate(async ({ size, source }) => {
      const img = new Image(); img.src = source; await img.decode();
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
      canvas.getContext('2d').drawImage(img, 0, 0, size, size);
      return canvas.toDataURL('image/webp', .84).split(',')[1];
    }, { size, source });
    await writeFile(`src/assets/bianco-margherita-${size}.webp`, Buffer.from(data, 'base64'));
  }
} finally { await browser.close(); }
