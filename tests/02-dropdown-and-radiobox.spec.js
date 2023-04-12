const { test, expect } = require('@playwright/test')

test('', async ({ page }) => {
	await page.goto('https://rahulshettyacademy.com/loginpagePractise')

	const userName = page.locator('input#username')
	const password = page.locator('input#password')
	const signIn = page.locator('input#signInBtn')
	const dropdown = page.locator('//select[@class=\'form-control\']')
	// const userRadioButton = page.locator('(//span[@class=\'checkmark\'])[2]')
	//! await is NOT needed!!!
	const userRadioButton = page.locator('.radiotextsty').last()
	const terms = page.locator('#terms')
	const popupOkay = page.locator('#okayBtn')
	const blinkingText = page.locator('[href*=\'documents-request\']')

	//! await is needed!!!
	// console.log(await userRadioButton.isChecked())

	await userName.fill('rahulshettyacademy')
	await password.fill('learning')
	await dropdown.selectOption('consult')
	await terms.click()
	await userRadioButton.click()
	await popupOkay.click()
	await expect(userRadioButton).toBeChecked()
	await expect(terms).toBeChecked()
	await terms.uncheck()
	//! only one await is needed at a line!!
	expect(await terms.isChecked()).toBeFalsy()
	await expect(blinkingText).toHaveAttribute('class', 'blinkingText')
	await signIn.click()
})
