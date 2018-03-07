const mongoose = require('mongoose')
const { Record } = require('../../data-layer')

const ObjectId = mongoose.Types.ObjectId

module.exports = {
  query: {
    searchRecord: (_, { keyword, dateGreaterThanEqual, dateLessThanEqual }, { user }) =>
      Record.search({ user, keyword, dateGreaterThanEqual, dateLessThanEqual })
        .then(record => record)
        .catch(err => new Error(err)),

    getRecordById: (_, { id }, { user }) =>
      Record.get(id, user)
        .then(record => record)
        .catch(err => new Error(err)),
  },

  mutation: {
    createRecord: (_, params, { user }) => {
      const attributes = Object.assign(params, {
        user: new ObjectId(user),
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const recordToCreate = new Record(attributes)

      return recordToCreate.save()
        .then(record => record)
        .catch(err => new Error(err))
    },

    updateRecord: (_, params, { user }) => {
      const attributes = Object.assign(params, {
        _id: params.id,
        updatedAt: new Date()
      })

      const recordToUpdate = new Record(attributes)

      return Record.update(recordToUpdate, user)
        .then(record => record)
        .catch(err => new Error(err))
    },

    deleteRecord: (_, { id }, { user }) => Record.remove(id, user)
        .then(data => data)
        .catch(err => new Error(err))
    },
}
