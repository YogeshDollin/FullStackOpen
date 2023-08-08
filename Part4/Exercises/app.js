const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

mongoose.connect(config.MONGODB_URL)
    .then( result => {
        logger.info('connected to DB')
    })
    .catch(error => {
        logger.error('error connecting to DB error: ', error.message)
    })

module.exports = app