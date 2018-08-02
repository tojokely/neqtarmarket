'use strict';
//env variables
require('dotenv').config()
const RAVE_PK = process.env.RAVE_PK;
const RAVE_SK = process.env.RAVE_SK;
const main = require("../index.js");
const encrypt = require("./encrypt.js");
const request = require('request');
var embedtoken;

function initiate(acc_bank, acc_num, amount, callback) {
    var payload = {
        "account_bank": acc_bank,
        "account_number": acc_num,
        "amount": amount,
        "seckey": RAVE_SK,
        "narration": "New transfer",
        "currency": "NGN",
        "reference": "mk" + Date.now()
    }

    request({
        url: 'https://ravesandboxapi.flutterwave.com/v2/gpx/transfers/create',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: payload

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Success")
            //console.log(response.body);
            var wait = response.body.data.wait;
            var REQUEST = response.body.REQUEST
            console.log(response.body.status + " | " +response.body.status )
            //handling time_out
             if(typeof callback == "function") {
                callback(response.body.status,response.body.message)
            }
            console.log("Your transfer has been initiated.")
        } else {
            console.error("Unable to send.");
            console.log(response.statusCode);
            console.error(response.body);
            if(typeof callback == "function") {
                callback(response.body.status,response.body.message)
            }
        }
    });
}

module.exports = {initiate}