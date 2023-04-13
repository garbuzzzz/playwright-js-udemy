const { test, expect } = require('@playwright/test')

test('alerts-eventListeners-hover', async ({ page }) => {

	await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

	// go back and forward
	// await page.goto('https://google.com')
	// await page.goBack()
	// await page.goForward()
	// await page.goBack()

	// hidden and visible elements check
	await expect(page.locator('#displayed-text')).toBeVisible()
	await page.locator('#hide-textbox').click()
	await expect(page.locator('#displayed-text')).toBeHidden()
	await page.locator('#show-textbox').click()
	await expect(page.locator('#displayed-text')).toBeVisible()

	// page events like dialog, etc
	page.on('dialog', dialog => dialog.accept())
	// page.on('dialog', dialog => dialog.dismiss())
	await page.locator('#confirmbtn').click()

	// hover
	await page.locator('#mousehover').hover()
})
