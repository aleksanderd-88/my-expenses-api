const models = require('../../../../models')

module.exports = (req, res) => {

  // Make the query
  return models.Category.find({}).lean()
    .then((categories) => res.status(200).send(categories))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}