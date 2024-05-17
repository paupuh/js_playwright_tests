const { test, expect } = require('@playwright/test')
import {
  buttonsData,
  hamburgerMenu,
  getItems,
  getPrices,
  productsData,
  pageData,
  basketIsEmpty,
  checkVisibility,
  openHamburgerMenu,
  selectChoice
} from '../pom/inventorypage.js'
import {
  isUserLoggedIn,
  isProductAddedToCart,
  loginData
} from '../pom/loginpage.js'
import {
  confirmURL,
  clickElement,
  takeFinalScreenshot
} from '../pom/cartpage.js'

// @ts-check

test.beforeEach(async ({ page }) => {
  await isUserLoggedIn(page)
})

test.afterEach(async ({ page }) => {
    await page.close();
})

test('Product sort list unfolds when user clicks unfold button', async ({
  page
}) => {
  await checkVisibility(page, buttonsData.filterSort)
  await clickElement(page, buttonsData.filterSort)
  await takeFinalScreenshot(page, 'Unfold.button')
})

test('Product sort list contains (A to Z) choice', async ({ page }) => {
  await clickElement(page, buttonsData.filterSort)
  await expect(
    page.getByRole('option', { name: 'Name (A to Z)' })
  ).toBeEnabled()
  await takeFinalScreenshot(page, 'AtoZ.choice')
})

test('Product sort list contains (Z to A) choice', async ({ page }) => {
  await clickElement(page, buttonsData.filterSort)
  await expect(
    page.getByRole('option', { name: 'Name (Z to A)' })
  ).toBeEnabled()
  await takeFinalScreenshot(page, 'ZtoA.choice')
})

test('Product sort list contains (low to high) choice', async ({ page }) => {
  await clickElement(page, buttonsData.filterSort)
  await expect(
    page.getByRole('option', { name: 'Price (low to high)' })
  ).toBeEnabled()
  await takeFinalScreenshot(page, 'LowToHigh.choice')
})

test('Product sort list contains (high to low) choice', async ({ page }) => {
  await clickElement(page, buttonsData.filterSort)
  await expect(
    page.getByRole('option', { name: 'Price (high to low)' })
  ).toBeEnabled()
  await takeFinalScreenshot(page, 'HighToLowchoice')
})

test('Product sort list default A-Z selected', async ({ page }) => {
  await expect(
    page.getByRole('option', { name: 'Name (A to Z)' })
  ).toBeEnabled()
  await takeFinalScreenshot(page, 'AToZ.Selected')
})

test('Sort list changes applicable for (A to Z)', async ({ page }) => {
  let items = await getItems(page, '.inventory_item')
  let sortedItems = [...items].sort() // "..." this is copying all of the elements of items array
  expect(items).toEqual(sortedItems)

  await takeFinalScreenshot(page, 'AtoZ.changes')
})

test('Sort list changes applicable for (Z to A)', async ({ page }) => {
  await clickElement(page, buttonsData.filterSort)
  await selectChoice(page, buttonsData.filterSort, 'Name (Z to A)')

  let inventoryContainer = await getItems(page, '.inventory_item')
  let sortedItems = [...inventoryContainer].sort().reverse() // inventory container ,
  //sort is sorting alphabetically and reverse is turing array from z to a
  expect(inventoryContainer).toEqual(sortedItems)

  await takeFinalScreenshot(page, 'ZtoA.changes')
})

test('Sort list changes applicable for (low to high)', async ({ page }) => {
  await clickElement(page, buttonsData.filterSort)
  await selectChoice(page, buttonsData.filterSort, 'Price (low to high)')

  let items = await getPrices(page, '.inventory_item_price')
  let inventoryContainer = items.map(function (str) {
    return parseFloat(str)
  })
  // operation on every element of the table
  let sortedItems = [
    ...inventoryContainer.sort((a, b) => {
      a - b
    })
  ]
  expect(inventoryContainer).toEqual(sortedItems)

  await takeFinalScreenshot(page, 'LowToHigh.changes')
})

