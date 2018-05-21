const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('./types')
const resolvers = require('./resolvers')

module.exports = {
  auth: makeExecutableSchema({
    typeDefs: typeDefs.open,
    resolvers: resolvers.open
  }),
  securedSchema: makeExecutableSchema({
    typeDefs: typeDefs.secured,
    resolvers: resolvers.secured
  })
}
