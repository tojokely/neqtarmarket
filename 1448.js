'use strict';
const express = require('express')
const app = express()
const path = require('path')
//const Ravepay = require('ravepay');
const bodyParser = require('body-parser');
const request = require('request');
var http = require('http');
//var Promise = require("bluebird");
const encrypt = require("./services/encrypt.js");
const card = require("./services/card.js")
const bank = require("./services/bank.js")
const ussd = require("./services/ussd.js")
const ejs = require('ejs')

var amount;

//env variables
require('dotenv').config()
const RAVE_PK = process.env.RAVE_PK;
const RAVE_SK = process.env.RAVE_SK;
var key = encrypt.getKey(RAVE_SK);

// Ejs Middleware
app.set('view engine', 'ejs')

//var rave = new Ravepay(RAVE_PK, RAVE_SK, "false");

// Set Static Folder
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));


//gets
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.get('/contact', (req, res) => res.sendFile(__dirname + '/views/elements.html'));
/*app.get('/pay.ejs', function(req, res) {
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
            showForm(txRef,email,amount, function(obj){
                let link = obj
                res.render('pay', {link: link, error: null});obj;
            })
            var flwRef = response.body.data.flwRef;
            //validate(flwRef)
        } else {
            console.error("Unable to send.");
            console.error(response.body);
            console.error(body);
        }
    });
});*/
var txRef;
var flwRef;

app.get('/welcomeback.ejs', function(req, res) {
            res.render('welcomeback', { error: null });
});

app.get('/pay.ejs', function(req, res) {
    card.payV2("20", key, function(d) {
        card.showFormV2(d[0], d[1], d[2], function(obj) {
            let link = obj
            txRef = d[0];
            flwRef = d[d.length+1]
            res.render('pay', { link: link, error: null });
        })
    })
});


app.get('/pay2.ejs', function(req, res) {
    card.payV2("50", key, function(d) {
        card.showFormV2(d[0], d[1], d[2], function(obj) {
            let link = obj
            txRef = d[0];
            flwRef = d[d.length+1]
            res.render('pay', { link: link, error: null });
        })
    })
});

app.post('/', function(req,res) {
    res.render('welcomeback', {error:null});
})

app.get('/?flwref='+flwRef +'&txref='+ txRef, function(req,res){
    console.log("We are here.")
})

function pay(callback) {
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
            //showForm(txRef,email,amount)
            var flwRef = response.body.data.flwRef;
            var dataHolder = [txRef,email,amount]
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

function showForm(txref, email, amount, callback) {
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
/*posts
app.post('/pay', function(req, res) {
    amount = Object.keys(req.body)[0].substring(3);
    card.pay(amount, key)
    //pong()
    //.then(ping())
    //.catch(function (body) {
    //                console.log('aborted');
    //            });
})
    //bank.pay("1000",key);
    //ussd.pay("100", key);
   // ussd.sendToWebhook
   /*ussd.verifyTx({
    "MC-f14558588558"
   })
    res.send("paid.")
})
*/
//webhook
app.post("https://rave-webhook.herokuapp.com/receivepayment", function(request, response) {
  /* It is a good idea to log all events received. Add code *
 * here to log the signature and body to db or file       */
  
  // retrieve the signature from the header
  var hash = req.headers["verif-hash"];
  
  if(!hash) {
    // discard the request,only a post with rave signature header gets our attention 
  }
  
  // Get signature stored as env variable on your server
  const secret_hash = process.env.MY_HASH;
  
  // check if signatures match
  
  if(hash !== secret_hash) {
   // silently exit, or check that you are passing the write hash on your server.
  }
  
  // Retrieve the request's body
  var request_json = JSON.parse(request.body);

  // Give value to your customer but don't give any output
// Remember that this is a call from rave's servers and 
// Your customer is not seeing the response here at all

  response.send(200);
});

function ping() {
    return "ping"
}

function pong() {
    return "pong"
}



/*Works - Pay using Request
function pay(amount) {
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
        "email": "user@gmail.com",
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
            var flwRef = response.body.data.flwRef;
            validate(flwRef)
        } else {
            console.error("Unable to send.");
            console.error(response.body);
            console.error(body);
        }
    });
    return "hello"
}*/

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
            //console.log(response.body);
        } else {
            console.error("Unverified");
            console.error(response.body);
            console.error(body);
        }
    });
}

