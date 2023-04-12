const { test } = require('@playwright/test')

test('', async ({ page }) => {
	await page.goto('https://rahulshettyacademy.com/loginpagePractise')

	const userName = page.locator('input#username')
	const password = page.locator('input#password')
	const signIn = page.locator('input#signInBtn')
	const dropdown = page.locator('//select[@class=\'form-control\']')
	const userRadioButton = page.locator('(//span[@class=\'checkmark\'])[2]')
	// const userRadioButton = page.locator('.radiotextsty').last()
	const popupOkay = page.locator('#okayBtn')

	await userName.fill('rahulshettyacademy')
	await password.fill('learning')
	await dropdown.selectOption('consult')
	// eslint-disable-next-line playwright/no-force-option
	await userRadioButton.click({ force: true })
	// eslint-disable-next-line playwright/no-force-option
	await popupOkay.click({ force: true })
	// eslint-disable-next-line playwright/no-force-option
	await signIn.click({ force: true })
})
