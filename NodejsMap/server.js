var
    http = require('http'),//helps with http methods
    path = require('path'),//helps with file paths
    fs = require('fs'),//helps with file system tasks
    passport = require('passport');

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

var mongoUtil = require('./Models/mongoUtil');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());


// allow-cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


mongoUtil.connectToServer(function (err) {
    // start the rest of your app here
    var article = require('./routes/articles');
    var authentication = require('./routes/authentication');
    app.use('/', authentication);
    app.use('/articles', article);
});

app.listen(3000, function () {
    console.log('listening on 3000')
});

module.exports = app;


