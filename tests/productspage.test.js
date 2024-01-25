const { test, expect } = require('@playwright/test');
import { buttonsData, loginData } from '../variables.js';
import { isUserLoggedIn } from '../functions.js';

test('Product sort list unfolds', async ({page}) => {
    await isUserLoggedIn(page);
    await expect(page.locator(buttonsData.productSort)).toBeVisible();
    await page.locator(buttonsData.productSort).click();
});

test('Product sort list default A-Z selected', async ({page}) => {
    await isUserLoggedIn(page);
    await expect(page.locator(buttonsData.defaultSort)).toBeVisible();
});
test('Product contains all items on products page', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator("Name (A to Z)").click();
});
// test('Sort list changes available for all options', async ({page}) => {
//     await isUserLoggedIn(page);
// }
// test('User is able to add product to backet', async ({page}) => {
//     await isUserLoggedIn(page);
// }