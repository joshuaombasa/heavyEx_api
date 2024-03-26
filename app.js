const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')

const equipmentRouter = require('./controllers/equipments')


mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URL)
    .then(() => logger.info('connected to mongoDB'))
    .catch(() => logger.error('error connecting to mongoDB'))

const app = express()

app.use(express.json())
app.use(cors())

app.use(middleware.requestLogger)

app.use('/api/equipemnt', equipmentRouter)


module.exports = app