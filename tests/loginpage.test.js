const { test, expect } = require('@playwright/test');
import { isUserLoggedIn } from '../functions.js';
// @ts-check

test('User is able open page @smoke', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(`Swag Labs`);
})

test('User logged in and on products page @smoke', async ({page}) => {
    await isUserLoggedIn(page);
});

