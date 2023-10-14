const router = require('express').Router()
const controllers = require('../controllers')

//- Expenses routes
module.exports = router.post('/api/v1/expenses/create', controllers.expenses.create)
module.exports = router.patch('/api/v1/expenses/list', controllers.expenses.list)
module.exports = router.patch('/api/v1/expenses/:id/update', controllers.expenses.update)
module.exports = router.delete('/api/v1/expenses/:id/delete', controllers.expenses._delete)

//- Income routes
module.exports = router.get('/api/v1/income/get', controllers.income.get)
module.exports = router.patch('/api/v1/income/update', controllers.income.update)

//- Category routes
module.exports = router.post('/api/v1/categories/create', controllers.categories.create)
module.exports = router.get('/api/v1/categories/list', controllers.categories.list)
module.exports = router.patch('/api/v1/categories/:id/update', controllers.categories.update)
module.exports = router.delete('/api/v1/categories/:id/delete', controllers.categories._delete)