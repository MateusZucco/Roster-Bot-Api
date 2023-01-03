const express = require('express')

const routes = express.Router()

const Controller = require('../controllers/users')
routes.post('/new-user', Controller.create)
module.exports = routes;