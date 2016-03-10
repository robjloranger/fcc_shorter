var MongoClient = require('mongodb').MongoClient;

// create object to pass around
var state = {
  'db': null
};

// function to connect to the database
exports.connect = function(url, done){
  if(state.db) return done();

  MongoClient.connect(url, function(err, db){
    if(err) return done(err);
    state.db = db;
    done();
  });
};

// function to get the DB instance
exports.get = function(done){
  return state.db;
};

// function to close the database
exports.close = function(done){
  if(state.db){
    state.db.close(function(err, result){
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};
