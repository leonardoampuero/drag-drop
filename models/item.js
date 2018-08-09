'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = Schema({
  description: {type: String},
  fileName: { type: String },
  position: { type: Number , required: true},
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
})

module.exports = mongoose.model('item', Item)
