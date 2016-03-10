'use strict';
var express = require('express')
, router = express.Router()
, insert = require('../models/insert')
, read = require('../models/read')
, generate = require('../helpers/generate')
, urlIsValid = require('../helpers/validurl');

// function to call up helper generate
// if code exists we call it again
// then when code is unique we return the value
function generateNewCode(){
  let newShort = generate();
  read.shortcode(newShort, function checkShortcodeExistsDuringGeneration(err,docs){
    if(docs.length){
      generateNewCode();
    }
  });
  return newShort;
};

// POST routing on /new
router.post('/', function routeNewGetHandler(req, res){
  let origin = req.query.origin;
  if(urlIsValid(origin)){
    read.origin(origin, function routeNewReadOrigin(err,docs){
      // if the origin url already exists
      // return the document for that shortcode
      // as an object
      if(docs.length){
        console.log("Origin exists");
        res.status(200).json(docs[0]);
      }else{
        // otherwise we create a new code and
        // insert the document into the DB
        console.log("Origin does not exist");
        let newShort = generateNewCode();
        let newShortUrl = 'http://'+req.get('host') +'/'+ newShort;
        insert(origin,newShort,newShortUrl, function routeNewInsertNewEntry(err,docs){
          console.log("Successfuly inserted %s", origin);
          // after insertion we return the newly
          // created document as an object
          read.origin(origin, function routeNewReturnNewEntry(err,docs){
            res.status(200).json(docs[0]);
          });
        });
      }
    });
  }else{
    res.status(401).json("Your URL format is invalid, please refer to the API documentation");
  }
});

// export the module
module.exports = router;
