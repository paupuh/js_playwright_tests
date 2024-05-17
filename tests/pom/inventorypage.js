import { format } from 'path'
import { clickElement } from './cartpage'

const { expect } = require('@playwright/test')

//Locators
export class hamburgerMenu {
  static allItems = '#inventory_sidebar_link'
  static aboutOpen = 'a#about_sidebar_link.bm-item.menu-item'
  static logOut = '#logout_sidebar_link'
  static menuButton = '#react-burger-menu-btn'
  static menuOpen = '#menu_button_container div.bm-menu-wrap'
  static menuExit = '#react-burger-cross-btn'
  static restet = '#reset_sidebar_link'
}

export class buttonsData {
  static addedToCart = 'span.shopping_cart_badge'
  static addToCart =
    'button.btn.btn_primary.btn_small.btn_inventory:nth-of-type'
  static defaultSort = 'span.active_option:has-text("Name (A to Z)")'
  static filterSort = 'select.product_sort_container'
  static productSort = '[data-test=product_sort_container]'
  static removeButton =
    'button.btn.btn_secondary.btn_small.cart_button[data-test^="remove-"]'
  static shoppingCart = 'a.shopping_cart_link'
}

export class productsData {
  static aboutUrl = 'https://saucelabs.com/'
  static inventoryUrl = 'https://www.saucedemo.com/inventory.html'
  static productContainer = '#inventory_container.inventory_container'
}

export class pageData {
  static pageTitle = 'span.title'
}

//Actions
export async function getItems(page, locator) {
  return await page.$$eval(locator, elements =>
    elements.map(element => element.textContent.trim())
  )
}

export async function getPrices(page, locator) {
  return await page.$$eval(locator, elements =>
    elements.map(element => element.textContent.trim().slice(1))
  )
}

export async function checkVisibility(page, locator) {
  const element = await page.locator(locator)
  expect(await element).toBeVisible()
}

export async function openHamburgerMenu(page) {
  await page.locator(hamburgerMenu.menuButton).click()
}

export async function selectChoice(page, locator, option) {
  await page.locator(locator).selectOption(option)
}

export async function basketIsEmpty(page) {
  await clickElement(page, buttonsData.removeButton)
  await page.waitForSelector(buttonsData.shoppingCart, { state: 'attached' }) // Oczekiwanie na załadowanie się koszyka
  expect(await page.locator(buttonsData.shoppingCart).innerHTML()).toEqual('')
}

module.exports = {
  basketIsEmpty,
  getItems,
  getPrices,
  checkVisibility,
  openHamburgerMenu,
  selectChoice,
  hamburgerMenu,
  buttonsData,
  productsData,
  pageData
}
