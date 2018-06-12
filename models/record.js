var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RecordSchema = new Schema({
    jobHTML: String, 
});

var Record = mongoose.model('Record', RecordSchema);
module.exports = Record;