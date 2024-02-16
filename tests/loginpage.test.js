const { test, expect } = require('@playwright/test');
import { isUserLoggedIn } from '../functions.js';

test('User is able open page', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(`Swag Labs`);
})

test('User loged in and on products page', async ({page}) => {
    await isUserLoggedIn(page);
});

