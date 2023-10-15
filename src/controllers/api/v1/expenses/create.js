const models = require('../../../../models')
const Sugar = require('sugar')

module.exports = async (req, res) => {
  const data = req.body.data

  // Sanity check
  if ( !data || !Object.keys(data).length )
    return res.status(400).send(`Can't continue with request`)

  if ( data.copyPrevious ) {
    if ( !data.date )
      return res.status(404).send('No date parameter was given')

    const beginningOfMonth = Sugar.Date(data.date).beginningOfMonth().raw
    const endOfMonth = Sugar.Date(data.date).endOfMonth().raw

    const expenses = await models.Expense.find({ paymentDue: { $gte: beginningOfMonth, $lte: endOfMonth } }).lean()
    if ( !expenses.length )
      return res.status(404).send('No previous expenses at given date has been found')

    const resetExpenses = expenses.map(e => {
      return {
        name: e.name || '',
        cost: e.cost || 0,
        isPaid: false,
        paidAt: null,
        categoryId: e.categoryId,
        paymentDue: Sugar.Date(e.paymentDue).addMonths(1).raw
      }
    })

    return models.Expense.insertMany(resetExpenses)
      .then(() => res.status(201).send('Successfully copied previous month'))
      .catch(err => res.status(500).send(`Error: ${ err }`))
  }

  //- Set user id
  if ( !data.userId )
    data.userId = req.user._id

  // Make the query
  return models.Expense.create(data)
    .then(() => res.status(201).send('Expense created'))
    .catch(err => res.status(500).send(`Error: ${ err }`))
}