const playwright = require('@playwright/test')
const { POManager } = require('../../pageobjects/POManager')
const { Before, After, AfterAll, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')

// Before({ tags: '@foo' }, async function () {
Before(async function () {
	const browser = await playwright.chromium.launch({
		headless: false
	})
	const context = await browser.newContext()
	this.page = await context.newPage()
	this.poManager = new POManager(this.page)
})

BeforeStep(function () {
	// This hook will be executed before all steps in a scenario with tag @foo
})

AfterStep(async function ({ result }) {
	if (result.status === Status.FAILED) {
		await this.page.screenshot({ path: 'screenshot1.png' })
	}
})

AfterAll({ tags: '@Regression and @Validation' },function () {
	console.log('AFTER ALL')
})

After({ tags: '@Regression' },function () {
	// it will be displayed for any Scenario with such tag, even if it was run in CLI run without tags at all
	console.log('AFTER')
})
