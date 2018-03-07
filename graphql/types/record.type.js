module.exports = `
  type Record @model {
    id: ID! @isUnique
    createdAt: DateTime!
    updatedAt: DateTime!
    description: String!
    user: User! @relation(name: "UserOnRecord")
  }

  extend type Query {
    searchRecord(keyword: String!, dateGreaterThanEqual: String!, dateLessThanEqual: String!): [Record],
    getRecordById(id: ID): Record,
  }

  extend type Mutation {
    updateRecord(id: ID!, description: String): ID,
    deleteRecord(id: ID!): Boolean,
    createRecord(description: String): Record
  }
`
