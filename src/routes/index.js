const router = require('express').Router()
const controllers = require('../controllers')

//- Expenses routes
module.exports = router.post('/api/v1/expenses/create', controllers.expenses.create)
module.exports = router.patch('/api/v1/expenses/list', controllers.expenses.list)
module.exports = router.patch('/api/v1/expenses/:id/update', controllers.expenses.update)

//- Income routes
module.exports = router.get('/api/v1/income/get', controllers.income.get)
module.exports = router.patch('/api/v1/income/update', controllers.income.update)