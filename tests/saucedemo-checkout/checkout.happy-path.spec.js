const { test, expect } = require('@playwright/test');
const {
  addProductsForHappyPath,
  fillCheckoutInformation,
  login,
  openCart,
  startCheckout,
} = require('./helpers');

test.describe('SCRUM-101 happy path', () => {
  test('completes checkout from cart review through order confirmation', async ({ page }) => {
    await login(page);
    await expect(page.getByText('Products')).toBeVisible();

    await addProductsForHappyPath(page);
    await openCart(page);

    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();
    await expect(page.getByText('$9.99')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    await startCheckout(page);

    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

    await fillCheckoutInformation(page, {
      firstName: 'John',
      lastName: 'Smith',
      postalCode: '12345',
    });
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Item total: $39.98')).toBeVisible();
    await expect(page.getByText('Tax: $3.20')).toBeVisible();
    await expect(page.getByText('Total: $43.18')).toBeVisible();

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(page.getByText('Checkout: Complete!')).toBeVisible();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();

    await page.locator('[data-test="back-to-products"]').click();

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
  });
});