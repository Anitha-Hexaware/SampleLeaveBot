const Assistant = require('actions-on-google').ApiAiApp;
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


// get by action

const WelcomeIntent = "input.welcome";



app.post('/', function (req, res) {
    const assistant = new Assistant({
        request: req,
        response: res
    });
    var intent = assistant.getIntent();
    console.log("hi this is intent" + intent);

    function WelcomeSpeach(assistant) {
        console.log("this is assistant" + assistant);
        var reply = "Welcome to FlightStat.. give me you flight number will let you know currently where the flight is";
        assistant.ask(reply);
    }



    app.get('/', function (req, res) {
        res.send("Server is up and running.")
    });

    var server = app.listen(app.get('port'), function () {
        console.log('App listening on port %s', server.address().port);
    });
    let actionMap = new Map();
    let actionSee = actionMap.get(WelcomeIntent);
    console.log("this is action" + actionSee);

    actionMap.set(WelcomeIntent, WelcomeSpeach);
    // actionMap.set(quit_Intent, ThankyouSpeach);
    assistant.handleRequest(actionMap);
});