const models = require('../../../../models')
const Sugar = require('sugar')

// Make the query
module.exports = (req, res) => {
  const today = Sugar.Date(new Date()).raw
  return models.Expense.find({ paymentDue: { $gte: Sugar.Date(new Date(today)).raw} }).lean()
    .then((results) => res.status(200).send({ rows: results }))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}