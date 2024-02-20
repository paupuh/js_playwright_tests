const { test, expect } = require('@playwright/test');
import { buttonsData, hamburgerMenu, loginData } from '../variables.js';
import { isUserLoggedIn } from '../functions.js';

test('Product sort list unfolds when user clicks unfold button', async ({page}) => {
    await isUserLoggedIn(page);
    await expect(page.locator(buttonsData.productSort)).toBeVisible();
    await page.locator(buttonsData.productSort).click();
});

test('Product sort list contains 4 choices', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(buttonsData.productSort).click();
    await expect(page.getByRole('option', {name : 'Name (A to Z)'})).toBeEnabled();
    await expect(page.getByRole('option', {name : 'Name (Z to A)'})).toBeEnabled();
    await expect(page.getByRole('option', {name : 'Price (low to high)'})).toBeEnabled();
    await expect(page.getByRole('option', {name : 'Price (high to low)'})).toBeEnabled();
});

test('Product sort list default A-Z selected', async ({page}) => {
    await isUserLoggedIn(page);
    await expect(page.locator(buttonsData.defaultSort)).toBeVisible();
});

test('Sort list changes applicable for all options', async ({page}) => {
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
 
    items = await page.$$eval('.inventory_item', (elements) =>
        elements.map((element) => element.textContent.trim())
    );
 
    sortedItems = [...items].sort().reverse();
    expect(items).toEqual(sortedItems);
 
    //Low to High
    await page.locator(buttonsData.productSort).click();
    await page.locator(buttonsData.productSort).selectOption('Price (low to high)');
 
    items = await page.$$eval('.inventory_item_price', (elements) =>
        elements.map((element) => element.textContent.trim().slice(1))
    );
 
    var nums = items.map(function(str) { return parseFloat(str); });
 
    sortedItems = [...nums].sort((a,b) => {a-b});
    expect(nums).toEqual(sortedItems);
 
 
     //High to Low
     await page.locator(buttonsData.productSort).click();
     await page.locator(buttonsData.productSort).selectOption('Price (high to low)');
 
    items = await page.$$eval('.inventory_item_price', (elements) =>
        elements.map((element) => element.textContent.trim().slice(1))
    );
 
    var nums = items.map(function(str) { return parseFloat(str); });
 
    sortedItems = [...nums].sort((a,b) => {a-b});
    expect(nums).toEqual(sortedItems);

});
test('Hamburger menu opens when user clicks it', async ({page}) => {
        await isUserLoggedIn(page);
        await page.locator(hamburgerMenu.menuButton).click();

        const isHamburgerMenuHidden = await page.$eval(hamburgerMenu.menuOpen, (menu) => {
            return !menu.getAttribute('aria-hidden') === 'false';
        });
        await expect(isHamburgerMenuHidden).toEqual(false);
    });

    //await expect(page.locator("div.bm-menu-wrap")).toBeHidden();
