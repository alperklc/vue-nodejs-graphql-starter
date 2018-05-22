const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { graphqlExpress } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

const config = require('./config')
const schema = require('./graphql')

const cors = require('cors')

const path = require('path')
const serveStatic = require('serve-static')

// connect to mongo db
const mongoUri = process.env.MONGODB_URI || config.mongo.host

mongoose.connect(mongoUri, {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  autoReconnect: true,
  promiseLibrary: global.Promise
})

const app = express()

app.use(cors())
app.use(bodyParser.json())

const buildOptions = (req, res) => {
  return jwt.verify(req.headers.authorization, config.jwtSecret, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Failed to authenticate token.'
      })
    } else {
      return ({
        schema: schema.securedSchema,
        context: {
          user: user.id
        }
      })
    }
  })
}

app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions))

// auth is not secured, only used for signup and authentication
app.use('/auth', bodyParser.json(), graphqlExpress({ schema: schema.auth }))

const port = process.env.PORT || config.port

app.listen(port, () => {
  console.log('GraphQL listening at %s', port)
})

// serve static files of frontend app after frontend build
app.use(serveStatic(`${__dirname}/../frontend/dist/`))

module.exports = app
