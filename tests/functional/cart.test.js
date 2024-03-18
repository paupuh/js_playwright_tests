const { test, expect } = require('@playwright/test');
import { buttonsData, productsData } from '../pom/inventorypage.js';
import { isUserLoggedIn, isProductAddedToCart } from '../pom/loginpage.js';
import { assertURL, cartData } from '../pom/cartpage.js';

// @ts-check

test.beforeEach(async ({ page }) => {
    await isUserLoggedIn(page)
});

test ('Cart opens when user clicks shopping cart icon', async ({page}) => {      
    await page.locator(buttonsData.shoppingCart).click();

    await assertURL(page, cartData.cartUrl);
});

test ('When shopping cart contains at least 1 product all buttons enabled and directs to correct links', async ({page}) => {
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();

    await expect (page.locator(cartData.continueShpButton)).toBeEnabled();
    await page.locator(cartData.continueShpButton).click();
    await assertURL(page, productsData.inventoryUrl);

    await page.locator(buttonsData.shoppingCart).click();
    await expect (page.locator(cartData.checkoutButton)).toBeEnabled();
    await page.locator(cartData.checkoutButton).click();
    await assertURL(page, cartData.checkoutUrl);
});   

// BUG - TEST FAILED, reported in jira <jira link>. Remove skip when fixed
test.skip('When shopping cart is empty, checkout button is disabled', async ({ page }) => {
    await page.locator(buttonsData.shoppingCart).click();
  
    await page.locator(cartData.checkoutButton).click();
    await assertURL(page, cartData.checkoutUrl);
  });
  
test ('When shopping cart is empty, continue shopping button is enabled and directs to corret tab', async ({page}) => {
    await page.locator(buttonsData.shoppingCart).click();

    await page.locator(cartData.continueShpButton).click();
    await assertURL(page, productsData.inventoryUrl);
});

test ('When the shopping cart contains at least one product, the user is directed to the checkout', async ({page}) => {
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();

    await page.locator(cartData.checkoutButton).click();
    expect (await page.locator(cartData.placeholderFirstName)).toBeEnabled();
    expect (await page.locator(cartData.placeholderLastName)).toBeEnabled();
    expect (await page.locator(cartData.placeholderZipCpde)).toBeEnabled();
    expect (await page.locator(cartData.cancelButton)).toBeEnabled();
    expect (await page.locator(cartData.continueButton)).toBeEnabled();
});

test ('When user is in checkout tab can finish shopping process', async ({page}) => {
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();
    await page.locator(cartData.checkoutButton).click();
    await page.locator(cartData.placeholderFirstName).fill(cartData.nameData);
    await page.locator(cartData.placeholderLastName).fill(cartData.surnameData);
    await page.locator(cartData.placeholderZipCpde).fill(cartData.zipData);

    await page.locator(cartData.continueButton).click();
    await assertURL(page, cartData.checkoutUrl2); 
    // expect (await page.locator(cartData.productQuantity)).toBeVisible();
    // expect (await page.locator(cartData.productPrice)).toBeVisible();
    // expect (await page.locator(cartData.totalPrice)).toBeVisible();     

        await page.goto(cartData.cartUrl);
        const cartValue = await page.$eval('div.cart_quantity', element => element.textContent);
        await page.goto(cartData.checkoutUrl2);
        const checkoutValue = await page.$eval('div.cart_quantity', element => element.textContent);
        expect(cartValue).toEqual(checkoutValue);   // Compare cart quantity 

        await page.locator(cartData.finishButton).click();
        await assertURL(page,cartData.checkoutCompleteUrl);

        await page.locator(cartData.backHomeBtn).click();
        await assertURL(page, productsData.inventoryUrl);
});

// add test proving that user has to fiilin all of the fields, if not there is an error and user can't go to the next step

test ('User directed back to cart when checkout cancelled', async ({page}) => {    
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();
    await page.locator(cartData.checkoutButton).click();
    await page.locator(cartData.cancelButton).click();
    await assertURL(page, cartData.cartUrl);
});