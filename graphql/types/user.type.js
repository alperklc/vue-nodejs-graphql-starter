module.exports = `
  type User @model {
    createdAt: DateTime!
    email: String @isUnique
    id: ID! @isUnique
    password: String
    updatedAt: DateTime!
    username: String! @isUnique
  }

  type AuthenticateUserPayload {
    user: User
    token: String!
  }

  extend type Query {
    getUser(email: String): User
  }

  extend type Mutation {
    signupUser(email: String, password: String, username: String): AuthenticateUserPayload,
    authenticateUser(email: String!, password: String!): AuthenticateUserPayload
  }
`
