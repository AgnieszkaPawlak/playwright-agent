const { expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com';
const STANDARD_USER = 'standard_user';
const PASSWORD = 'secret_sauce';

async function login(page) {
  await page.goto(BASE_URL);
  await page.locator('[data-test="username"]').fill(STANDARD_USER);
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html$/);
}

async function addProductsForHappyPath(page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
}

async function openCart(page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html$/);
}

async function startCheckout(page) {
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
}

async function fillCheckoutInformation(page, details) {
  const { firstName = '', lastName = '', postalCode = '' } = details;

  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);
}

async function completeHappyPathCheckout(page) {
  await login(page);
  await addProductsForHappyPath(page);
  await openCart(page);
  await startCheckout(page);
  await fillCheckoutInformation(page, {
    firstName: 'John',
    lastName: 'Smith',
    postalCode: '12345',
  });
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(/checkout-step-two\.html$/);
}

module.exports = {
  BASE_URL,
  PASSWORD,
  STANDARD_USER,
  addProductsForHappyPath,
  completeHappyPathCheckout,
  fillCheckoutInformation,
  login,
  openCart,
  startCheckout,
};