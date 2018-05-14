const {
    DialogflowApp
} = require('actions-on-google');
const request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

const UserIntent = " UserCredentials";
const WelcomeIntent = "input.welcome";

app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({
    type: 'application/json'
}));


app.post('/', function (req, res) {
    const assistant = new DialogflowApp({
        request: req,
        response: res
    });

    var intent = assistant.getIntent();
    console.log("hi this is intent" + intent);

    function WelcomeSpeach(assistant) {
        console.log("this is assistant" + assistant);
        var reply = "Hello! I am BOT Assistant. How can I help you today?";
        assistant.ask(reply);
    }

    function Userfunction(assistant) {
        console.log("this is assistant" + assistant);
        var reply = "Sure, When would you like to apply leave for and for how many days?";
        assistant.ask(reply);
    }

    const actionMap = new Map();
    actionMap.set(UserIntent, Userfunction);
    actionMap.set(WelcomeIntent, WelcomeSpeach);

    assistant.handleRequest(actionMap);
})


app.get('/', function (req, res) {
    res.send("Server is up and running.")
});

var server = app.listen(app.get('port'), function () {
    console.log('App listening on port %s', server.address().port);
});