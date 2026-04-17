const { test, expect } = require('@playwright/test');
const {
  addProductsForHappyPath,
  login,
  openCart,
} = require('./helpers');

test.describe('SCRUM-101 responsive behavior', () => {
  test('keeps cart and checkout controls usable on a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await login(page);
    await addProductsForHappyPath(page);
    await openCart(page);

    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    const layout = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.innerWidth + 1);
  });
});