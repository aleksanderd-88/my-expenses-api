const models = require('../../../../models')

// Make the query
module.exports = (req, res) => {
  return models.Expense.find({}).lean()
    .then((results) => res.status(200).send({ rows: results }))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}