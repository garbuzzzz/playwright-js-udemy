const { test, expect } = require ('@playwright/test')

let page
test.describe('CareIQ test', async () => {
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage()
	})

	test('Navigate to Google', async () => {
		await page.goto('https://google.com/')
		const url = await page.url()
		expect(url).toContain('google')
		await page.locator('div[role=\'none\']:has-text(\'Zaakceptuj wszystko\')').click()

	})

	test('Search for Playwright', async () => {
		await page.type('textarea[name=\'q\']', 'Playwright')
		await page.keyboard.press('Enter')
		let text = await page.innerText('//h3[contains(text(),"Playwright:")]')
		expect(text).toContain('Playwright: Fast and reliable')
	})
})
