// playwright-axe-setup.ts
// This file sets up axe-core accessibility checks for Playwright tests

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.beforeEach(async ({ page }) => {
  await injectAxe(page);
});

export async function runA11y(page: any, context = 'body') {
  await checkA11y(page, context, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
}

test.describe('Accessibility checks with axe-core', () => {
  test('Landing page has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await runA11y(page);
    expect(results.violations.length).toBe(0);
  });

  test('Project Manager page has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    // Simulate entering the forge (project manager)
    await page.getByRole('button', { name: /Enter the Forge/i }).click();
    const results = await runA11y(page);
    expect(results.violations.length).toBe(0);
  });

  test('Idea Editor page has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    // Enter the forge and create a new project
    await page.getByRole('button', { name: /Enter the Forge/i }).click();
    await page.getByRole('button', { name: /Create Constellation/i }).click();
    await page.getByLabel('Project Name').fill('A11y Test Project');
    await page.getByRole('button', { name: /Ignite/i }).click();
    // Click "New Blueprint" to open IdeaEditor
    await page.getByRole('button', { name: /New Blueprint/i }).click();
    const results = await runA11y(page);
    expect(results.violations.length).toBe(0);
  });
});
