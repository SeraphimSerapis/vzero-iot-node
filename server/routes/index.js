var express = require('express');
var braintree = require('braintree');
var request = require('request')
var router = express.Router();

var sparkToken = 'YOUR TOKEN';
var sparkDeviceID = 'YOUR DEVICE ID';

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'YOUR MERCHANT ID',
  publicKey: 'YOUR PUBLIC KEY',
  privateKey: 'YOUR PRIVATE KEY'
});

router.get('/', function (req, res) {
  gateway.clientToken.generate({}, function (error, response) {
    var token = response.clientToken;
    res.render('index', { title: 'vzero', token: token });
  });
});

router.post('/pay', function (req, res) {
  gateway.transaction.sale({
    payment_method_nonce: req.param('payment_method_nonce'),
    amount: '1.00'
  }, function (error, response) {
    if (!error && response.success) {
      var transaction = response.transaction;
      res.send('<pre>' + JSON.stringify(transaction, null, 2) + '</pre>');

      var method;
      if (transaction.paymentInstrumentType === 'paypal_account') {
        method = 'PayPal';
      } else {
        method = 'Credit Card';
      }

      var amount = transaction.amount;

      var formData = {
        access_token: sparkToken,
        params: amount + ',' + method
      };

      request.post({
          url: 'https://api.spark.io/v1/devices/' + sparkDeviceID + '/pay',
          form: formData
        }, function (err, httpResponse, body) {
          if (err) {
            console.log(err);
          } else {
            console.log(body);
          }
        }
      );
    } else {
      res.send(error);
    }
  });
});

module.exports = router;
