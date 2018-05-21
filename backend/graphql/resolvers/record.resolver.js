const mongoose = require("mongoose");
const { Record } = require("../../data-layer");

const ObjectId = mongoose.Types.ObjectId;

const returnObj = obj => obj;
const returnErr = err => new Error(err);

module.exports = {
  query: {
    searchRecord: (
      _,
      { keyword, dateGreaterThanEqual, dateLessThanEqual },
      { user }
    ) =>
      Record.search({ user, keyword, dateGreaterThanEqual, dateLessThanEqual })
        .then(returnObj)
        .catch(returnErr),

    getRecordById: (_, { id }, { user }) =>
      Record.get(id, user)
        .then(returnObj)
        .catch(returnErr)
  },

  mutation: {
    createRecord: (_, params, { user }) => {
      const attributes = Object.assign(params, {
        date: new Date(params.date),
        user: new ObjectId(user),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const recordToCreate = new Record(attributes);

      return recordToCreate
        .save()
        .then(returnObj)
        .catch(returnErr);
    },

    updateRecord: (_, params, { user }) => {
      const attributes = Object.assign(params, {
        _id: params.id,
        date: new Date(params.date),
        updatedAt: new Date()
      });

      const recordToUpdate = new Record(attributes);

      return Record.update(recordToUpdate, user)
        .then(returnObj)
        .catch(returnErr);
    },

    deleteRecord: (_, { id }, { user }) =>
      Record.remove(id, user)
        .then(returnObj)
        .catch(returnErr)
  }
};
