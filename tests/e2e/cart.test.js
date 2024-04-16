const { test, expect } = require('@playwright/test');
import { buttonsData, pageData, productsData } from '../pom/inventorypage.js';
import { isUserLoggedIn, isProductAddedToCart } from '../pom/loginpage.js';
import { confirmURL, cartData, checkElementIsEnabled, clickElement, fillForm, compareQuantity } from '../pom/cartpage.js';
// @ts-check

test.beforeEach(async ({ page }) => {
    await isUserLoggedIn(page)
});

test ('Cart opens when user clicks shopping cart icon', async ({page}) => {      
    await clickElement(page, buttonsData.shoppingCart)

    await confirmURL(page, cartData.cartUrl, pageData.pageTitle, 'Your Cart');
});

test ('When shopping cart contains at least 1 product all buttons enabled and directs to correct links', async ({page}) => {
    await isProductAddedToCart(page);

    await clickElement(page, buttonsData.shoppingCart);
    await checkElementIsEnabled(page, cartData.continueShpButton);
    await clickElement(page, cartData.continueShpButton);
    await confirmURL(page, productsData.inventoryUrl, pageData.pageTitle, 'Products');

    await clickElement(page, buttonsData.shoppingCart);
    await checkElementIsEnabled(page, cartData.checkoutButton);
    await clickElement(page, cartData.checkoutButton);
    await confirmURL(page, cartData.checkoutUrl, pageData.pageTitle, 'Checkout: Your Information');
});   

// BUG - TEST FAILED, reported in jira <jira link>. Remove skip when fixed
test.skip('When shopping cart is empty, checkout button is disabled', async ({ page }) => {
    await clickElement(page, buttonsData.shoppingCart);

    await clickElement(page, cartData.checkoutButton);
    await confirmURL(page, cartData.checkoutUrl, pageData.pageTitle, 'Checkout: Your Information');
  });
  
test ('When shopping cart is empty, continue shopping button is enabled and directs to corret tab', async ({page}) => {
    await clickElement(page, buttonsData.shoppingCart);

    await clickElement(page, cartData.continueShpButton);
    await confirmURL(page, productsData.inventoryUrl, pageData.pageTitle, 'Products');
});

test ('When the shopping cart contains at least one product, the user is directed to the checkout', async ({page}) => {
    await isProductAddedToCart(page);
    await clickElement(page, buttonsData.shoppingCart);

    await clickElement(page, cartData.checkoutButton);
    await checkElementIsEnabled(page, 
        cartData.placeholderFirstName, 
        cartData.placeholderLastName, 
        cartData.placeholderZipCpde, 
        cartData.cancelButton, 
        cartData.continueButton);
});


test ('When user is in checkout tab can finish shopping process', async ({page}) => {
    await isProductAddedToCart(page);

    await clickElement(page, buttonsData.shoppingCart);
    await clickElement(page, cartData.checkoutButton);

    await fillForm(page, cartData.placeholderFirstName, cartData.nameData);
    await fillForm(page, cartData.placeholderLastName, cartData.surnameData);
    await fillForm(page, cartData.placeholderZipCpde, cartData.zipData)

    await clickElement(page, cartData.continueButton);
    await confirmURL(page, cartData.checkoutUrl2, pageData.pageTitle, 'Checkout: Overview');     

    const cartValue = await compareQuantity(page, cartData.cartUrl, 'div.cart_quantity');
    const checkoutValue = await compareQuantity(page, cartData.checkoutUrl2, 'div.cart_quantity');
    expect(cartValue).toEqual(checkoutValue);
        
        await clickElement(page, cartData.finishButton);
        await confirmURL(page, cartData.checkoutCompleteUrl, pageData.pageTitle, 'Checkout: Complete!');     

        await clickElement(page, cartData.backHomeBtn)
        await confirmURL(page, productsData.inventoryUrl, pageData.pageTitle, 'Products');     
});

// #add test proving that user has to fiilin all of the fields, if not there is an error and user can't go to the next step

test ('User directed back to cart when checkout cancelled', async ({page}) => {    
    await isProductAddedToCart(page);

    await clickElement(page, buttonsData.shoppingCart);
    await clickElement(page, cartData.checkoutButton)
    await clickElement(page, cartData.cancelButton);
    await confirmURL(page, cartData.cartUrl, pageData.pageTitle, 'Your Cart');     
});
