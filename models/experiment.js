var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var schema = new Schema({
  principleUser: String,
  start: Date,
  end: Date,
  beamline: String,
  materialType: String,
  materialForm: String,
  materialActivity: String,
  eaFilename: String,
  signOffFilename: String
});

module.exports = mongoose.model('Experiment', schema);
