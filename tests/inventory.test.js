const { test, expect } = require('@playwright/test');
import { buttonsData, hamburgerMenu, loginData, productsData } from '../locators.js';
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

test('Hamburger menu closes when user clicks exit', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(hamburgerMenu.menuButton).click();
    await page.locator(hamburgerMenu.menuExit).click();

    const visibility = await page.locator("div.bm-menu-wrap").getAttribute('aria-hidden');
    console.log(visibility) // wyciagam value atrybutu wyzej i wypisuje 
    await expect(visibility).toEqual('true');
});

test ('Hamburger menu- no action taken when user selects "All items"', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(hamburgerMenu.menuButton).click();
    await page.locator(hamburgerMenu.allItems).click();

    const expectedURL = `${loginData.homeURL}${loginData.pageURL}`;
    await expect(page).toHaveURL(expectedURL);
});

test ('Hamburger menu- About opens, when user selects it', async ({page}) => {
    await isUserLoggedIn(page);
    await page.locator(hamburgerMenu.menuButton).click();
    await page.locator(hamburgerMenu.aboutOpen).click();
    const expectedURL = 'https://saucelabs.com/';
    await expect(page).toHaveURL(expectedURL);
    //also check if elements on page exists
});

// test ('Hamburger menu- Resets app state, when user selects it', async ({page}) => {

// });

// test ('Hamburger menu- Logout, logging out user, when user selects it', async ({page}) => {

// });

test('Add to cart button adding item to shopping cart', async ({ page }) => {
    await isUserLoggedIn(page);
    const buttonIndex = 1;  // change index to targeted one
    const addToCartButton = await page.$(`${productsData.addToCart}(${buttonIndex})`);

    if (addToCartButton) {  // making sure that `addToCartButton` was found before click
        await addToCartButton.click();
        console.log('Test passed- Button "Add to cart" is clicable')
    } else {
        console.error('Test failed- Button "Add to cart" not found.');  // Dodaj odpowiednią obsługę błędów, jeśli potrzebujesz
    }
});
