const DateTime = require('./dateTime.resolver')
const userResolver = require('./user.resolver')
const recordResolver = require('./record.resolver')

module.exports = {
  open: {
    Query: userResolver.query,
    Mutation: userResolver.mutation,
    DateTime
  },
  secured: {
    Query: recordResolver.query,
    Mutation: recordResolver.mutation,
    DateTime
  }
}
