'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb://mongo:27017/test')

let port = 3000

app.use(express.static(path.join(__dirname, '/public')))
app.options('*', cors())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.disable('etag')

require('./routes')(app)

app.listen(port, () => {
  console.log('API is live @ Port: ' + port)
})

module.exports = app
