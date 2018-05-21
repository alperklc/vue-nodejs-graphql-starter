const baseType = require('./base.type')
const dateTimeType = require('./dateTime.type')
const userType = require('./user.type')
const recordType = require('./record.type')

module.exports = {
  open: [
    baseType,
    dateTimeType,
    userType
  ],

  secured: [
    baseType,
    dateTimeType,
    userType,
    recordType
  ]
}
