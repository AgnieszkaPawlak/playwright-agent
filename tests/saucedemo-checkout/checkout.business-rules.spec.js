const { test, expect } = require('@playwright/test');
const {
  login,
  openCart,
} = require('./helpers');

test.describe('SCRUM-101 business rules', () => {
  test('blocks checkout when the cart is empty', async ({ page }) => {
    test.fail(true, 'Known product defect: checkout proceeds with an empty cart.');

    await login(page);
    await openCart(page);

    await expect(page.locator('.cart_item')).toHaveCount(0);
    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.getByText(/cart cannot be empty/i)).toBeVisible();
  });
});