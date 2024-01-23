const { test, expect } = require('@playwright/test');
import { buttonsData, loginData } from '../variables.js';

test('User is able open page', async ({page}) => {
    await page.goto(loginData.homeURL);
    await expect(page).toHaveTitle(`Swag Labs`);

})

test('User logedin and on products page', async ({page}) => {
    await page.goto(loginData.homeURL);
    await page.locator(loginData.usernameField).click();
    await page.locator(loginData.usernameField).fill(loginData.loginData);
    await page.locator(loginData.passwordField).click();
    await page.locator(loginData.passwordField).fill(loginData.passwordData);
    await page.locator(loginData.loginButton).click();
    const expectedURL = `${loginData.homeURL}${loginData.pageURL}`;
    await expect(page).toHaveURL(expectedURL);
});

test('Product sort list unfolds', async ({page}) => {
    await page.goto(loginData.homeURL);
    await page.locator(buttonsData.productSort);

});
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
