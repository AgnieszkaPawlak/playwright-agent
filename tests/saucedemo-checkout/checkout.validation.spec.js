const { test, expect } = require('@playwright/test');
const {
  addProductsForHappyPath,
  fillCheckoutInformation,
  login,
  openCart,
  startCheckout,
} = require('./helpers');

test.describe('SCRUM-101 validation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addProductsForHappyPath(page);
    await openCart(page);
    await startCheckout(page);
  });

  test('shows first name required when all checkout fields are empty', async ({ page }) => {
    await page.locator('[data-test="continue"]').click();

    await expect(page.getByRole('heading', { name: 'Error: First Name is required' })).toBeVisible();
    await expect(page.locator('[data-test="firstName"]')).toHaveAttribute('data-test', 'firstName');
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
  });

  test('shows last name required when only first name is filled', async ({ page }) => {
    await fillCheckoutInformation(page, {
      firstName: 'John',
      lastName: '',
      postalCode: '',
    });

    await page.locator('[data-test="continue"]').click();

    await expect(page.getByRole('heading', { name: 'Error: Last Name is required' })).toBeVisible();
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('');
  });

  test('shows postal code required when first and last name are filled', async ({ page }) => {
    await fillCheckoutInformation(page, {
      firstName: 'John',
      lastName: 'Smith',
      postalCode: '',
    });

    await page.locator('[data-test="continue"]').click();

    await expect(page.getByRole('heading', { name: 'Error: Postal Code is required' })).toBeVisible();
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Smith');
  });
});