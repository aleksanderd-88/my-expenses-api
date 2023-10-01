const models = require('../../../../models')

module.exports = (req, res) => {
  const data = req.body.data

  // Sanity check
  if ( !data || !Object.keys(data).length || Object.values(data).some(o => o === '') )
    return res.status(400).send(`Can't continue with request`)

  // Make the query
  return models.Income.updateOne({ amount: { $gt: 0 }}, data)
    .then(() => res.status(201).send('Income created'))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}