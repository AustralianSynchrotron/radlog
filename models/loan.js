var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , dateFormat = require('dateformat')

var schema = new Schema({
    source: {type: Schema.Types.ObjectId, ref: 'Source'}
  , borrower: String
  , area: String
  , borrowed: Date
  , returned: Date
  , checkedOutBy: String
  , checkedInBy: String
  , deleted: {type: Boolean, default: false}
})

schema.virtual('borrowedFormatted').get(function () {
  if(!this.borrowed) return ''
  return dateFormat(this.borrowed, 'yyyy-mm-dd HH:MM')
})

schema.virtual('returnedFormatted').get(function () {
  if(!this.returned) return ''
  return dateFormat(this.returned, 'yyyy-mm-dd HH:MM')
})

module.exports = mongoose.model('Loan', schema)
