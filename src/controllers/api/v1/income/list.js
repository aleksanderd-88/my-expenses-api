const models = require('../../../../models')
const { decrypt } = require('../../../../utils/useCrypting')
const get = require('lodash/get')

module.exports = (req, res) => {

  // Make the query
  return models.Income.find({
    name: { $ne: null }, 
    userId: req.user._id 
  }).lean()
  .then((incomes) => {
    let modifiedIncomes = []
    for (let income of incomes) {
      if ( typeof income.amount !== 'number' ) {
        income = { ...income, amount: Number(decrypt(get(income, 'amount', ''))) }
      }

      modifiedIncomes.push(income)
    }
    res.status(200).send(modifiedIncomes || [])
  })
  .catch(err => res.status(500).send(`Error: ${ err }`))
}