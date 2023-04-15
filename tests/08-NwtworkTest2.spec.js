const { test, expect, request } = require('@playwright/test')
const { APiUtils } = require('../utils/APiUtils')
const loginPayLoad = { userEmail:'garbuz.pb@gmail.com',userPassword:'qwer0qwer0qwer0' }
const orderPayLoad = { orders:[{ country:'India',productOrderedId:'6262e95ae26b7e1a10e89bf0' }] }

let response
test.beforeAll( async()=>
{
	const apiContext = await request.newContext()
	const apiUtils = new APiUtils(apiContext,loginPayLoad)
	response =  await apiUtils.createOrder(orderPayLoad)
})

//create order is success
test('Place the order', async ({ page })=>
{
	page.addInitScript(value => {
		window.localStorage.setItem('token',value)
	}, response.token )
	await page.goto('https://rahulshettyacademy.com/client')
	await page.locator('button[routerlink*=\'myorders\']').click()
	console.log('orderId: ', response.orderId)
	await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${response.orderId}`,
		route=> route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
	)
	await page.locator('button:has-text(\'View\')').last()
		.click()
	const message = await page.locator('p.blink_me').textContent()
	expect(message).toBe('You are not authorize to view this order')
})
