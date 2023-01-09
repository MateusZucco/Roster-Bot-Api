const express = require('express')

const routes = express.Router()

const verifyToken = require('../middlewares/verifyToken')
const Controller = require('../controllers/roster')


routes.get('/list-rosters', verifyToken, Controller.list)

routes.post('/roster',verifyToken, Controller.create)
routes.post('/roster/:rosterId/new-item', verifyToken, Controller.newItens)

routes.put('/roster/:rosterId/item/:itemId', verifyToken, Controller.editItem)
routes.put('/roster/:rosterId/title', verifyToken, Controller.editTitle)
routes.put('/roster/:rosterId/description', verifyToken, Controller.editDescription)
routes.put('/roster/:rosterId/change-positions-items/:idItemOne/:idItemTwo', verifyToken, Controller.changePositions)

routes.delete('/roster/:rosterId', verifyToken, Controller.delete)
routes.delete('/roster/:rosterId/item/:itemId', verifyToken, Controller.deleteItem)

module.exports = routes;