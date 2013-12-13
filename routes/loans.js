module.exports = loans

var formidable = require('formidable')

function loans (req, res) {
  
  if(!req.user) {
    res.session.set('done', '/loans')
    return res.redirect('/login')
  }

  switch (req.method) {
    case 'GET':
      return showLoans(req, res)
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
      return res.error(405)
    default:
      return res.error(405)
  }
  
}

function showLoans (req, res) {
  req.models.Loan.find({borrowed: {$ne: null}}).populate('source').sort('borrowed').exec(function (err, loans) {
    res.viewData.loans = loans
    res.template('loans.jade', res.viewData)
  })
}

function checkOut (id, req, res) {
  req.models.Loan.findById(id, function (err, loan) {
    var form = formidable.IncomingForm()
    form.parse(req, function (err, fields) {

      if (!fields.borrower) {
        return res.session.set('error', 'Borrower must be supplied.', function () {
          res.redirect('/sources')
        })
      }

      if (!fields.area) {
        return res.session.set('error', 'Area must be supplied.', function () {
          res.redirect('/sources')
        })
      }

      loan.borrower = fields.borrower
      loan.area = fields.area
      loan.borrowed = new Date()
      loan.checkedOutBy = req.user.username
      loan.save(function (err) {
        // TODO: Handle error
        res.redirect('/sources', 303)
      })
    })
  })
}

function checkIn (id, req, res) {
  req.models.Loan.findById(id, function (err, loan) {
    var form = formidable.IncomingForm()
    form.parse(req, function (err, fields) {
      loan.returned = new Date()
      loan.checkedInBy = req.user.username
      loan.save(function (err) {
        // TODO: Handle error
        applyNewLoan(loan.source, req, res)
      })
    })
  })
}

function applyNewLoan(sourceId, req, res) {
  req.models.Source.findById(sourceId, function (err, source) {
    var newLoan = new req.models.Loan({source: source})
    newLoan.save(function (err) {
      source.loan = newLoan
      source.save(function (err) {
        res.redirect('/sources', 303)
      })
    })
  })
}
