const models = require('../../../../models')
const Sugar = require('sugar')
const { decrypt } = require('../../../../utils/useCrypting')
const { get } = require('lodash')

module.exports = (req, res) => {
  const data = req.body.data
  
  // Sanity check
  if ( !data || !Object.keys(data).length || Object.values(data).some(o => o === '') )
  return res.status(400).send(`Can't continue with request`)
  
  const beginningOfMonth = Sugar.Date(data.date).beginningOfMonth().raw
  const endOfMonth = Sugar.Date(data.date).endOfMonth().raw

  // Make the query
  return models.Expense.find({ paymentDue: { $gte: beginningOfMonth, $lte: endOfMonth }, userId: req.user._id }).lean()
    .then((results) => {
      results.forEach(r => r.cost = typeof r.cost === 'string' ? Number(decrypt(get(r, 'cost', ''))) : r.cost)
      res.status(200).send({ rows: results })
    })
    .catch(err => res.status(500).send(`Error: ${ err }`))
}