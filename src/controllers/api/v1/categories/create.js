const models = require('../../../../models')

module.exports = (req, res) => {
  const data = req.body.data

  // Sanity check
  if ( !data || !Object.keys(data).length || Object.values(data).some(o => o === '') )
    return res.status(400).send(`Can't continue with request`)
  
  //- Set user id
  if ( !data.userId )
    data.userId = req.user._id

  // Make the query
  return models.Category.create(data)
    .then((category) => res.status(201).send(category))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}