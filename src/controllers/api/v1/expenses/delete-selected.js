const models = require('../../../../models')

module.exports = (req, res) => {
  let data = req.body.data
  
  // Sanity check
  if ( !data || !Object.keys(data).length )
    return res.status(400).send(`Can't continue with request`)

  //- Row ids e.g. [a123,b1234,c12345,d123456, ...]
  const ids = data.ids
  if ( !Array.isArray(ids) )
    return res.status(400).send(`Wrong argument type, expected array of strings`)

  if ( !ids.length )
    return res.status(400).send(`List of ids is missing`)

  // Make the query
  return models.Expense.deleteMany({ _id: { $in: ids } })
    .then((deleted) => res.status(200).send({ deletedRows: deleted['deletedCount']}))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}