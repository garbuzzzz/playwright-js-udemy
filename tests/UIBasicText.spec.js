const { test, expect } = require('@playwright/test')

// eslint-disable-next-line no-unused-vars
test('First Playwright text', async ({ browser, page }) => {
	// no need to declare
	// const context = await browser.newContext()
	// const page = await context.newPage()
	await page.goto('https://rahulshettyacademy.com/loginpagePractise')
	console.log(await page.title())
	await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
	await page.locator('input#username').type('Pavel Garbuz')
	page.locator('input#password').type('assadfasdfa8U')
	await page.locator('input#signInBtn').click()
	console.log(await page.locator('div[style*=\'none\']').textContent())
	// need timeout more than 5000
	await expect(page.locator('div[style*=\'none\']')).toContainText(
		'Incorrect username/password.'
	)
	
})
