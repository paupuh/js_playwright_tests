import { buttonsData } from './inventorypage.js';
const { test, expect } = require('@playwright/test');

//Locators
export class loginData {
    static homeURL = 'https://www.saucedemo.com/';
    static loginData = 'standard_user';
    static loginButton = '#login-button';
    static pageURL = 'inventory.html';
    static passwordField = '#password';
    static passwordData = 'secret_sauce';
    static usernameField = '#user-name';
}

//Actions   
export async function isUserLoggedIn(page) {
    await page.goto('/');
    await page.locator(loginData.usernameField).click();
    await page.locator(loginData.usernameField).fill(loginData.loginData);
    await page.locator(loginData.passwordField).click();
    await page.locator(loginData.passwordField).fill(loginData.passwordData);
    await page.locator(loginData.loginButton).click();
  
    const expectedURL = `${loginData.homeURL}${loginData.pageURL}`;
    await expect(page).toHaveURL(expectedURL);
  }
  
export async function isProductAddedToCart(page) {
    await isUserLoggedIn(page);
    let addToCartButton = await page.$(`${buttonsData.addToCart}(${1})`); // $ returning 1 element matching (from list)

  if (addToCartButton) {  // making sure that `addToCartButton` was found before click
      await addToCartButton.click();
      expect(await page.locator(buttonsData.addedToCart).textContent()).toEqual('1'); } 
      else {
      console.error('Test failed- Button "Add to cart" not found.');  // Dodaj odpowiednią obsługę błędów, jeśli potrzebujesz
  }
  }
  
module.exports = {
    isUserLoggedIn,
    isProductAddedToCart,
  }





