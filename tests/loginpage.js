const { test, expect } = require('@playwright/test');
import TestData from /Users/paulinapuhlmann/js_playwright_tests/tests/variables.js

test('User is able open page', async ({page}) => {
    await page.goto(TestData.baseURL);
    await expect(page).toHaveTitle(`Swag Labs`);

})

test('User logedin and on products page', async ({page}) => {
    await page.goto(TestData.baseURL);
    await page.locator(TestData.usernameField).click();
    await page.locator(TestData.usernameField).fill(loginData);
    await page.locator(TestData.passwordField).click();
    await page.locator(TestData.passwordField).fill(passwordData);
    await page.locator(TestData.loginButton).click();
    const expectedURL = `${TestData.baseURL}${TestData.pageURL}`;
    await expect(page).toHaveURL(expectedURL);
});



// test('Product sort list unfolds', async ({page}) => {
//     await page.goto(baseURL);
//     await page.locator()
// }


// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
