// PROTOTYPE — throwaway screenshot harness for /prototype/contribute.
import { chromium } from '@playwright/test';

const OUT = process.argv[2];
// Variant C is the one being sent. These are its three hero treatments, on
// tuned copy.
const variants = [
  ['1', 'Utility (Ideas lineage)'],
  ['2', 'Brand (Home lineage)'],
  ['3', 'Editorial (JoinUs lineage)'],
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});

for (const [key, name] of variants) {
  const url = `http://localhost:5173/prototype/contribute?variant=C&copy=tuned&hero=${key}`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  // The switcher is fixed-position, so in a full-page shot it lands in the
  // middle of the image and covers a row. It is a prototype control, not part
  // of the design being judged — hide it for the send screenshots.
  await page.addStyleTag({
    content:
      '.fixed.bottom-5, [data-prototype-bar] { display: none !important; }',
  });
  // Full page: shows the hero in context of the list beneath it.
  const file = `${OUT}/hero-${key}.png`;
  await page.screenshot({ path: file, fullPage: true });

  // Above the fold: the crop that actually lets someone judge the hero as a
  // hero, rather than as a band at the top of a 2700px page.
  const fold = `${OUT}/hero-${key}-fold.png`;
  await page.screenshot({ path: fold, fullPage: false });

  const h = await page.evaluate(() => document.body.scrollHeight);
  console.log(`${key} — ${name}: full ${h}px + above-fold crop`);
}

await browser.close();
