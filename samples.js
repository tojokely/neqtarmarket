

//merchant public key required using encryptedPayload
//merchant public key required using payload
//merchant public key required using details
//
function pay2() {
    request.post({
        uri: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge',
        headers: { "Content-Type": "application/json" },
        data: details      
    }, function(error, response, body) {
        console.log(body);
    });
}




//encryptedPayload merchant public key required
//payload merchant public key required
//details mpl required
function payWithRave() {
    request({
        uri: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge',
        method: 'POST',
        data: details

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Success")
            console.log(response.body);
        } else {
            console.error("Unable to send.");
            console.error(response.body);
            console.error(body);
        }
    });
}


//encryptedPayload
//payload
//details
function pay(amount) {
    Promise.all([
        rave.Card.charge(payload).then(resp => {
            var response;
            if (resp.body && resp.body.data && resp.body.data.flwRef) {
                response = resp.body.data.flwRef;
            } else {
                response = new Error("Couldn't get response, this is being fixed");
                throw response;
            }

            return response;
        })
        .catch(err => {
            console.log("P: ", err.message);
        })
    ]).spread(ref => {
        console.log("this is ref: ", ref);
        var payload2 = {
            "PBFPubKey": RAVE_PK,
            "transaction_reference": ref,
            "otp": "12345"
        }
        rave.Card.validate(payload2).then(resp => {
                console.log(resp.body)
                return resp.body;
            })
            .catch(err => {
                console.log("got this error: ", err.message);
            })
    })
}

Promise.all([
        initiateCharge.(payload).then(resp => {
            var response;
            if (resp.body && resp.body.data && resp.body.data.flwRef) {
                response = resp.body.data.flwRef;
            } else {
                response = new Error("Couldn't get response, this is being fixed");
                throw response;
            }

            return response;
        })
        .catch(err => {
            console.log("P: ", err.message);
        })
    ]).spread(ref => {
        console.log("this is ref: ", ref);
        var payload2 = {
            "PBFPubKey": RAVE_PK,
            "transaction_reference": ref,
            "otp": "12345"
        }
        validate(payload2).then(resp => {
                console.log(resp.body)
                return resp.body;
            })
            .catch(err => {
                console.log("got this error: ", err.message);
            })
    })

{"status":"success","message":"V-COMP",
"data": {"id":206844,"txRef":"MC-1533109015650","orderRef":"URF_1533109019172_3542935","flwRef":"FLW-MOCK-c71ff0ba5e256ca47173440b677424f1","redirectUrl":"https://rave-webhook.herokuapp.com/receivepayment","device_fingerprint":"69e6b7f0b72037aa8428b70fbe03986c","settlement_token":null,"cycle":"one-time","amount":20,"charged_amount":20,"appfee":0.28,"merchantfee":0,"merchantbearsfee":1,"chargeResponseCode":"02","raveRef":"RV3153310901821563C1467753","chargeResponseMessage":"Please enter the OTP sent to your mobile number 080****** and email te**@rave**.com","authModelUsed":"ACCESS_OTP","currency":"NGN","IP":"::ffff:10.35.235.38","narration":"CARD Transaction ","status":"success-pending-validation","modalauditid":"51d2d4bd73cfd470947685824aa92b9d","vbvrespmessage":"Approved. Successful","authurl":"https://ravesandboxapi.flutterwave.com/mockvbvpage?ref=FLW-MOCK-c71ff0ba5e256ca47173440b677424f1&code=00&message=Approved. Successful&receiptno=RN
