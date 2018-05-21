const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  date: Date,
  description: String,
  user: mongoose.Schema.ObjectId
});

const compareArrays = (a1, a2) =>
  a1.length == a2.length && a1.every((v, i) => v === a2[i]);

const checkAuth = (record, user) =>
  record && compareArrays(record.user.id, mongoose.Types.ObjectId(user).id);

/**
 * Statics
 */
RecordSchema.statics = {
  /**
   * Get record, if user owns this record
   * @param {string} id - The objectId of record.
   * @param {string} user - The objectId of user of record.
   * @returns {Promise<User, Error>}
   */
  get(id, user) {
    return this.findById(mongoose.Types.ObjectId(id))
      .exec()
      .then(record => {
        if (checkAuth(record, user)) {
          return record;
        }
        return Promise.reject();
      })
      .catch(() => {
        const err = new Error("No such record exists!");
        return Promise.reject(err);
      });
  },

  /**
   * Search records of a user in descending order of 'updatedAt' timestamp
   * @param {string} user - id of the user
   * @param {string} keyword - keyword to search in description, category, vendor or location names
   * @param {date} dateGreaterThanEqual - date greater than equal.
   * @param {date} dateLessThanEqual - date less than equal.
   * @param {number} skip - Number of records to be skipped.
   * @param {number} limit - Limit number of records to be returned.
   * @returns {Promise<Record[]>}
   */
  search({
    user,
    keyword = "",
    dateGreaterThanEqual = "",
    dateLessThanEqual = "",
    skip = 0,
    limit = 10
  } = {}) {
    return this.find({
      $and: [
        { description: { $regex: `^${keyword}` } },
        { date: { $gte: new Date(dateGreaterThanEqual) } },
        { date: { $lte: new Date(dateLessThanEqual) } },
        { user }
      ]
    })
      .sort({ updatedAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  /**
   * Update a record of a user with given parameters.
   * @param {string} user - id of the user
   * @param {object} recordToUpdate - record object to update
   * @returns {Promise<Record[]>}
   */
  update(recordToUpdate, user) {
    return this.findById(mongoose.Types.ObjectId(recordToUpdate.id))
      .exec()
      .then(record => {
        if (checkAuth(record, user)) {
          record.set(recordToUpdate);
          return Promise.resolve(record);
        }
        const err = new Error("No such record exists!");
        return Promise.reject(err);
      })
      .then(updatedRecord => {
        return updatedRecord
          .save()
          .then(record => record)
          .catch(e => Promise.reject(e));
      })
      .catch(e => Promise.reject(e));
  },

  /**
   * Remove a record of a user
   * @param {string} user - id of the user
   * @param {object} id - record id to remove
   * @returns {Promise<Record>}
   */
  remove(id, user) {
    return this.findById(mongoose.Types.ObjectId(id))
      .exec()
      .then(record => {
        if (checkAuth(record, user)) {
          return Promise.resolve(record);
        }
        const err = new Error("No such record exists!");
        return Promise.reject(err);
      })
      .then(recordToDelete => {
        return recordToDelete
          .remove()
          .then(record => record)
          .catch(e => Promise.reject(e));
      })
      .catch(e => Promise.reject(e));
  }
};

module.exports = mongoose.model("Record", RecordSchema);
