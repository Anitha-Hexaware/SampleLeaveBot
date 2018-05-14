process.env.DEBUG = 'actions-on-google:*';

// const Assistant = require('actions-on-google').DialogflowApp;
const {
    dialogflow,
    Image
} = require('actions-on-google');


const assistant = dialogflow();
var express = require('express');
var bodyParser = require('body-parser');
var request_lib = require('request'); // for sending the http requests to Numbers API
var assert = require('assert');
var rp = require('request-promise');

// let apiId = "";
// let apiKey = "";
// console.log(apiId);
// console.log(apiKey);
var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({
    type: 'application/json'
}));

app.post('/', function (req, res) {
    assistant.intent('Default Welcome Intent', conv => {
        conv.ask('Hi, how is it going?')
        conv.ask(`Here's a picture of a cat`)
      
    })

    // Intent in Dialogflow called `Goodbye`
    assistant.intent('UserCredentials', conv => {
        conv.close('See you later!')
    })

    assistant.intent('Default Fallback Intent', conv => {
        conv.ask(`I didn't understand. Can you tell me something else?`)
    })

});


app.get('/', function (req, res) {
    res.send("Server is up and running.")
});

var server = app.listen(app.get('port'), function () {
    console.log('App listening on port %s', server.address().port);
});