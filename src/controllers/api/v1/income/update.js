const models = require('../../../../models')

module.exports = (req, res) => {
  const data = req.body.data

  // Sanity check
  if ( !data || !Object.keys(data).length || Object.values(data).some(o => o === '') )
    return res.status(400).send(`Can't continue with request`)

  // Make the query
  return models.Income.findOneAndUpdate({ amount: { $gt: 0 }}, data, { upsert: true })
    .then(() => res.status(200).send(`Income updated`))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}