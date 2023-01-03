const express = require('express')

const routes = express.Router()

const Controller = require('../controllers/roster')
routes.get('/:userId/list-rosters', Controller.list)

routes.post('/roster', Controller.create)
routes.post('/roster/:rosterId/new-item', Controller.newItens)

routes.put('/roster/:rosterId/item/:itemId', Controller.editItem)
routes.put('/roster/:rosterId/title', Controller.editTitle)
routes.put('/roster/:rosterId/description', Controller.editDescription)
routes.put('/roster/:rosterId/change-positions-items/:idItemOne/:idItemTwo', Controller.changePositions)

routes.delete('/roster/:rosterId', Controller.delete)
routes.delete('/roster/:rosterId/item/:itemId', Controller.deleteItem)

module.exports = routes;