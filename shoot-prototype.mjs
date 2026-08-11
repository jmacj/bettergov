// PROTOTYPE — throwaway screenshot harness for /prototype/contribute.
import { chromium } from '@playwright/test';

const OUT = process.argv[2];
const variants = [
  ['A', 'Appended to join-us'],
  ['B', 'join-us rebuilt around it'],
  ['C', 'New contribute page'],
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});

for (const [key, name] of variants) {
  const url = `http://localhost:5173/prototype/contribute?variant=${key}&copy=shared`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  // The switcher is fixed-position, so in a full-page shot it lands in the
  // middle of the image and covers a row. It is a prototype control, not part
  // of the design being judged — hide it for the send screenshots.
  await page.addStyleTag({
    content:
      '.fixed.bottom-5, [data-prototype-bar] { display: none !important; }',
  });
  const file = `${OUT}/variant-${key}.png`;
  await page.screenshot({ path: file, fullPage: true });
  const h = await page.evaluate(() => document.body.scrollHeight);
  console.log(`${key} — ${name}: ${file} (page height ${h}px)`);
}

await browser.close();
