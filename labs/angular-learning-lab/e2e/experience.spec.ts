import { expect, test } from '@playwright/test';

test('persists the selected color theme', async ({ page }) => {
  await page.goto('/overview', { waitUntil: 'domcontentloaded' });
  const themeButton = page.getByRole('button', { name: /Ativar tema/ });
  const initialTheme = await page.locator('html').getAttribute('data-theme');
  await themeButton.click();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', initialTheme ?? '');
  const changedTheme = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', changedTheme ?? '');
});

test('mobile navigation opens and closes after selection', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Mobile-only behavior');
  await page.goto('/overview', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Abrir ou fechar navegação' }).click();
  await page.locator('.app-sidenav').getByRole('link', { name: /Coding Arena/ }).click();
  await expect(page).toHaveURL(/\/coding-arena$/);
  await expect(page.getByRole('heading', { name: 'Angular Coding Arena' })).toBeVisible();
});

test('every page exposes one primary heading', async ({ page }) => {
  for (const route of ['/overview', '/learning', '/documentation', '/sandbox', '/capstone']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main h1')).toHaveCount(1);
  }
});
