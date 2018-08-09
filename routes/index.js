const healthCheckRoutes = require('./healthCheck')
const api = require('./api')

module.exports = function (app) {
  app.use(function (err, req, res, next) {
    if (err) {
      console.error(err)
      res.status(400).send(err)
    }
  })

  healthCheckRoutes(app)
  api(app)
}
