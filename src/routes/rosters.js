const EXPRESS = require('express')

const ROUTES = EXPRESS.Router()

const verifyToken = require('../middlewares/verifyToken')
const Controller = require('../controllers/roster')


ROUTES.get('/list-rosters', verifyToken, Controller.list)

ROUTES.post('/roster',verifyToken, Controller.create)
ROUTES.post('/roster/:ROSTER_ID/new-item', verifyToken, Controller.newItens)

ROUTES.put('/roster/:ROSTER_ID/item/:ITEM_ID', verifyToken, Controller.editItem)
ROUTES.put('/roster/:ROSTER_ID/title', verifyToken, Controller.editTitle)
ROUTES.put('/roster/:ROSTER_ID/description', verifyToken, Controller.editDescription)
ROUTES.put('/roster/:ROSTER_ID/change-positions-items/:ITEM_ONE_ID/:ITEM_TWO_ID', verifyToken, Controller.changePositions)

ROUTES.delete('/roster/:ROSTER_ID', verifyToken, Controller.delete)
ROUTES.delete('/roster/:ROSTER_ID/item/:ITEM_ID', verifyToken, Controller.deleteItem)

module.exports = ROUTES;