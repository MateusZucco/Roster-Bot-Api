const SEQUELIZE = require('sequelize')
const DB_CONFIG = require('../config/database')

const ROSTERS = require('../models/Rosters')
const ROSTERS_ITEMS = require('../models/RosterItems')
const USERS = require('../models/Users')

const CONNECTION = new SEQUELIZE(DB_CONFIG)

ROSTERS.init(CONNECTION)
ROSTERS_ITEMS.init(CONNECTION)
USERS.init(CONNECTION)

ROSTERS.associate(CONNECTION.models)
ROSTERS_ITEMS.associate(CONNECTION.models)
USERS.associate(CONNECTION.models)


module.exports = CONNECTION