const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config({ path: '.env' })
const createServer = require('./createServer')
const db = require('./db')
const express = require('express')

const server = createServer()

const app = express()
app.use(cookieParser())
app.use(
  cors({
    origin: true,
    credentials: true
  })
)

// decode the JWT so we can get the user Id on each request
// app.use((req, res, next) => {
//   const { token } = req.cookies
//   if (token) {
//     const { userId } = jwt.verify(token, process.env.APP_SECRET)
//     // put the userId onto the req for future requests to access
//     req.userId = userId
//   }
//   next()
// })

// // // 2. Create a middleware that populates the user on each request

// app.use(async (req, res, next) => {
//   // if they aren't logged in, skip this
//   if (!req.userId) return next()
//   const user = await db.query.user(
//     { where: { id: req.userId } },
//     '{ id, permissions, email, name }'
//   )
//   req.user = user
//   next()
// })

server.applyMiddleware({ app, path: '/', cors: false })
app.listen({ port: process.env.PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${
      server.graphqlPath
    }`
  )
)
