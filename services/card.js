'use strict';
//env variables
require('dotenv').config()
const RAVE_PK = process.env.RAVE_PK;
const RAVE_SK = process.env.RAVE_SK;
const main = require("../index.js");
const encrypt = require("./encrypt.js");
const request = require('request');
var embedtoken;
var link

//pay with callback
function payV2(amount, key,callback) {
    var details = {
        "PBFPubKey": RAVE_PK,
        "cardno": "4187427415564246",
        "cvv": "828",
        "expirymonth": "09",
        "expiryyear": "19",
        "currency": "NGN",
        "pin": "3310",
        "country": "NG",
        "amount": amount,
        "email": "tojosoaramarlina@gmail.com",
        "phonenumber": "0902620185",
        "suggested_auth": "PIN",
        "firstname": "temi",
        "lastname": "desola",
        "IP": "355426087298442",
        "txRef": "MC-f14558588558", // your unique merchant reference
        "meta": [{ metaname: "flightID", metavalue: "123949494DC" }],
        "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
    }


    //const key = encrypt.getKey(RAVE_SK);

    var encryptedPayload = {
        "PBFPubKey": RAVE_PK,
        "client": encrypt.encrypt(key, JSON.stringify(details)),
        "alg": "3DES-24"
    }

    request({
        uri: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: encryptedPayload
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.body.status)
            var txRef = response.body.data.txRef
            var email = response.body.data.customer.email
            var amount = response.body.data.amount
            //showForm(txRef,email,amount)
            var flwRef = response.body.data.flwRef;
            var dataHolder = [txRef,email,amount,flwRef]
            if(typeof callback == "function") {
                callback(dataHolder)
            }
            //validate(flwRef)
        } else {
            console.error("Unable to send.");
            console.error(response.body);
            console.error(body);
        }
    });
}
//Works - Pay using Request
function pay(amount, key) {
    var details = {
        "PBFPubKey": RAVE_PK,
        "cardno": "4187427415564246",
        "cvv": "828",
        "expirymonth": "09",
        "expiryyear": "19",
        "currency": "NGN",
        "pin": "3310",
        "country": "NG",
        "amount": "111",
        "email": "tojosoaramarlina@gmail.com",
        "phonenumber": "0902620185",
        "suggested_auth": "PIN",
        "firstname": "temi",
        "lastname": "desola",
        "IP": "355426087298442",
        "txRef": "MC-f14558588558", // your unique merchant reference
        "meta": [{ metaname: "flightID", metavalue: "123949494DC" }],
        "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
    }


    //const key = encrypt.getKey(RAVE_SK);

    var encryptedPayload = {
        "PBFPubKey": RAVE_PK,
        "client": encrypt.encrypt(key, JSON.stringify(details)),
        "alg": "3DES-24"
    }

    request({
        uri: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: encryptedPayload
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.body.status)
            var txRef = response.body.data.txRef
            var email = response.body.data.customer.email
            var amount = response.body.data.amount
            showForm(txRef,email,amount)
            var flwRef = response.body.data.flwRef;
            //validate(flwRef)
        } else {
            console.error("Unable to send.");
            console.error(response.body);
            console.error(body);
        }
    });
}

function validate(flwRef) {
    var transaction = { "PBFPubKey": RAVE_PK, "transaction_reference": flwRef, "otp": "12345" }
    request({
        uri: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/validatecharge',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: transaction
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.body.message);
            verifyTx(response.body.data.tx.flwRef)
        } else {
            console.error("Unable to send.");
            console.error(response.body);
            console.error(body);
        }
    });
}

function verifyTx(ref) {
    request({
        uri: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/verify',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: { "flw_ref": ref, "normalize": "1", "SECKEY": RAVE_SK }

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Verified")
            //console.log(body.data)
            //console.log(response.body.data.card.card_tokens[0]['embedtoken']);
            embedtoken = response.body.data.card.card_tokens[0]['embedtoken'];
        } else {
            console.error("Unverified");
            console.error(response.body);
            console.error(body);
        }
    });
}

function showForm(txref, email, amount) {
 var payload = {"txref":txref,"PBFPubKey":RAVE_PK, "customer_email": email, "amount": amount, "currency": "NGN", "redirect_url": "http://localhost:3000/"}
     request({
        uri: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/hosted/pay',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: payload

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Verified")
            console.log(body.data)
            link = body.data.link
            main.app.post(link, function(req,res) {
                 res.send("paid.")
            })
            //console.log(response.body.data.card.card_tokens[0]['embedtoken']);
            //embedtoken = response.body.data.card.card_tokens[0]['embedtoken'];
        } else {
            console.error("Unverified");
            console.error(response.body);
            console.error(body);
        }
    });
}

function showFormV2(txref, email, amount, callback) {
    var link;
    var payload = {"txref":txref,"PBFPubKey":RAVE_PK, "customer_email": email, "amount": amount, "currency": "NGN", "redirect_url": "http://localhost:3000/"}
     request({
        uri: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/hosted/pay',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: payload

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Verified")
            console.log(body.data)
            link = body.data.link
            if(typeof callback == "function") {
                callback(link)
            }
            //console.log(response.body.data.card.card_tokens[0]['embedtoken']);
            //embedtoken = response.body.data.card.card_tokens[0]['embedtoken'];
        } else {
            console.error("Unverified");
            console.error(response.body);
            console.error(body);
        }
    });

}

module.exports = {pay, payV2, showFormV2, validate,verifyTx};