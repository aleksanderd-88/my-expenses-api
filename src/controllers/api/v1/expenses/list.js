const models = require('../../../../models')

// Make the query
module.exports = (req, res) => {
  const data = req.body.data

  // Sanity check
  if ( !data || !Object.keys(data).length || Object.values(data).some(o => o === '') )
    return res.status(400).send(`Can't continue with request`)

  console.log(data);

  const limit = Number(data.limit || 10)
  const perPage = Number(data.perPage || 10)
  const page = Number(data.page || 1)
  const offset = Number(data.offset || 10)
  const sort = data.sort || 'id'
  
  return models.Expense.find({})
    .limit(limit)
    .skip(page * limit)
    .sort(sort)
    .lean()
    .then( async (results) => {

      const response = {
        rows: results,
        count: await models.Expense.estimatedDocumentCount(),
        page: page,
        nextPage: page + 1
      }
      res.status(200).send(response)
    })
    .catch(err => res.status(500).send(`Error: ${ err }`))
}