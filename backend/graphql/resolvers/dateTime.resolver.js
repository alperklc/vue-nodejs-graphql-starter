const { GraphQLScalarType } = require('graphql')

module.exports = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  parseValue (value) {
    // value from the client
    return new Date(value)
  },
  serialize (value) {
    // value sent to the client
    return new Date(value.getTime()).toISOString()
  },
  parseLiteral (ast) {
    if (typeof ast.kind === 'number') {
      // ast value is always in string format
      return parseInt(ast.value, 10)
    }
    return null
  }
})
