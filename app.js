/*
 *  URL Shortening micro service
 *  with web based UI
 *  v 1.0.1
 *  written by rob j loranger <hello@robloranger.ca> www.robloranger.ca
 *
 *  released under MIT license
 */

'use strict';
var express = require('express'), app = express(), db = require('./db');
const PORT = process.env.PORT || 8080
, URL = 'mongodb://localhost:27017/shorter';


// serve up public as landing page
// with UX for easy url shortening
app.use(express.static('public'));

// connect to the mongo database
db.connect(URL, function appJSDatabaseConnection(err){
  if(err){
    console.log("Unable to connect to Mongo.");
    process.exit(1);
  }else{
    // call up routing
    app.use(require('./controllers'));
    // listen on PORT
    app.listen(PORT, function appJSListeningOnPort(){
      console.log("Connected to mongo..\nListening on port %s...", PORT);
    });
  }
});
