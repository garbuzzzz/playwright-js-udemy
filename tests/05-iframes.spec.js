const { test } = require('@playwright/test')

test('iframes', async({ page })=> {
	await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
	await expect(page.locator('#displayed-text')).toBeVisible()
	await page.locator('#hide-textbox').click()
	await expect(page.locator('#displayed-text')).toBeHidden()
	await page.locator('#show-textbox').click()
	await expect(page.locator('#displayed-text')).toBeVisible()
	page.on('dialog', dialog => dialog.accept())
	await page.locator('#confirmbtn').click()
	await page.locator('#mousehover').hover()

	// no need for await!
	const framesPage = page.frameLocator('#courses-iframe')

	framesPage.locator('li a[href*=\'lifetime-access\']').first()
		.click()
		// or:
		// framesPage.locator('li a[href*=\'lifetime-access\']:visible')
	const textCheck = await framesPage.locator('.text h2').textContent()
	textCheck.split(' ')[1]
})
