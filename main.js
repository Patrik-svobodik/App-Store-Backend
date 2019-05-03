const url = require('url');
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:appId/:appName/:subtitle/:description/:icon/:price/:location/:tint/:textTint/:tint2/:textTint2/:rating', function(req, res) {
    
    
    var appId = req.params.appId;
    let rawdataAppList = fs.readFileSync('apps-all.json');  
    let parsedJSONAppList = JSON.parse(rawdataAppList);

    let rawdataContent = fs.readFileSync('content.json');  
    let parsedJSONContent = JSON.parse(rawdataContent);

    
    console.log(appId);
    if( $.inArray(appId, parsedJSONAppList["applist"]) != -1){
        console.log("Already in the array of apps.")
   } else {
        if (appId != null) {
            parsedJSONAppList["applist"].push(appId);
        };
   }
    console.log(appId);
    var parsedJSONAppDepiction = {
        "appName": "",
        "subtitle": "¨",
        "description": "",
        "icon": "",
        "price": "",
        "location": "",
        "tint": "",
        "textTint": "",
        "tint2": "",
        "textTint2": "",
        "rating": "",
        "screenshots": []
    }
    parsedJSONAppDepiction.appName = req.params.appName;
    parsedJSONAppDepiction.subtitle = req.params.subtitle;
    parsedJSONAppDepiction.description = req.params.description;
    parsedJSONAppDepiction.icon = req.params.icon;
    parsedJSONAppDepiction.price = req.params.price;
    parsedJSONAppDepiction.location = req.params.location;
    parsedJSONAppDepiction.tint = req.params.tint;
    parsedJSONAppDepiction.textTint = req.params.textTint;
    parsedJSONAppDepiction.tint2 = req.params.tint2;
    parsedJSONAppDepiction.textTint2 = req.params.textTint2;
    parsedJSONAppDepiction.rating = req.params.rating;
    parsedJSONAppDepiction.location = req.params.location;


    var stringifiedJSONAppList = JSON.stringify(parsedJSONAppList);
    var stringifiedJSONAppDepiction = JSON.stringify(parsedJSONAppDepiction);
    
    var appIdJSONName = appId + ".json";
    console.log(appIdJSONName);

    parsedJSONContent.depictions[appId] = "depictions/" + appIdJSONName
    var stringifiedJSONContent = JSON.stringify(parsedJSONContent);
    console.log(stringifiedJSONAppDepiction);

    fs.writeFile(appIdJSONName, stringifiedJSONAppDepiction, function(err) {
        if(err) {
            return console.log(err);
        }
    });
    fs.writeFile("apps-all.json", stringifiedJSONAppList, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
    console.log(parsedJSONAppList);
    fs.writeFile("content.json", stringifiedJSONContent, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
    console.log(parsedJSONContent);
    res.send("It worked!");

});
app.listen(port, () => console.log(`App is listening on port ${port}!`));
