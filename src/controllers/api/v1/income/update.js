const models = require('../../../../models')
const { generateHash } = require('../../../../utils/useCrypting')

module.exports = (req, res) => {
  const data = req.body.data

  // Sanity check
  if ( !data || !Object.keys(data).length || Object.values(data).some(o => o === '') )
    return res.status(400).send(`Can't continue with request`)

  //- Handle falsy amount value
  if ( !data.amount )
    data.amount = 0

  //- Hash income
  data.amount = generateHash(data.amount.toString())

  // Make the query
  return models.Income.updateOne({ _id: data._id }, data)
  .then(() => res.status(200).send(`Income updated`))
  .catch(err => res.status(500).send(`Error: ${ err }`))
}