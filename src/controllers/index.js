const expenses = require('./api/v1/expenses')
const income = require('./api/v1/income')
const categories = require('./api/v1/categories')
const users = require('./api/v1/users')
const version = require('./api/version')

module.exports = {
  expenses,
  income,
  categories,
  users,
  version
}