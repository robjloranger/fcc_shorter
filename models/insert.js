var db = require('../db');
var redirects = db.get().collection('redirects');

// function to insert a new document into DB
module.exports = function modelInsertExportedFunction(origin,shortcode,shorturl,cb){
  redirects
  .insert({"shortcode": shortcode, "origin": origin, "shorturl": shorturl}
  , function modelInsertDBInsertComplete(err,doc){
    cb(err,doc);
  });
}
