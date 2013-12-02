var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var schema = new Schema({
    username: String
  , admin: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', schema)
