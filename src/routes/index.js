const router = require('express').Router()
const controllers = require('../controllers')
const verifyUser = require('../middleware/verifyUser')

//- App version
module.exports = router.get('/api/v1/version', verifyUser, controllers.version.get)

//- Expenses routes
module.exports = router.post('/api/v1/expenses/create', verifyUser, controllers.expenses.create)
module.exports = router.patch('/api/v1/expenses/list', verifyUser, controllers.expenses.list)
module.exports = router.patch('/api/v1/expenses/:id/update', verifyUser, controllers.expenses.update)
module.exports = router.delete('/api/v1/expenses/:id/delete', verifyUser, controllers.expenses._delete)
module.exports = router.patch('/api/v1/expenses/update-selected', verifyUser, controllers.expenses.updateSelected)
module.exports = router.patch('/api/v1/expenses/delete-selected', verifyUser, controllers.expenses.deleteSelected)

//- Income routes
module.exports = router.get('/api/v1/income/get', verifyUser, controllers.income.get)
module.exports = router.patch('/api/v1/income/update', verifyUser, controllers.income.update)
module.exports = router.post('/api/v1/income/create', verifyUser, controllers.income.create)
module.exports = router.patch('/api/v1/income/list', verifyUser, controllers.income.list)
module.exports = router.delete('/api/v1/income/:id/delete', verifyUser, controllers.income._delete)

//- Category routes
module.exports = router.post('/api/v1/categories/create', verifyUser, controllers.categories.create)
module.exports = router.get('/api/v1/categories/list', verifyUser, controllers.categories.list)
module.exports = router.patch('/api/v1/categories/:id/update', verifyUser, controllers.categories.update)
module.exports = router.delete('/api/v1/categories/:id/delete', verifyUser, controllers.categories._delete)

//- User routes
module.exports = router.post('/api/v1/users/create', controllers.users.create)
module.exports = router.post('/api/v1/users/auth', controllers.users.auth)
module.exports = router.get('/api/v1/users/:id/get', controllers.users.get)