
const Sequelize = require('sequelize')
const dbconfig = require('../config/database')

const Rosters = require('../models/Rosters')
const RosterItems = require('../models/RosterItems')
const Users = require('../models/Users')

const connection = new Sequelize(dbconfig)

Rosters.init(connection)
RosterItems.init(connection)
Users.init(connection)

Rosters.associate(connection.models)
RosterItems.associate(connection.models)
Users.associate(connection.models)


module.exports = connection