//* it works!

const { test } = require('@playwright/test')
let webContext
test.describe('CareIQ test', async () => {
	test.beforeAll(async({ browser })=>
	{
		const context = await browser.newContext()
		const page = await context.newPage()
		await page.goto('https://careiqciintegration1-dev-ed.my.salesforce.com/')
		await page.locator('#username').type('pavel.garbuz@cadalys.com.test.dev.ed.care')
		await page.locator('#password').type('qwer0asdf0zxcv0')
		await page.locator('#Login').click()
		await page.waitForLoadState('networkidle')
		await context.storageState({ path: 'state.json' })
		webContext = await browser.newContext({ storageState:'state.json' })
	})

	test('Open Content Management, create a GT, populate metadata', async () =>
	{
		const page =  await webContext.newPage()
		await page.goto('https://careiqciintegration1-dev-ed.lightning.force.com/lightning/o/Guideline_Template__c/list?filterName=00B3t00000FABfIEAX')
		await page.locator('div[title=\'New\']').click()
		await page.locator('input[name=\'Title__c\']').type('test')
		await page.locator('input[name=\'Number__c\']').type('test_number')
		await page.locator('button[id*=\'combobox-button\']').click()
		await page.locator('lightning-base-combobox-item[data-value=\'Case Management\']').click()
		await page.locator('button[name=\'SaveEdit\']').click()
		await page.locator('button[name=\'editGuidelineButton\']').click()
		await page.locator('button[aria-label=\'Content Source, Select Content Source\']').click()
		await page.locator('lightning-base-combobox-item[data-value=\'Organization\']').click()
		await page.locator('button[aria-label=\'Use Case Category, Select Use Case Category\']').click()
		await page.locator('lightning-base-combobox-item[data-value=\'Transitions of Care\']').click()
		await page.locator('button[title=\'next\']:has-text(\'Save\')').click()
		await page.locator('button[title=\'close\']').click()
	})
	test('Create section and the first question', async () =>
	{
		const page =  await webContext.newPage()
		// here we need to click on the newly created GT, but the rest works fine
		await page.goto('https://careiqciintegration1-dev-ed.lightning.force.com/lightning/o/Guideline_Template__c/list?filterName=00B3t00000FABfIEAX')
		await page.locator('button:has-text(\'Add Parent Section\')').click()
		await page.locator('c-lookup.parent-buttons__lookup input[role=\'textbox\']').type('Parent Section')
		await page.locator('div[c-casemanagement_casemanagement] button[type=\'button\']').nth(1)
			.click()
		await page.locator('div[slot=\'section-header-create\'] button[type=\'button\']').click()
		await page.locator('c-lookup.parent-buttons__lookup input[role=\'textbox\']').type('Child Section')
		await page.locator('//c-lookup[@class=\'parent-buttons__lookup\']/following-sibling::lightning-button-icon').nth(0)
			.click()
		await page.locator('button:has-text(\'Add Question\')').click()
		await page.locator('div[c-lookup_lookup] input[role=\'textbox\']').nth(1)
			.type('Reason for CM referral?')
		await page.locator('div[lightning-basecombobox_basecombobox] lightning-icon[icon-name=\'utility:down\']').nth(2)
		// eslint-disable-next-line playwright/no-force-option
			.click({ force: true })
		await page.locator('lightning-base-combobox-item[data-value=\'Text\']').click()
		await page.locator('button[aria-disabled=\'false\']:has-text(\'Save\')').click()
	})
})
