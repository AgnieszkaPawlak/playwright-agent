// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Happy Path Checkout Flow', () => {
  test('Complete Checkout Process - AC1 through AC4', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com and login with credentials (standard_user/secret_sauce)
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify login success and products page
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.getByText('Products')).toBeVisible();

    // 2. Add 2 items to cart (Sauce Labs Backpack $29.99, Sauce Labs Bike Light $9.99)
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // Verify items added to cart
    const cartCounter = page.locator('[data-test="shopping-cart-link"]');
    await expect(cartCounter).toHaveText('2');
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

    // 3. Click on shopping cart icon to navigate to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    // Verify cart page
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.getByText('Your Cart')).toBeVisible();

    // 4. Verify cart review functionality (AC1)
    await expect(page.getByText('QTY')).toBeVisible();
    await expect(page.getByText('Description')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();
    await expect(page.getByText('$9.99')).toBeVisible();
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    // 5. Click 'Checkout' button to proceed to checkout information
    await page.locator('[data-test="checkout"]').click();
    
    // Verify checkout information page
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

    // 6. Fill in checkout information form (AC2): First Name: 'John', Last Name: 'Smith', Zip: '12345'
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Smith');
    await page.locator('[data-test="postalCode"]').fill('12345');
    
    // Verify form fields and buttons
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();
    await expect(page.locator('[data-test="continue"]')).toBeVisible();

    // 7. Click 'Continue' button to proceed to order overview
    await page.locator('[data-test="continue"]').click();
    
    // Verify order overview page
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(page.getByText('Checkout: Overview')).toBeVisible();

    // 8. Verify order overview functionality (AC3)
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('Payment Information:')).toBeVisible();
    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Shipping Information:')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Item total: $39.98')).toBeVisible();
    await expect(page.getByText('Tax: $3.20')).toBeVisible();
    await expect(page.getByText('Total: $43.18')).toBeVisible();
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();
    await expect(page.locator('[data-test="finish"]')).toBeVisible();

    // 9. Click 'Finish' button to complete the order
    await page.locator('[data-test="finish"]').click();
    
    // Verify order completion page
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(page.getByText('Checkout: Complete!')).toBeVisible();

    // 10. Verify order completion functionality (AC4)
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByText('Your order has been dispatched')).toBeVisible();
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    
    // Verify cart counter disappeared (cart cleared)
    const cartCounterAfterOrder = page.locator('[data-test="shopping-cart-link"]').locator('.shopping_cart_badge');
    await expect(cartCounterAfterOrder).not.toBeVisible();

    // 11. Click 'Back Home' button to return to products page
    await page.locator('[data-test="back-to-products"]').click();
    
    // Verify return to products page
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
  });
});