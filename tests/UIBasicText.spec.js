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

// eslint-disable-next-line playwright/no-focused-test
test.only('filling the fields', async ({ page }) => {
	await page.goto('https://rahulshettyacademy.com/loginpagePractise')
	const userName = page.locator('input#username')
	const password = page.locator('input#password')
	const signIn = page.locator('input#signInBtn')
	await userName.fill('rahulshettyacademy')
	await password.fill('learning')
	await signIn.click()

	// works fine:
	// console.log(await page.locator('.card-body a').nth(0)
	// 	.textContent())

	// it will show empty [] because allTextContents doesn't wait? Meanwhile, textContent WAITS !! :
	// console.log(await page.locator('.card-body a').allTextContents())
	// await page.pause()

	//! we can wait explicitly, but it still will be [] because it's not a service oriented app!!!!
	// await page.waitForLoadState('networkidle')
	// 	const allContents = await page.locator('.card-body a').allTextContents()
	// 	console.log(allContents)

	// so, for those apps that don't make api calls to see its content, we can use this approach:
	await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop')
	const allContents = await page.locator('.card-body a').allTextContents()
	console.log(allContents)

	//! but in the video he used Promise.all, I guess to make sure both click even and waiting are waited simultaneously:
	// await Promise.all(
	// 	[
	// 		signIn.click(),
	// 		page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop')
	// 	]
	// )
	// const allContents = await page.locator('.card-body a').allTextContents()
	// console.log(allContents)
	// so the last approach is the best!
})
