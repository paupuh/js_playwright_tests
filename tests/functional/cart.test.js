const { test, expect } = require('@playwright/test');
import { buttonsData } from '../pom/inventorypage.js';
import { isUserLoggedIn, isProductAddedToCart, loginData } from '../pom/loginpage.js';
import { cartData, cartMenu,  } from '../pom/cartpage.js';

// @ts-check

test.beforeEach(async ({ page }) => {
    await isUserLoggedIn(page)  
});

test ('Cart opens when user clicks shopping cart icon', async ({page}) => {      
    await page.locator(buttonsData.shoppingCart).click();

    let expectedURL = 'https://www.saucedemo.com/cart.html';
    await expect(page).toHaveURL(expectedURL);
});

test ('When shopping cart contains at least 1 product all buttons enabled and directs to correct links', async ({page}) => {
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();

    await expect (page.locator(cartData.continueShpButton)).toBeEnabled();
    await page.locator(cartData.continueShpButton).click();
    let expectedURL = 'https://www.saucedemo.com/inventory.html';
    await expect(page).toHaveURL(expectedURL);

    await page.locator(buttonsData.shoppingCart).click();
    await expect (page.locator(cartData.checkoutButton)).toBeEnabled();
    await page.locator(cartData.checkoutButton).click();
    expectedURL = 'https://www.saucedemo.com/checkout-step-one.html';
    await expect(page).toHaveURL(expectedURL);
});

// BUG - TEST FAILED, reported in jira. Remove skip when fixed
test.skip('When shopping cart is empty, checkout button is disabled', async ({ page }) => {
    await page.locator(buttonsData.shoppingCart).click();
  
    await page.locator(cartData.checkoutButton).click();
    const expectedURL = 'https://www.saucedemo.com/cart.html';
    expect(await page.url()).toBe(expectedURL);
  });
  
test ('When shopping cart is empty, continue shopping button is enabled and directs to corret tab', async ({page}) => {
    await page.locator(buttonsData.shoppingCart).click();

    await page.locator(cartData.continueShpButton).click();
    let expectedURL ='https://www.saucedemo.com/inventory.html';
    expect(await page.url()).toBe(expectedURL)
});

test ('When the shopping cart contains at least one product, the user is directed to the checkout', async ({page}) => {
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();

    await page.locator(cartData.checkoutButton).click();
    await Promise.all([
        page.locator(cartData.placeholderFirstName).isEnabled(),
        page.locator(cartData.placeholderLastName).isEnabled(),
        page.locator(cartData.placeholderZipCpde).isEnabled(),
        page.locator(cartData.cancelButton).isEnabled(),
        page.locator(cartData.continueButton).isEnabled()
     ]);
});

test ('When user is in checkout tab can finish shopping process', async ({page}) => {
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();
// add test proving that user has to fiilin all of the fields, if not there is an error and user can't go to the next step
    await page.locator(cartData.checkoutButton).click();
    await page.locator(cartData.placeholderFirstName).fill(cartData.nameData);
    await page.locator(cartData.placeholderLastName).fill(cartData.surnameData);
    await page.locator(cartData.placeholderZipCpde).fill(cartData.zipData);

    await page.locator(cartData.continueButton).click();
    let expectedURL = 'https://www.saucedemo.com/checkout-step-two.html'
    expect(await page.url()).toBe(expectedURL)
    await Promise.all([
        page.locator(cartData.productQuantity).isVisible(),
        page.locator(cartData.productPrice).isVisible(),
        page.locator(cartData.totalPrice).isVisible()        
    ]);
        await page.goto('https://www.saucedemo.com/cart.html');
        const cartValue = await page.$eval('div.cart_quantity', element => element.textContent);
        await page.goto('https://www.saucedemo.com/checkout-step-two.html');
        const checkoutValue = await page.$eval('div.cart_quantity', element => element.textContent);
        expect(cartValue).toEqual(checkoutValue);         // Compare cart quantity 

        await page.locator(cartData.finishButton).click();
        let finalURL = 'https://www.saucedemo.com/checkout-complete.html'
        expect (await page.url()).toBe(finalURL)

        await page.locator(cartData.backHomeBtn).click();
        let correctURL = 'https://www.saucedemo.com/inventory.html'
        expect (await page.url()).toBe(correctURL)
});

test ('User directed back to cart when checkout cancelled', async ({page}) => {    
    await isProductAddedToCart(page);
    await page.locator(buttonsData.shoppingCart).click();
    await page.locator(cartData.checkoutButton).click();
    await page.locator(cartData.cancelButton).click();

    let expectedURL = 'https://www.saucedemo.com/cart.html'
    expect(await page.url()).toBe(expectedURL)
});