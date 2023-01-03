const express = require('express')
const routesRosters = require('./routes/rosters')
const routesUser = require('./routes/users')
const app = express()
const cors = require('cors')

require('./database')

app.use(express.json())
app.use(cors())
// res.header("Access-Control-Allow-Origin" , "*")
// next()

app.set('http://192.168.1.7')
app.use(routesRosters)
app.use(routesUser)
app.listen(3030)