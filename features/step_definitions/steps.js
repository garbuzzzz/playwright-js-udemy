//* npx cucumber-js
//* npx cucumber-js --exit
//* npx cucumber-js features/ErrorValidations.feature --exit
//* npx cucumber-js --tags "@Regression" --exit
//* npx cucumber-js features/ErrorValidations.feature parallel 3 --exit // doesn't work without filename provided
//* npx cucumber-js parallel 3 --exit // doesn't work without filename provided
//* npx cucumber-js --exit --format html:cucumber-report.html
//* npx cucumber-js --exit --format json:cucumber-report.json
// * npx cucumber-js --exit --retry 1 // re-runs are not visible, but performed

const { When, Then, Given } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const playwright = require('@playwright/test')

//* Ecommerce.feature:
Given('login to Commerce app with {string} and {string}', { timeout: 10000 }, async function (username, password) {
	const loginPage = this.poManager.getLoginPage()
	await loginPage.goTo()
	await loginPage.validLogin(username, password)
})

When('add {string} to cart', { timeout: 35000 }, async function (productName) {
	this.dashboardPage = this.poManager.getDashboardPage()
	await this.dashboardPage.searchProductAddCart(productName)
	await this.dashboardPage.navigateToCart()
})

Then('verify {string} is displayed in the Cart', { timeout: 10000 }, async function (productName) {
	this.cartPage = this.poManager.getCartPage()
	await this.cartPage.VerifyProductIsDisplayed(productName)
	await this.cartPage.Checkout()
})

When('enter valid details and Place an Order', { timeout: 10000 }, async function () {
	this.ordersReviewPage = this.poManager.getOrdersReviewPage()
	await this.ordersReviewPage.searchCountryAndSelect('ind','India')
	this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId()
	console.log(this.orderId)
})
Then('verify the order is present in the orderHistory', { timeout: 10000 }, async function () {
	await this.dashboardPage.navigateToOrders()
	this.ordersHistoryPage = this.poManager.getOrdersHistoryPage()
	await this.ordersHistoryPage.searchOrderAndSelect(this.orderId)
	expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy()
})

//* ErrorValidations.feature:
Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
	const userName = this.page.locator('#username')
	const signIn = this.page.locator('#signInBtn')
	await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/')
	console.log(await this.page.title())
	//css
	await userName.type(username)
	await this.page.locator('[type=\'password\']').type(password)
	await signIn.click()
})

Then('Verify Error message is displayed', async function () {
	console.log(await this.page.locator('[style*=\'block\']').textContent())
	await expect(this.page.locator('[style*=\'block\']')).toContainText('Incorrect')
})
