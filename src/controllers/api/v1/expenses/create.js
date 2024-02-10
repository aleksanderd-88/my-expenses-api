const models = require('../../../../models')
const Sugar = require('sugar')
const { encrypt } = require('../../../../utils/useCrypting')

module.exports = async (req, res) => {
  const data = req.body.data

  // Sanity check
  if ( !data || !Object.keys(data).length )
    return res.status(400).send(`Can't continue with request`)

  //- Set user id
  if ( !data.userId )
    data.userId = req.user._id

  if ( data.copyPrevious ) {
    if ( !data.date )
      return res.status(404).send('No date parameter was given')

    const beginningOfMonth = Sugar.Date(data.date).beginningOfMonth().raw
    const endOfMonth = Sugar.Date(data.date).endOfMonth().raw

    const expenses = await models.Expense.find({ paymentDue: { $gte: beginningOfMonth, $lte: endOfMonth }, userId: req.user._id }).lean()
    if ( !expenses.length )
      return res.status(404).send('Expense(s) from previous month could not be found')

    const resetExpenses = expenses.map(e => {
      e.cost = typeof e.cost === 'number' ? encrypt(e.cost.toString()) : e.cost

      return {
        name: e.name || '',
        cost: e.cost || 0,
        isPaid: false,
        paidAt: null,
        userId: data.userId,
        categoryId: e.categoryId,
        paymentDue: Sugar.Date(e.paymentDue).addMonths(1).raw
      }
    })

    return models.Expense.insertMany(resetExpenses)
      .then(() => res.status(201).send('Successfully copied previous month'))
      .catch(err => res.status(500).send(`Error: ${ err }`))
  }

  //- Encrypt data
  data.cost = encrypt(data.cost)

  // Make the query
  return models.Expense.create(data)
    .then(() => res.status(201).send('Expense created'))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}