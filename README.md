# vzero-iot-node
---

This is an end-to-end example of utilizing [Braintree's v.zero SDK for Node.js](http://developers.braintreepayments.com/javascript+node) in combination with a [Spark Core](https://www.spark.io) in order to build a minimalistic Point of Sale device.

## Getting the credentials
---

- Braintree: Register an account for the [Braintree Sandbox](http://sandbox.braintreegateway.com/)
- Spark: [Register your Spark Core](http://www.spark.io/build) and generate an Access Token
- Enter the credentials in `routes/index.js`

## Running the server
---
- Run `npm install` in the root folder of the `server` project
- Run `npm start` to start the server

## Uploading the Wiring file to your Spark Core
---

In this example the [Spark Cloud IDE](http://www.spark.io/build) has been leveraged. It also handles the only dependency - `LiquidCrystal` - that is being used to handle the 20x4 LCD display.

Make sure that the IDE recognizes that `LiquidCrystal` is being leveraged and lists it as included library.

### Connecting the LCD display:

This might differ from display to display - the one that I've used can be found on [Adafruit](http://www.adafruit.com/product/198) 

```
// CHANNEL        RS, EN, D4, D5, D6, D7
// LCD             4,  6, 14, 13, 12, 11
LiquidCrystal lcd(D0, D1, D5, D4, D3, D2);
```

## Possible extension
---
A logical next step would be the usage of a thermal printer to print out receipts. I'd be more than happy to see other great ideas that use this projects as a base.
