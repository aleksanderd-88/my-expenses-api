const models = require('../../../../models')

module.exports = (req, res) => {
  let data = req.body.data
  
  // Sanity check
  if ( !data || !Object.keys(data).length )
    return res.status(400).send(`Can't continue with request`)

  if ( !Array.isArray(data) )
    return res.status(400).send(`Data is not iterable`)

  const bulkUpdatedRows = data.map(obj => {
    return {
      updateOne: {
        filter: {
          _id: obj._id
        },
        update: {
          isPaid: (obj.isPaid ? false : true),
          paidAt: (obj.isPaid ? null : new Date()),
        }
      }
    }
  })

  // Make the query
  return models.Expense.bulkWrite(bulkUpdatedRows)
  .then((updated) => res.status(200).send({ updatedRows: updated['modifiedCount'] }))
  .catch(err => res.status(500).send(`Error: ${ err }`))
}