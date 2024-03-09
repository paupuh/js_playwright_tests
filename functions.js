const { test, expect } = require('@playwright/test');
import { buttonsData, loginData } from './locators';

async function isUserLoggedIn(page) {
    await page.goto('/');
    await page.locator(loginData.usernameField).click();
    await page.locator(loginData.usernameField).fill(loginData.loginData);
    await page.locator(loginData.passwordField).click();
    await page.locator(loginData.passwordField).fill(loginData.passwordData);
    await page.locator(loginData.loginButton).click();
  
    const expectedURL = `${loginData.homeURL}${loginData.pageURL}`;
    await expect(page).toHaveURL(expectedURL);
  }
  
async function isProductAddedToCart(page) {
    await isUserLoggedIn(page);
    let addToCartButton = await page.$(`${buttonsData.addToCart}(${1})`); // $ returning 1 element matching (from list)

  if (addToCartButton) {  // making sure that `addToCartButton` was found before click
      await addToCartButton.click();
      expect(await page.locator(buttonsData.addedToCart).textContent()).toEqual('1'); } 
      else {
      console.error('Test failed- Button "Add to cart" not found.');  // Dodaj odpowiednią obsługę błędów, jeśli potrzebujesz
  }
  }
  
  // problem z dokument, trzeba w inny sposob wyciagnac te wszystkie produkty z kontenera 
  module.exports = {
    isUserLoggedIn,
    isProductAddedToCart,
  }

