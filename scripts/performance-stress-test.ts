// TODO: manual fix required – performance-stress-test.ts is empty. Add performance test script or remove if unused.
// Simulate creating 100+ projects/ideas and log response times and memory usage

import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  const start = Date.now();
  for (let i = 0; i < 100; i++) {
    await page.getByRole('button', { name: /create new constellation/i }).click();
    await page.getByLabel(/constellation name/i).fill(`Project ${i + 1}`);
    await page.getByRole('button', { name: /create/i }).click();
  }
  const end = Date.now();
  console.log(`Created 100 projects in ${end - start}ms`);
  const memory = await page.evaluate(() => window.performance.memory?.usedJSHeapSize);
  console.log('Used JS Heap Size:', memory);
  await browser.close();
})();

// TODO: Implement performance/load test script
