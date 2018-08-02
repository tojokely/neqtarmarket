'use strict';
//env variables
require('dotenv').config()
const RAVE_PK = process.env.RAVE_PK;
const RAVE_SK = process.env.RAVE_SK;
const main = require("../index.js");
const encrypt = require("./encrypt.js");
const request = require('request');
var embedtoken;
var dataHolder = [[],[],[]]

function getList(callback) {
    var details = {
        "seckey": RAVE_SK,
        "from": "2018-01-01",
        "to": "2019-01-01",
        "currency": "NGN",
        "status": "successful"
    }

    request({
        uri: 'https://ravesandboxapi.flutterwave.com/v2/gpx/transactions/query',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: details
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.body.status)
            var transactions = response.body.data.transactions
            var i;
            //console.log(transactions[0])
            for(i = 0; i<transactions.length; i++) {
            	    dataHolder[0].push(transactions[i]["id"])
            		dataHolder[1].push(transactions[i]["transaction_reference"])
            		dataHolder[2].push(transactions[i]["payment_entity"])
            }
            if (typeof callback == "function") {
                callback(dataHolder)
            }

        } else {
            console.error("Unable to send.");
            console.error(response.body);
            console.error(body);
        }
    });
}

module.exports = {getList};