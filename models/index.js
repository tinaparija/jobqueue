var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/massdrop", {useMongoClient: true});
mongoose.Promise = global.Promise; 

module.exports.Record = require("./record.js");