test('Sort list changes applicable for (high to low)', async ({ page }) => {
  await clickElement(page, buttonsData.filterSort)
  await selectChoice(page, buttonsData.filterSort, 'Price (high to low)')

  let items = await getPrices(page, '.inventory_item_price')
  let inventoryContainer = items.map(function (str) {
    return parseFloat(str)
  })
  let sortedItems = [...inventoryContainer].sort((a, b) => {
    a - b
  })
  expect(inventoryContainer).toEqual(sortedItems)

  await takeFinalScreenshot(page, 'HighToLow.changes')
})

test('Hamburger menu opens when user clicks it', async ({ page }) => {
  await openHamburgerMenu(page)
  let isHamburgerMenuHidden = await page.$eval(hamburgerMenu.menuOpen, menu => {
    return !menu.getAttribute('aria-hidden') === 'false'
  })
  await expect(isHamburgerMenuHidden).toEqual(false)
  await confirmURL(
    page,
    productsData.inventoryUrl,
    pageData.pageTitle,
    'Products'
  )

  await takeFinalScreenshot(page, 'HamburgerMenu.opens')
})

test('Hamburger menu closes when user clicks exit', async ({ page }) => {
  await openHamburgerMenu(page)
  await clickElement(page, hamburgerMenu.menuExit)

  let visibility = await page
    .locator('div.bm-menu-wrap')
    .getAttribute('aria-hidden')
  console.log(visibility) // getting out value of above attributte and write it
  await expect(visibility).toEqual('true')
  await confirmURL(
    page,
    productsData.inventoryUrl,
    pageData.pageTitle,
    'Products'
  )

  await takeFinalScreenshot(page, 'HamburgerMenu.closes')
})

test('Hamburger menu- All items opens, when user selects it', async ({
  page
}) => {
  await openHamburgerMenu(page)
  await clickElement(page, hamburgerMenu.allItems)

  await confirmURL(
    page,
    productsData.inventoryUrl,
    pageData.pageTitle,
    'Products'
  )

  await takeFinalScreenshot(page, 'AllItems.opens')
})

test('Hamburger menu- About opens, when user selects it', async ({ page }) => {
  await openHamburgerMenu(page)
  await clickElement(page, hamburgerMenu.aboutOpen)
  await confirmURL(page, productsData.aboutUrl)

  await takeFinalScreenshot(page, 'About.opens')
})

test('Hamburger menu- Resets app state, when user selects it', async ({
  page
}) => {
  let addToCartButton = await page.$(`${buttonsData.addToCart}(${1})`)
  await addToCartButton.click()
  expect(await page.locator(buttonsData.addedToCart).innerHTML()).toEqual('1')

  await openHamburgerMenu(page)
  await clickElement(page, hamburgerMenu.restet)
  expect(await page.locator(buttonsData.shoppingCart).innerHTML()).toEqual('')

  await takeFinalScreenshot(page, 'AppState.resets')
})

test('Hamburger menu- Logout, logging out user, when user selects it', async ({
  page
}) => {
  await openHamburgerMenu(page)
  await clickElement(page, hamburgerMenu.logOut)

  await confirmURL(page, loginData.homeURL)
  await expect(page).toHaveTitle('Swag Labs')
  await takeFinalScreenshot(page, '   User.logout')
})

test('Add to cart button adds item to shopping cart', async ({ page }) => {
  isProductAddedToCart
  await takeFinalScreenshot(page, 'ProductAdded.toCart')
})

test('Remove button deletes item from shopping cart', async ({ page }) => {
  let addToCartButton = await page.$(`${buttonsData.addToCart}(${1})`)
  await addToCartButton.click()
  await clickElement(page, buttonsData.shoppingCart)

  await basketIsEmpty(page)
  await takeFinalScreenshot(page, 'ProductRemoved.fromCart')
})
