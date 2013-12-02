var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var schema = new Schema({
    name: String
  , loan: {type: Schema.Types.ObjectId, ref: 'Loan'}
})

module.exports = mongoose.model('Source', schema)
