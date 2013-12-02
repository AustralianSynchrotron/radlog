module.exports = loans

var formidable = require('formidable')

function loans (req, res) {
  switch (req.method) {
    case 'POST':
      if(typeof(req.params.id) === 'undefined') {
        return res.error(405)
      }
      if(req.params.operation === 'check-out') {
        return checkOut(req.params.id, req, res)
      }
      if(req.params.operation === 'check-in') {
        return checkIn(req.params.id, req, res)
      }
    default:
      return res.error(405)
  }
}

function checkOut (id, req, res) {
  req.models.Loan.findById(id, function(err, loan) {
    var form = formidable.IncomingForm()
    form.parse(req, function(err, fields) {
      if (fields.borrower) loan.borrower = fields.borrower
      if (fields.area) loan.area = fields.area
      if (fields.borrowed) {
        loan.borrowed = fields.borrowed
      } else {
        loan.borrowed = new Date()
      }
      loan.save(function(err) {
        // TODO: Handle error
        res.redirect('/sources', 303)
      })
    })
  })
}

function checkIn (id, req, res) {
  req.models.Loan.findById(id, function(err, loan) {
    var form = formidable.IncomingForm()
    form.parse(req, function(err, fields) {
      if (fields.borrower) loan.borrower = fields.borrower
      if (fields.area) loan.area = fields.area
      //if (fields.borrowed) loan.borrowed = fields.borrowed
      if (fields.borrowed) {
        loan.returned = fields.returned
      } else {
        loan.returned = new Date()
      }
      loan.save(function(err) {
        // TODO: Handle error
        applyNewLoan(loan.source, req, res)
      })
    })
  })
}

function applyNewLoan(sourceId, req, res) {
  req.models.Source.findById(sourceId, function(err, source) {
    var newLoan = new req.models.Loan({source: source})
    newLoan.save(function(err) {
      source.loan = newLoan
      source.save(function(err) {
        res.redirect('/sources', 303)
      })
    })
  })
}
