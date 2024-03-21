const { expect } = require('@playwright/test');

// Locators
export class cartData {
  static backHomeBtn= '#back-to-products'
  static continueShpButton= '#continue-shopping'
  static checkoutButton= '#checkout'
  static cancelButton= '#cancel'
  static continueButton= '#continue'
  static cartUrl= 'https://www.saucedemo.com/cart.html'
  static checkoutUrl= 'https://www.saucedemo.com/checkout-step-one.html'
  static checkoutUrl2= 'https://www.saucedemo.com/checkout-step-two.html'
  static checkoutCompleteUrl= 'https://www.saucedemo.com/checkout-complete.html'
  static finishButton= '#finish'
  static nameData= 'TestName'
  static productQuantity= 'cart_quantity:has-text("1")'
  static productPrice= 'inventory_item_price'
  static placeholderFirstName= '#first-name'
  static placeholderLastName= '#last-name'
  static placeholderZipCpde= '#postal-code'
  static surnameData= 'TestSurname'
  static totalPrice= 'summary_subtotal_label'
  static zipData= '71-472'
}

export class cartMenu {
    static removeFromCart= 'button.btn.btn_secondary.btn_small.btn_inventory:has-text("Remove")'
  }

//Actions
export async function assertURL(page, url, locator = null, name = '') {
  await expect(page).toHaveURL(url);
  if (locator) {
      expect(await page.locator(locator).innerHTML()).toContain(name);
  }
}
  
  module.exports = {
    assertURL,
    cartData,
    cartMenu,
  };
