'use strict';
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const request = require('request');
const ejs = require('ejs')
//services
const encrypt = require("./services/encrypt.js");
const card = require("./services/card.js")
const bank = require("./services/bank.js")
const ussd = require("./services/ussd.js")
const transfer = require("./services/transfer.js")
const list = require("./services/listTransactions.js")


//global variables
var amount;
var txRef;
var flwRef;

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
app.get('/transfer', (req, res) => res.sendFile(__dirname + '/views/transfer.html'));
app.get('/sample.html', (req, res) => res.sendFile(__dirname + '/sample.html'));
app.get('/account', function(req,res){
    list.getList(function(obj) {
        let transactionList = obj;
        console.log(typeof transactionList)
        res.render('account.ejs', { transactionList: transactionList, error: null })
    });
})
//redirect to original pages
app.get('/transferBank', function(req,res){
    res.sendFile(__dirname + '/views/transfer.html');
})
app.get('/welcomeback.ejs', function(req, res) {
    res.sendFile(__dirname + 'index.html');
            //res.render('welcomeback', { error: null });
            //https://ravesandboxapi.flutterwave.com/v2/gpx/transfers/create
            //transfer.initiate();
});
app.get('/transferBank', function(req,res){
    res.sendFile(__dirname + '/views/transfer.html');
})
app.get('/pay1', function(req, res) {
    card.payV2("20", key, function(d) {
        card.showFormV2(d[0], d[1], d[2], function(obj) {
            let link = obj
            txRef = d[0];
            flwRef = d[d.length+1]
            res.render('pay', { link: link, error: null });
        })
    })
});
app.get('/pay2', function(req, res) {
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
app.post('/transferBank', function(req,res) {
    console.log(req.body)
    var code = req.body.category
    var acc_number = req.body.account_number
    var amount = req.body.amount
    transfer.initiate(code, acc_number, amount, function(x,y) {
        let status = x;
        let message = y;
        var color = "green"

        console.log(x + " | " + y)

        if(x == 'error') {
            color = "red"
            res.render('transferBack', {status:status, message:message, color:color, error: null })
        }
        res.render('transferBack', { status:status, message:message, color:color, error: null })
    })
})

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000'));
