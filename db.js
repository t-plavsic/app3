var mongoose = require('mongoose');

/*
var options = {
  useMongoClient: true,
  autoReconnect: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
*/

//var options = { useMongoClient: true };
//options.server.socketOptions = options.replset.socketOptions = { keepAlive: 120 };
var options = {};

var state = {
    db: null,
}

exports.connect = function (url, done) {
    if (state.db) return done()

    mongoose.connect(url, options, function (err) {
        if (err) return done(err)
        mongoose.Promise = global.Promise;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Mongoose connection error:'));
        state.db = db
        console.log("Mongoose: Successfully connected to MongoDB.");
        done()
    });
}

exports.get = function () {
    return state.db
}
