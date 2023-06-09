const { test, expect, request } = require('@playwright/test')
const { APiUtils } = require('../utils/APiUtils')
const loginPayLoad = { userEmail:'garbuz.pb@gmail.com',userPassword:'qwer0qwer0qwer0' }
const orderPayLoad = { orders:[{ country:'India',productOrderedId:'6262e95ae26b7e1a10e89bf0' }] }

let response
test.beforeAll( async()=>
{
	const apiContext = await request.newContext()
	const apiUtils = new APiUtils(apiContext,loginPayLoad)
	response = await apiUtils.createOrder(orderPayLoad)
})

//create order is success
test('Place the order', async ({ page })=>
{
	// to show any request made while testing in the console:
	page.on('request', request => {
		console.log(request.url())
	})
	page.on('response', response => {
		console.log(response.url(), response.status())
	})

	page.addInitScript(value => {
		window.localStorage.setItem('token', value)
	}, response.token )

	await page.goto('https://rahulshettyacademy.com/client')
	await page.route(
		'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/643a6e8a568c3e9fb1525df0',
		async route =>
		{
			const response = await page.request.fetch(route.request())
			route.fulfill(
				{
					response,
					body: '{"data":[],"message":"No Orders"}' // as body
				})
		})

	await page.locator('button[routerlink*=\'myorders\']').click()
	page.screenshot({ path: 'screenshots/test1/loading.png' })
	page.locator('button[routerlink*=\'myorders\']').screenshot({ path: 'screenshots/test1/button.png' })

	await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/643a6e8a568c3e9fb1525df0')
	page.screenshot({ path: 'screenshots/test1/no-orders.png' })

	const message = await page.locator('.mt-4').textContent()
	expect(message).toBe(' You have No Orders to show at this time. Please Visit Back Us ')
})

// in case css or other things don't impact the whole test automation process
// page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
