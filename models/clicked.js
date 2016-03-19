var db = require('../db');
var redirects = db.get().collection('redirects');

// function to insert a new document into DB
module.exports = function modelUpdateClicksExportedFunction(shortcode,cb){
  redirects
  .update({"shortcode": shortcode}, {$inc: {"clicks": 1}}
  , function modelUpdateClicksComplete(err,doc){
    cb(err,doc);
  });
}
