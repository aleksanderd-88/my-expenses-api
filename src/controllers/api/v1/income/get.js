const models = require('../../../../models')
const { decryptHash } = require('../../../../utils/useCrypting')
const get = require('lodash/get')

module.exports = (req, res) => {
  // Make the query
  return models.Income.findOne({ name: null, userId: req.user._id }).lean()
    .then((income) => {
      const amount = { ...income, amount: Number(decryptHash(get(income, 'amount', ''))) }
      return res.status(200).send(amount ? amount : {})
    })
    .catch(err => res.status(500).send(`Error: ${ err }`))
}