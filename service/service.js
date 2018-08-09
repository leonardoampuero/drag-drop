'use strict'
const Item = require('../models/item.js')

class Service {

  async getItems () {
    try {
      return await Item.find({}).sort({position: 1})
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async deleteItem (id) {
    try {
      return await Item.remove({_id: id})
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async orderItems (items) {
    try {
      let pos = 0
      for (let itemId of items) {
        await Item.findByIdAndUpdate(itemId, {position: pos}, {new: true}).exec()
        pos++
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async createItem (body, file) {
    let result = await Item.find({}).sort({position: -1})
    let pos = 0

    if (result && result.length > 0) {
      pos = result[0].position + 1
    }
    // Create an Image instance
    const item = new Item({
      fileName: file.originalname,
      description: body.description,
      position: pos
    })

    item.save()
    return item
  }
}

module.exports = new Service()
