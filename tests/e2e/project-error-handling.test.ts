import { test, expect } from '@playwright/test';

// TODO: manual fix required – project-error-handling.test.ts is empty. Add e2e tests for error handling.

// Test: Prevent creating a project with an empty name
// Assumes there is a button to create a new project/constellation

test('should prevent creating a project with an empty name', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: /create new constellation/i }).click();
  await page.getByRole('button', { name: /create/i }).click();
  // Assert that an error message is shown and the name field is visible
  await expect(page.getByText(/name.*required|cannot be empty|please enter/i)).toBeVisible();
  await expect(page.getByLabel(/constellation name/i)).toBeVisible();
});

// Test: Upload a disallowed file type and assert error message
// Assumes there is a button to open import/upload dialog and a file input with label 'Upload' or similar

test('should show error on invalid file upload', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Open file upload dialog (adjust selector as needed)
  await page.getByRole('button', { name: /import|upload/i }).click();
  // Upload a disallowed file type (e.g., .exe)
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByLabel(/upload/i).click(),
  ]);
  await fileChooser.setFiles('tests/e2e/fixtures/invalid-file.exe');
  // Assert that an error message is shown
  await expect(page.getByText(/invalid|unsupported file|not allowed/i)).toBeVisible();
});

// TODO: Implement error handling e2e tests

test('placeholder: error handling', async ({ page }) => {
  await page.goto('/');
  // TODO: Simulate error and assert UI fallback
  expect(await page.title()).toContain('IdeaForge');
});
