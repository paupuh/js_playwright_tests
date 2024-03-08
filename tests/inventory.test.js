const { test, expect } = require('@playwright/test');
import { buttonsData, hamburgerMenu, loginData, productsData } from '../locators.js';
import { isUserLoggedIn, isProductAddedToCart } from '../functions.js';
// @ts-check

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

        let isHamburgerMenuHidden = await page.$eval(hamburgerMenu.menuOpen, (menu) => {
            return !menu.getAttribute('aria-hidden') === 'false';
        });
        await expect(isHamburgerMenuHidden).toEqual(false);
    });

//await expect(page.locator("div.bm-menu-wrap")).toBeHidden();

test('Hamburger menu closes when user clicks exit', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(hamburgerMenu.menuButton).click();
    await page.locator(hamburgerMenu.menuExit).click();

    let visibility = await page.locator("div.bm-menu-wrap").getAttribute('aria-hidden');
    console.log(visibility) // getting out value of above attributte and write it
    await expect(visibility).toEqual('true');
});

test ('Hamburger menu- no action taken when user selects "All items"', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(hamburgerMenu.menuButton).click();
    await page.locator(hamburgerMenu.allItems).click();

    let expectedURL = `${loginData.homeURL}${loginData.pageURL}`;
    await expect(page).toHaveURL(expectedURL);
});

test ('Hamburger menu- About opens, when user selects it', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(hamburgerMenu.menuButton).click();
    await page.locator(hamburgerMenu.aboutOpen).click();
    let expectedURL = 'https://saucelabs.com/';
    await expect(page).toHaveURL(expectedURL);
    //also check if elements on page exists
});

test ('Hamburger menu- Resets app state, when user selects it', async ({page}) => {
    await isUserLoggedIn(page);
    let addToCartButton = await page.$(`${buttonsData.addToCart}(${1})`);
    await addToCartButton.click();
    expect(await page.locator(buttonsData.addedToCart).innerHTML()).toEqual('1');
   
    await page.locator(hamburgerMenu.menuButton).click();
    await page.locator(hamburgerMenu.restet).click();
    expect(await page.locator(buttonsData.shoppingCart).innerHTML()).toEqual('');
    
});

test ('Hamburger menu- Logout, logging out user, when user selects it', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(hamburgerMenu.menuButton).click();
    await page.locator(hamburgerMenu.logOut).click();
    
    let expectedURL = 'https://www.saucedemo.com/';
    await expect(page).toHaveURL(expectedURL);
});

test('Add to cart button adds item to shopping cart', async ({ page }) => {
    await isUserLoggedIn(page);
    isProductAddedToCart
});

test('Remove button deletes item from shopping cart', async ({ page }) => {
    await isUserLoggedIn(page);
    let addToCartButton = await page.$(`${buttonsData.addToCart}(${1})`);
    await addToCartButton.click();
    let removeItemButton = await page.$(`${buttonsData.removeFromCart}`);
   
    if (removeItemButton) {
    await removeItemButton.click();
    expect(await page.locator(buttonsData.shoppingCart).innerHTML()).toEqual('');
    console.log('Test passed- item removed from cart')
    } else {
        console.error('Test failed');
}
});
