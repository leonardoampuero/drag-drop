'use-strict'
const service = require('../service/service')
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({storage: storage}).single('image')

module.exports = function (app) {
  app.get('/items', async (req, res, next) => {
    try {
      let result = await service.getItems()
      res.status(200).send(result)
    } catch (e) {
      console.error(e)
      res.status(400).send({'error': e.message})
    }
  })

  app.delete('/items/:id', async (req, res, next) => {
    try {
      let result = await service.deleteItem(req.params.id)
      res.status(200).send(result)
    } catch (e) {
      console.error(e)
      res.status(400).send({'error': e.message})
    }
  })

  app.post('/items/order', async (req, res, next) => {
    try {
      await service.orderItems(req.body)
      res.status(200).send({})
    } catch (e) {
      console.error(e)
      res.status(400).send({'error': e.message})
    }
  })

  app.post('/item', async (req, res, next) => {
    return upload(req, res, async function (err) {
      if (err) {
        res.status(400).send({'error': err.message})
        return
      }
      let item = await service.createItem(req.body, req.file)
      res.status(200).send(item)
    })

  })

  app.get('/', async (req, res, next) => {
    try {
      res.sendfile('../public/index.html')
    } catch (e) {
      console.error(e)
      res.status(400).send({'error': e.message})
    }
  })
}
