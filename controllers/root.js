var express = require('express')
, router = express.Router()
, read = require('../models/read')
, increase = require('../models/clicked.js');


// router for root url path, a shortcode is passed
router.get('/:code', function routeRootGetHandler(req,res){
  'use strict';
  let thisCode = req.params.code;
  // make sure shortcode is only 6 chars
  if(thisCode.length === 6){
    // check if it is an exisiting code
    read.shortcode(thisCode ,function routeRootReadShortcode(err,docs){
      if(docs.length){
        // if so we redirect the client
        console.log('Short code match, redirecting..');
        increase(thisCode,function routeRootUpdateClicks(err,docs){
          return;
        });
        res.redirect(docs[0].origin);
      }else{
        // otherwise return 404 with error msg
        console.log('No match for short code found..');
        res.status(404).json("Sorry, it appears this short URL does not exist.");
      }
    });
  }else{
    // if code was too long or too short return 400 error
    res.status(400).json("Invalid shortcode format");
  }
});

// export the router
module.exports = router;
