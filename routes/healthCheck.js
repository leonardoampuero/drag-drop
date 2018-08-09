module.exports = function (app) {
  app.post('/alive', (req, res) => {
    res.status(200).send({
      'alive': true
    })
  })

  app.get('/alive', (req, res) => {
    res.status(200).send({
      'alive': true
    })
  })

  app.get('/health', (req, res) => {
    res.status(200).send({
      'alive': true
    })
  })

  app.post('/health', (req, res) => {
    res.status(200).send({
      'alive': true
    })
  })
}
