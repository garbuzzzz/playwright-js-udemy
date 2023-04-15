const { test,expect } = require('@playwright/test')

test('Screenshot & Visual comparision',async({ page }) =>
{
	await page.goto('https://google.com')

	// need to make screenshot for the first run, otherwise it fails. while failing, it makes a new screenshot in CURRENT folder
	// it's not clear how to test it for the first time in remove server
	expect(await page.screenshot()).toMatchSnapshot('google-screenshot.png')
	page.screenshot()
})
