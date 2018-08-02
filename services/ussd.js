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
    var details = {
        "PBFPubKey": "FLWPUBK-7adb6177bd71dd43c2efa3f1229e3b7f-X",
        "accountbank": "058",
        "accountnumber": "00000", // always use this default for GTB
        "currency": "NGN",
        "payment_type": "ussd",
        "country": "NG",
        "amount": amount,
        "email": "user1@gmail.com",
        "phonenumber": "0902620185",
        "firstname": "temi",
        "lastname": "desola",
        "IP": "355426087298442",
        "txRef": "MC-" + Date.now(), // merchant unique reference
        "orderRef": "MC_" + Date.now(),
        "is_ussd": "true",
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
            var flwRef = response.body.data.flwRef;
            var charged_amount = response.body.data.charged_amount
            var status = response.body.data.validateInstructions
            var payment_type = response.body.data.paymentType
            var txRef = response.body.data.txRef
            console.log("TxRef: " + txRef)
            console.log(response.body.data)
            console.log("----------------------------------------------------------------------------------------")
            console.log("Your transaction_reference is: " + flwRef + " | " + "charged_amount: " + charged_amount)
            verifyTx(txRef)
            //*737*50*charged_amount*159#: When using GTB
            //validate(flwRef)
        } else {
            console.error("Unable to send.");
            console.error(body);
        }
    });
}

function verifyTx(ref) {
    request({
        uri: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: { "txref": ref, "SECKEY": RAVE_SK }

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Verified")
            //console.log(response.body)
            var payment_type = response.data.paymenttype;
            var status = response.data.status;
            if(status == "success-pending-validation") {
                console.log("----------------------------------------------------------------------------------------")
                console.log("We are waiting for your payment. Once we receive it your product will be sent your way.")
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

function sendToWebhook(data) {
    request({
        uri: 'https://rave-webhook.herokuapp.com/receivepayment',
        method: 'POST',
        headers: {
            "content-type":"application/json",
            //"verif-hash": "neqtar_payments"
        },
        json: data 
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.body.status)
            console.log(response.body.data)
            console.log("----------------------------------------------------------------------------------------")
            console.log("Notified through webhook.")
            //*737*50*charged_amount*159#: When using GTB
            //validate(flwRef)
        } else {
            console.error("Unable to send.");
            console.error(body);
        }
    });
}

module.exports = { pay, sendToWebhook };