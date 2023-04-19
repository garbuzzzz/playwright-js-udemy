// @ts-check
// eslint-disable-next-line no-unused-vars
const { devices } = require('@playwright/test')

const config = {
	testDir: './tests',
	retries: 2, //* only for mocha!
	timeout: 45 * 1000,
	expect: {
		timeout: 5000,
	},
	reporter: 'html',
	use: {
		browserName: 'chromium',
		headless: true,
		screenshot :  'only-on-failure',
		trace : 'retain-on-failure',//on, off, on-first-retry, retain-on-failure
		video: 'off'
	},
}

module.exports = config
