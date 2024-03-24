const models = require('../../../../models')
const omit = require('lodash/omit')
const { encrypt } = require('../../../../utils/useCrypting')

module.exports = (req, res) => {
  let data = req.body.data
  const id = req.params.id
  
  // Sanity check
  if ( !id || !data || !Object.keys(data).length )
    return res.status(400).send(`Can't continue with request`)

  if ( !data.isPaid ) 
    data.paidAt = null

  //- If cost has falsy value i.e. "" | null | 0 then set value to "0"
  if ( !data.cost ) {
    //- The encrypt() input parameter expects a string value
    data.cost = "0" 
  }
  data.cost = encrypt(data.cost)
  
  // Make the query
  return models.Expense.updateOne({ _id: id }, data)
    .then((updated) => res.status(200).send({ updatedRows: updated['modifiedCount']}))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}