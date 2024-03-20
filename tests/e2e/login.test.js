const { test, expect } = require('@playwright/test');
import { isUserLoggedIn } from '../pom/loginpage.js';
// @ts-check

test.beforeEach(async ({ page }) => {
    await isUserLoggedIn(page)  
});

test('User is able open page', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(`Swag Labs`);
})


