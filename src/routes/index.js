const router = require('express').Router()
const controllers = require('../controllers')

//- Expenses routes
module.exports = router.post('/api/v1/expenses/create', controllers.expenses.create)
module.exports = router.patch('/api/v1/expenses/list', controllers.expenses.list)