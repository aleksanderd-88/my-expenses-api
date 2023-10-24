const models = require('../../../../models')

module.exports = (req, res) => {

  // Make the query
  return models.Income.find({
    amount: { $gt: 0 }, 
    name: { $ne: null }, 
    userId: req.user._id 
  }).lean()
  .then((incomes) => res.status(200).send(incomes))
  .catch(err => res.status(500).send(`Error: ${ err }`))
}