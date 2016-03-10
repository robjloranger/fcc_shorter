var db = require('../db');
var redirects = db.get().collection('redirects');

// function to read from database by origin
exports.origin = function modelReadOriginExportedFunction(origin,cb){
  redirects
  .find({"origin": origin},{'origin': true, 'shortcode': true, 'shorturl': true, '_id': false})
  .toArray(function modelReadOriginDBFindComplete(err, docs){
    cb(err,docs);
  });
}

// function to read from database by shortcode
exports.shortcode = function modelReadShortcodeExportedFunction(shortcode,cb){
  redirects
  .find({"shortcode": shortcode},{'origin': true, 'shortcode': true, 'shorturl': true, '_id': false})
  .toArray(function modelReadShortcodeDBFindComplete(err,docs){
    cb(err,docs);
  });
}
