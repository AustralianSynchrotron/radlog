var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  borrower: String,
  area: String,
  borrowed: Date,
  returned: Date
});

module.exports = mongoose.model('Source', schema);