//Works - payV2 + validate using http
function payV2(amount) {
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
        "email": "user@gmail.com",
        "phonenumber": "0902620185",
        "suggested_auth": "PIN",
        "firstname": "temi",
        "lastname": "desola",
        "IP": "355426087298442",
        "txRef": "MC-" + Date.now(), // your unique merchant reference
        "meta": [{ metaname: "flightID", metavalue: "123949494DC" }],
        "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
    }

    var encryptedPayload = {
        "PBFPubKey": RAVE_PK,
        "client": encrypt.encrypt(key, JSON.stringify(details)),
        "alg": "3DES-24"
    }

    var options = {
        hostname: 'ravesandboxapi.flutterwave.com',
        port: 80,
        path: '/flwv3-pug/getpaidx/api/charge',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var req = http.request(options, function(res) {
        console.log('Status: ' + res.statusCode);
        res.setEncoding('utf8');
        let dataHolder = [];
        res.on('data', function(body) {
            console.log('Body: ' + body);
            dataHolder.push(body)
            //var bodyjson = JSON.parse(body)
            //console.log(body.data.flwRef)
            //var transaction = {"PBFPubKey":RAVE_PK,"transaction_reference":body.data.flwRef,"otp":12345}
            //validatecharge(transaction);
        }).on('end', () => {
            var flwRef = JSON.parse(dataHolder).data.flwRef;
            //validateCharge({"PBFPubKey":RAVE_PK,"transaction_reference":flwRef,"otp":12345})
            // at this point, `body` has the entire request body stored in it as a string
            validate(flwRef);
        });
    });

    //for errors
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(JSON.stringify(encryptedPayload));
    req.end();
}

/*banks*/
<select name="category" id="category">
                                <option value="">- account_bank -</option>
                                <option value="044">ACCESS BANK NIGERIA</option>
                                <option value="323">ACCESS MOBILE</option>
                                <option value="014">AFRIBANK NIGERIA PLC</option>
                                <option value="401">Aso Savings and Loans</option>
                                <option value="063">DIAMOND BANK PLC</option>
                                <option value="037">Ecobank Mobile</option>
                                <option value="050">ECOBANK NIGERIA PLC</option>
                                <option value="084">ENTERPRISE BANK LIMITED</option>
                                <option value="309">FBN MOBILE</option>
                                <option value="070">FIDELITY BANK PLC</option>
                                <option value="214">FIRST CITY MONUMENT BANK PLC</option>
                                <option value="315">GTBank Mobile Money</option>
                                <option value="058">GTBANK PLC</option>
                                <option value="030">HERITAGE BANK</option>
                                <option value="082">KEYSTONE BANK PLC</option>
                                <option value="311">Parkway</option>
                                <option value="305">PAYCOM</option>
                                <option value="076">SKYE BANK PLC</option>
                                <option value="221">STANBIC IBTC BANK PLC</option>
                                <option value="304">Stanbic Mobile</option>
                                <option value="068">STANDARD CHARTERED BANK NIGERIA LIMITED</option>
                                <option value="232">STERLING BANK PLC</option>
                                <option value="032">UNION BANK OF NIGERIA PLC</option>
                                <option value="033">UNITED BANK FOR AFRICA PLC</option>
                                <option value="215">UNITY BANK PLC</option>
                                <option value="057">ZENITH BANK PLC</option>
                                <option value="322">ZENITH Mobile</option>
                                <option value="559">Coronation Merchant Bank</option>
                                <option value="601">FSDH Merchant Bank Limited</option>
                                <option value="526">PARRALEX BANK</option>
                            </select>

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000'));