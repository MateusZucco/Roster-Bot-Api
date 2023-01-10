const express = require('express')

const routes = express.Router()

const Controller = require('../controllers/users')
routes.post('/new-user', Controller.create)
routes.post('/:telegramId/login', Controller.login)
routes.get('/:telegramId/verify-register', Controller.verifyRegister)
module.exports = routes;