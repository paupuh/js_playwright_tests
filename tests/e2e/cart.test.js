const { test, expect } = require('@playwright/test');
import { buttonsData, pageData, productsData } from '../pom/inventorypage.js';
import { isUserLoggedIn, isProductAddedToCart } from '../pom/loginpage.js';
import { assertURL, cartData, checkElementIsEnabled, clickElement } from '../pom/cartpage.js';
// @ts-check

test.beforeEach(async ({ page }) => {
    await isUserLoggedIn(page)
});

test ('Cart opens when user clicks shopping cart icon', async ({page}) => {      
    await page.locator(buttonsData.shoppingCart).click();

    await assertURL(page, cartData.cartUrl, pageData.pageTitle, 'Your Cart');
});

test ('When shopping cart contains at least 1 product all buttons enabled and directs to correct links', async ({page}) => {
    await isProductAddedToCart(page);

    await clickElement(page, buttonsData.shoppingCart);
    await checkElementIsEnabled(page, cartData.continueShpButton);
    await clickElement(page, cartData.continueShpButton);
    await assertURL(page, productsData.inventoryUrl, pageData.pageTitle, 'Products');

    await clickElement(page, buttonsData.shoppingCart);
    await checkElementIsEnabled(page, cartData.checkoutButton);
    await clickElement(page, cartData.checkoutButton);
    await assertURL(page, cartData.checkoutUrl, pageData.pageTitle, 'Checkout: Your Information');
});   

// BUG - TEST FAILED, reported in jira <jira link>. Remove skip when fixed
test.skip('When shopping cart is empty, checkout button is disabled', async ({ page }) => {
    await page.locator(buttonsData.shoppingCart).click();
    
    await clickElement(page, cartData.checkoutButton);
    await assertURL(page, cartData.checkoutUrl, pageData.pageTitle, 'Checkout: Your Information');
  });
  
test ('When shopping cart is empty, continue shopping button is enabled and directs to corret tab', async ({page}) => {
    await clickElement(page, buttonsData.shoppingCart);

    await clickElement(page, cartData.continueShpButton);
    await assertURL(page, productsData.inventoryUrl, pageData.pageTitle, 'Products');
});

test ('When the shopping cart contains at least one product, the user is directed to the checkout', async ({page}) => {
    await isProductAddedToCart(page);
    await clickElement(page, buttonsData.shoppingCart);

    await clickElement(page, cartData.checkoutButton);
    await checkElementIsEnabled(page, cartData.placeholderFirstName);
    await checkElementIsEnabled(page, cartData.placeholderLastName);
    await checkElementIsEnabled(page, cartData.placeholderZipCpde);
    await checkElementIsEnabled(page, cartData.cancelButton);
    await checkElementIsEnabled(page, cartData.continueButton);
});

test ('When user is in checkout tab can finish shopping process', async ({page}) => {
    await isProductAddedToCart(page);

    await clickElement(page, buttonsData.shoppingCart);
    await clickElement(page, cartData.checkoutButton);
    await page.locator(cartData.placeholderFirstName).fill(cartData.nameData);
    await page.locator(cartData.placeholderLastName).fill(cartData.surnameData);
    await page.locator(cartData.placeholderZipCpde).fill(cartData.zipData);

    await clickElement(page, cartData.continueButton);
    await assertURL(page, cartData.checkoutUrl2, pageData.pageTitle, 'Checkout: Overview');     

        await page.goto(cartData.cartUrl);
        const cartValue = await page.$eval('div.cart_quantity', element => element.textContent);
        await page.goto(cartData.checkoutUrl2);
        const checkoutValue = await page.$eval('div.cart_quantity', element => element.textContent);
        expect(cartValue).toEqual(checkoutValue);   // Comparing cart quantity 

        await clickElement(page, cartData.finishButton);
        await assertURL(page, cartData.checkoutCompleteUrl, pageData.pageTitle, 'Checkout: Complete!');     

        await clickElement(page, cartData.backHomeBtn)
        await assertURL(page, productsData.inventoryUrl, pageData.pageTitle, 'Products');     
});

// add test proving that user has to fiilin all of the fields, if not there is an error and user can't go to the next step

test ('User directed back to cart when checkout cancelled', async ({page}) => {    
    await isProductAddedToCart(page);

    await clickElement(page, buttonsData.shoppingCart);

    await clickElement(page, cartData.checkoutButton)
    await clickElement(page, cartData.cancelButton);
    await assertURL(page, cartData.cartUrl, pageData.pageTitle, 'Your Cart');     
});
