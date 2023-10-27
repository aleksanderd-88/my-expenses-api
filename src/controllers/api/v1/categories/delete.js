const models = require('../../../../models')

module.exports = (req, res) => {
  const id = req.params.id

  // Sanity check
  if ( !id )
    return res.status(400).send(`Can't continue with request`)

  // Make the query
  return models.Category.deleteOne({ _id: id })
    .then( async (deleted) => {
      await models.Expense.updateMany({ categoryId: id }, { categoryId: null })
      res.status(200).send({ deletedRows: deleted['deletedCount']})
    })
    .catch(err => res.status(500).send(`Error: ${ err }`))
}