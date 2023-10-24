const models = require('../../../../models')

module.exports = (req, res) => {

  // Make the query
  return models.Income.findOne({ name: null, userId: req.user._id }).lean()
    .then((income) => res.status(200).send(income ? income : {}))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}