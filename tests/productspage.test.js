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
    await page.locator(buttonsData.productSort).click();
    await expect(page.getByRole('option', {name : 'Name (A to Z)'})).toBeEnabled();
    await expect(page.getByRole('option', {name : 'Name (Z to A)'})).toBeEnabled();
    await expect(page.getByRole('option', {name : 'Price (low to high)'})).toBeEnabled();
    await expect(page.getByRole('option', {name : 'Price (high to low)'})).toBeEnabled();
});
test('Sort list changes available for all options', async ({page}) => {
    await isUserLoggedIn(page);
    // A to Z
    let items = await page.$$eval('.inventory_item', (elements) =>
        elements.map((element) => element.textContent.trim())
    );
    let sortedItems = [...items].sort();
    expect(items).toEqual(sortedItems);
    // Z to A
    await page.locator(buttonsData.productSort).click();
    await page.locator(buttonsData.productSort).selectOption('Name (Z to A)');
    items = await page.$$eval('.inventory_item_price', (elements) =>
        elements.map((element) => element.textContent.trim().slice(1))
    );

    var nums = items.map(function(str) { return parseFloat(str); });

    // Check if the items are in alphabetical order
    sortedItems = [...nums].sort((a,b) => {a-b});

    expect(nums).toEqual(sortedItems);
     // Check if the items are in alphabetical order
    // await new Promise(r => setTimeout(r, 20000));
    // await page.getByRole('option', {name : 'Name (Z to A)'}).selectOption();

});

// const items = await page.$$eval('.inventory_list', (elements) =>
//         elements.map((element) => element.textContent.trim())
//     );

//     // Check if the items are in alphabetical order
//     const sortedItems = [...items].sort();
//     expect(items).toEqual(sortedItems);
// // test('User is able to add product to basket', async ({page}) => {
// //     await isUserLoggedIn(page);
// // }