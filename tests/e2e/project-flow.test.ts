// TODO: manual fix required – project-flow.test.ts is empty. Add end-to-end tests for project flow.
// /Users/allisongattone/Documents/GitHub/ideaforge/tests/e2e/project-flow.test.ts
import { test, expect } from '@playwright/test';

// TODO: Implement end-to-end project flow tests

test('placeholder: project flow', async ({ page }) => {
  await page.goto('/');
  // TODO: Add actual flow steps
  expect(await page.title()).toContain('IdeaForge');
});

test('Project Flow: Create, Edit, and Delete Project and Idea', async ({ page }) => {
  // ── Reset App State ──────────────────────────────────
  await page.goto('http://localhost:3000');
  await page.evaluate(async () => {
    localStorage.clear();
    sessionStorage.clear();
    if ('indexedDB' in window) {
      if (typeof indexedDB.databases === 'function') {
        const dbs: { name?: string }[] = await indexedDB.databases();
        await Promise.all(
          dbs.map((db: { name?: string }) => db.name && indexedDB.deleteDatabase(db.name))
        );
        dbs.forEach((db: { name?: string }) => db.name && indexedDB.deleteDatabase(db.name));
      } else {
        // Fallback: try deleting common database names if databases() is not supported
        const dbNames = ['constellations', 'ideas', 'projects']; // Add known DB names here
        dbNames.forEach(name => indexedDB.deleteDatabase(name));
      }
    }
  });
  await page.reload();
  await page.waitForLoadState('networkidle');

  // ── Create New Project ───────────────────────────────
  await page.getByRole('button', { name: 'Create new constellation' }).click();
  await page.getByLabel('Constellation Name').fill('Test Project');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByText('Test Project')).toBeVisible();

  // ── Open Project ─────────────────────────────────────
  await page.getByText('Test Project').click();

  // ── Add Idea ─────────────────────────────────────────
  await page.getByRole('button', { name: 'Create new blueprint' }).click();
  await page.getByLabel('Blueprint Title*').fill('Test Idea');
  await page.getByRole('button', { name: 'Save Blueprint' }).click();
  await expect(page.getByText('Test Idea')).toBeVisible();

  // ── Edit Idea ────────────────────────────────────────
  await page.getByText('Test Idea').click();
  await page.getByLabel('Blueprint Title*').fill('Test Idea Updated');
  await page.getByRole('button', { name: 'Save Blueprint' }).click();
  await expect(page.getByText('Test Idea Updated')).toBeVisible();

  // ── Delete Idea ──────────────────────────────────────
  await page.getByTitle('Disassemble idea').click();
  await page.getByRole('button', { name: 'Disassemble' }).click();
  await expect(page.getByText('Test Idea Updated')).toHaveCount(0);

  // ── Return to Project List ───────────────────────────
  await page.getByRole('button', { name: 'Back to Navigator' }).click();
  await expect(page.getByText('Test Project')).toBeVisible();

  // ── Delete Project ───────────────────────────────────
  await page.getByRole('button', { name: 'Delete Constellation' }).click();
  await expect(page.locator('text=Test Project')).toHaveCount(0);
});