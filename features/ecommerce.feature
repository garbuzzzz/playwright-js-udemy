Feature: Ecommerce validations

	Desc: Playing around with Ecommerce validations
	@Regression
	Scenario: Placing an Order
		Given login to Commerce app with "garbuz.pb@gmail.com" and "qwer0qwer0qwer0"
		When add "zara coat 3" to cart
		Then verify "zara coat 3" is displayed in the Cart
		When enter valid details and Place an Order
		Then verify the order is present in the orderHistory

# tags are ONLY FOR Scenario, not for Feature!!
