const { test, expect } = require('@playwright/test');
import { buttonsData, loginData } from './variables';

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
  
  // problem z dokument, trzeba w inny sposob wyciagnac te wszytskei rpodukty z konteenera 
  module.exports = {
    isUserLoggedIn,
  };
  
  async function isAlph(){
    let items = document.getElementsByClassName('.inventory_item_name ');

    let lastLetter = undefined

    items.forEach(item => {
        console.log(typeof item)
        if(!undefined && lastLetter <= item)
            return false;

        lastLetter = item;
    });

    return false;
}