// @ts-check
// eslint-disable-next-line no-unused-vars
const { devices } = require('@playwright/test')

const config = {
	testDir: './tests',
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},
	reporter: 'html',
	use: {
		browserName: 'chromium',
		headless: true,
		screenshot : 'on',
		trace : 'retain-on-failure',//on, off, on-first-retry, retain-on-failure
	},
}

module.exports = config
