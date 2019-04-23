const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config({ path: '.env' })
const createServer = require('./createServer')
const db = require('./db')
const express = require('express')
const bodyParser = require('body-parser')

const server = createServer()
const app = express()
app.use(bodyParser.json())

app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.use(cookieParser())

app.use((req, res, next) => {
  const { token } = req.cookies
  console.log(token)
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    req.userID = userId
  }
  next()
})

// // 2. Create a middleware that populates the user on each request

app.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next()
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, permissions, email, name }'
  )
  req.user = user
  next()
})

server.applyMiddleware({ app, path: '/', cors: false })
app.listen({ port: process.env.PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${
      server.graphqlPath
    }`
  )
)
