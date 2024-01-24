const { test, expect } = require('@playwright/test');
import { buttonsData, loginData } from '../variables.js';
import { isUserLoggedIn } from '../functions.js';
test.slow();
test('User is able open page', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(`Swag Labs`);
})

test('User logedin and on products page', async ({page}) => {
    await isUserLoggedIn(page);
});

test('Product sort list unfolds', async ({page}) => {
    await isUserLoggedIn(page);
    expect(page.getByText('Name (A to Z)')).toBeVisible();
    // expect(page.getByText('Name (A to Z)')).click();
});