const router = require('express').Router()
const controllers = require('../controllers')
const verifyUser = require('../middleware/verifyUser')

//- Expenses routes
module.exports = router.post('/api/v1/expenses/create', verifyUser, controllers.expenses.create)
module.exports = router.patch('/api/v1/expenses/list', verifyUser, controllers.expenses.list)
module.exports = router.patch('/api/v1/expenses/:id/update', verifyUser, controllers.expenses.update)
module.exports = router.delete('/api/v1/expenses/:id/delete', verifyUser, controllers.expenses._delete)

//- Income routes
module.exports = router.get('/api/v1/income/get', verifyUser, controllers.income.get)
module.exports = router.patch('/api/v1/income/update', verifyUser, controllers.income.update)

//- Category routes
module.exports = router.post('/api/v1/categories/create', verifyUser, controllers.categories.create)
module.exports = router.get('/api/v1/categories/list', verifyUser, controllers.categories.list)
module.exports = router.patch('/api/v1/categories/:id/update', verifyUser, controllers.categories.update)
module.exports = router.delete('/api/v1/categories/:id/delete', verifyUser, controllers.categories._delete)

//- User routes
module.exports = router.post('/api/v1/users/create', controllers.users.create)
module.exports = router.post('/api/v1/users/auth', controllers.users.auth)