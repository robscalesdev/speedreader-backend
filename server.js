const express = require('express')
const cors = require('cors')

// import routes
const postRoutes = require('./app/routes/post_routes')

// import middleware
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')

const serverDevPort = 4741
const clientDevPort = 7165

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// define port for API to run on
const port = process.env.PORT || serverDevPort

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(requestLogger)

app.get('/', (req, res, next) => {
  res.status(200).json({ msg: "Server is running" })
})
app.use('/posts', postRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
