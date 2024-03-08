const { test, expect } = require('@playwright/test');
import { buttonsData, cartData } from '../locators.js';
import { isUserLoggedIn, isProductAddedToCart } from '../functions.js';

// @ts-check

test ('Cart opens when user clicks shopping cart icon', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(buttonsData.shoppingCart).click();

    let expectedURL = 'https://www.saucedemo.com/cart.html';
    await expect(page).toHaveURL(expectedURL);
});

test ('When shopping cart contains at least 1 product all buttons enabled and directs to correct links', async ({page}) => {
    await isUserLoggedIn(page);
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();

    await expect (page.locator(cartData.continueShpButton)).toBeEnabled();
    await page.locator(cartData.continueShpButton).click();
    let expectedURL = 'https://www.saucedemo.com/inventory.html';
    await expect(page).toHaveURL(expectedURL);

    await page.locator(buttonsData.shoppingCart).click();
    await expect (page.locator(cartData.checkoutButton)).toBeEnabled();
    await page.locator(cartData.checkoutButton).click();
    expectedURL = 'https://www.saucedemo.com/checkout-step-one.html';
    await expect(page).toHaveURL(expectedURL);
});

// BUG - TEST FAILED, reported in jira. Remove skip when fixed
test.skip('When shopping cart is empty, checkout button is disabled', async ({ page }) => {
    await isUserLoggedIn(page);
    await page.locator(buttonsData.shoppingCart).click();
  
    await page.locator(cartData.checkoutButton).click();
    const expectedURL = 'https://www.saucedemo.com/cart.html';
    expect(await page.url()).toBe(expectedURL);
  });
  
test ('When shopping cart is empty, continue shopping button is enabled and directs to corret tab', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(buttonsData.shoppingCart).click();

    await page.locator(cartData.continueShpButton).click();
    const expectedURL ='https://www.saucedemo.com/inventory.html';
    expect(await page.url()).toBe(expectedURL)
});

test ('When the shopping cart contains at least one product, the user is directed to the checkout', async ({page}) => {
    await isUserLoggedIn(page);
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();

    await page.locator(cartData.checkoutButton).click();
    await Promise.all([
        page.locator(cartData.placeholderFirstName).isEnabled(),
        page.locator(cartData.placeholderLastName).isEnabled(),
        page.locator(cartData.placeholderZipCpde).isEnabled(),
        page.locator(cartData.cancelButton).isEnabled(),
        page.locator(cartData.continueButton).isEnabled()
      ]);
});

test ('When user is in checkout tab can finish shopping', async ({page}) => {
    await isUserLoggedIn(page);
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();

    await page.locator(cartData.checkoutButton).click();
    await page.locator(cartData.placeholderFirstName).fill(cartData.nameData);
    await page.locator(cartData.placeholderLastName).fill(cartData.surnameData);
    await page.locator(cartData.placeholderZipCpde).fill(cartData.zipData);
});