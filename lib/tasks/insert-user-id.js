const models = require('../../src/models')
require('dotenv/config')

const main = async () => {
  const userId = process.argv[2]
  if ( !userId ) {
    throw new Error('Missing user id parameter')
  }

  await models.Category.updateMany({}, { userId }, { upsert: true })
  await models.Expense.updateMany({}, { userId }, { upsert: true })

  console.log('Inserting data completed');
  process.exit()
}

main()