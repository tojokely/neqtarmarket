'use strict';
//env variables
require('dotenv').config()
const RAVE_PK = process.env.RAVE_PK;
const RAVE_SK = process.env.RAVE_SK;
const main = require("../index.js");
const encrypt = require("./encrypt.js");
const request = require('request');
var embedtoken;

function pay(amount, key) {
    var payload = {
        "PBFPubKey": RAVE_PK,
        "accountbank": "044", // get the bank code from the bank list endpoint.
        "accountnumber": "0690000031",
        "currency": "NGN",
        "payment_type": "account",
        "country": "NG",
        "amount": amount,
        "email": "user1@gmail.com",
        "passcode": "09101989", //customer Date of birth this is required for Zenith bank account payment.
        "phonenumber": "0902620185",
        "firstname": "temi",
        "lastname": "desola",
        "IP": "355426087298442",
        "txRef": "MC-0292920", // merchant unique reference
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
    }

    var encryptedPayload = {
        "PBFPubKey": RAVE_PK,
        "client": encrypt.encrypt(key, JSON.stringify(payload)),
        "alg": "3DES-24"
    }

    console.log(encryptedPayload)
    request({
        url: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge?use_polling=1',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: encryptedPayload

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Success")
            console.log(response.body);
            var wait = response.body.data.wait;
            var REQUEST = response.body.REQUEST
            //handling time_out
            if (response.body.message == "LONG-REQ") {
                handleTimeout(response.body.data.ping_url)
            } //should validate and verify payment
            else {
                console.log("-------------------------------------------------------------------------")
                console.log("The bank call went through. Please validate and verify the transaction");
            }
        } else {
            console.error("Unable to send.");
            console.log(response.statusCode);
            console.error(response.body);
        }
    });
}

function handleTimeout(u) {
    request({
        url: u,
        headers: { "content-type": "application/json" },
        method: 'GET',
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Success")
            console.log(response.body);
            if (JSON.parse(response.body).data.status == "pending") {
                //Inform the client that this service is temporarily unavailable
                console.log("-----------------------------------------------------------------------------------")
                console.log("This service is temporarily unavailable. Please choose another method of payment.")
            } //should redirect to a success page and validate payment
            else {
                console.log("-------------------------------------------------------------------------")
                console.log("The bank call went through. Please validate and verify the transaction");
            }
        } else {
            console.error("Unable to send.");
            console.log(response.statusCode);
            console.error(response.body);
        }
        //
    });
}

module.exports = { pay };