const { ApolloServer } = require('apollo-server-express')
const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')
const db = require('./db')
const { importSchema } = require('graphql-import')
const path = require('path')

const typeDefs = importSchema(path.resolve('src/schema.graphql'))

function createServer() {
  return new ApolloServer({
    typeDefs,
    resolvers: {
      Mutation,
      Query
    },

    // resolverValidationOptions: {
    //   requireResolversForResolveType: false
    // },
    context: req => ({ ...req, db })
  })
}

module.exports = createServer
