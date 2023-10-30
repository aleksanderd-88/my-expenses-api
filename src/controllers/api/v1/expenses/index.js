const create = require('./create')
const list = require('./list')
const update = require('./update')
const _delete = require('./delete')
const updateSelected = require('./update-selected')
const deleteSelected = require('./delete-selected')

module.exports = {
  create,
  list,
  update,
  _delete,
  updateSelected,
  deleteSelected
}