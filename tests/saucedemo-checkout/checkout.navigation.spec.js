const { test, expect } = require('@playwright/test');
const {
  BASE_URL,
  PASSWORD,
  STANDARD_USER,
  addProductsForHappyPath,
  login,
  openCart,
  startCheckout,
} = require('./helpers');

test.describe('SCRUM-101 navigation and access control', () => {
  test('redirects unauthenticated direct cart access back to login', async ({ page }) => {
    await page.goto(`${BASE_URL}/cart.html`);

    await expect(page).toHaveURL(BASE_URL + '/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('cancel from checkout information returns to cart with items intact', async ({ page }) => {
    await login(page);
    await addProductsForHappyPath(page);
    await openCart(page);
    await startCheckout(page);

    await page.locator('[data-test="cancel"]').click();

    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  });

  test('browser back from checkout information returns to cart', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('[data-test="username"]').fill(STANDARD_USER);
    await page.locator('[data-test="password"]').fill(PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.goBack();

    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });
});