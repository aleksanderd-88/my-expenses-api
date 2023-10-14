const models = require('../../../../models')

module.exports = (req, res) => {
  let data = req.body.data
  const id = req.params.id

  
  // Sanity check
  if ( !id || !data || !Object.keys(data).length )
  return res.status(400).send(`Can't continue with request`)

  // Make the query
  return models.Category.updateOne({ _id: id }, data)
    .then((updated) => res.status(200).send({ updatedRows: updated['modifiedCount']}))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}