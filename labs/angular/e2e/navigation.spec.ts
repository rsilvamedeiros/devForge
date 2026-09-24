import { expect, test } from '@playwright/test';

test('navigates from the dashboard to the Angular Sandbox', async ({ page }) => {
  await page.goto('/overview', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Continue evoluindo em Angular' })).toBeVisible();
  await page.getByRole('link', { name: /Multiarquivo Angular Sandbox/ }).click();
  await expect(page).toHaveURL(/\/sandbox$/);
  await expect(page.getByRole('heading', { name: 'Angular Sandbox' })).toBeVisible();
});

test('global search opens the capstone project', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'The compact mobile header intentionally hides global search');
  await page.goto('/overview', { waitUntil: 'domcontentloaded' });
  await page.getByRole('searchbox', { name: 'Buscar no material de estudo' }).fill('Projeto Final');
  await page.getByRole('button', { name: /Projeto Final · Fundação/ }).click();
  await expect(page).toHaveURL(/\/capstone$/);
  await expect(page.getByRole('heading', { name: 'Projeto Final Angular' })).toBeVisible();
});
