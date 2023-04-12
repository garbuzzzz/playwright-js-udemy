const { test } = require('@playwright/test')

test('new tab', async({ browser }) => {
	const context = await browser.newContext()
	const page = await context.newPage()

	const newPageLink = page.locator('[href*=\'documents-request\']')

	await page.goto('https://rahulshettyacademy.com/loginpagePractise')
	//! need to use brackets!!!
	const [newPage] = await Promise.all([
		context.waitForEvent('page'),
		newPageLink.click()
	])

	// also works fine:
	// await newPageLink.click();
	// const newPage = await context.waitForEvent('page');

	const text = await newPage.locator('//p[@class=\'im-para red\']').textContent()
	console.log(text)
	const email = text.split('@')[1].split(' ')[0]
	console.log(email)

})

// how to close one WINDOW:
// all_pages = page.context.pages
// await all_pages[1].close()
