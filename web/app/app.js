const Server = require('./server.js')
const db = require('../srv/db')
const port = (process.env.PORT || 3000)
const app = Server.app()

//MAGIC MAGIC ACOMMMENT
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.deployment.config.js')
  const compiler = webpack(config)
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPathdist
  }))


app.listen(port)
console.log(`Listening at http://localhost:${port}`)
