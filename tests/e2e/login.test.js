const { test, expect } = require('@playwright/test')
import { isUserLoggedIn } from '../pom/loginpage.js'
import { takeFinalScreenshot } from '../pom/cartpage.js'
// @ts-check

test.beforeEach(async ({ page }) => {
  await isUserLoggedIn(page)
  await takeFinalScreenshot(page, 'User.loggedin')
})

test('User is able open page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(`Swag Labs`)
  await takeFinalScreenshot(page, 'Page.opened')
})
