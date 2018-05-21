const bcryptjs = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const {
  User
} = require('../../data-layer')

const config = require('../../config.js')

const SALT_ROUNDS = 10
const salt = bcryptjs.genSaltSync(SALT_ROUNDS)
const expiresIn = 60 * 60 * 24 // expires in 24 hours

const returnErr = err => new Error(err)

/**
 * Authenticates the user
 * @param {Object} user - The user object returned from data layer.
 * @param {String} password - The password provided by user.
 * @returns {Promise<User, Error>}
 */
const authenticateUser = (user, password) => {
  if (user) {
    return bcryptjs.compare(password, user.password)
      .then(passwordCorrect => {
        if (passwordCorrect) {
          return Promise.resolve(user)
        } else {
          throw new Error('Wrong password')
        }
      })
  } else {
    throw new Error('User not found.')
  }
}

/**
 * Creates a user
 * @param {Object} user - The user object returned from data layer.
 * @param {String} email - The email provided by user.
 * @param {String} username - The username provided by user.
 * @param {String} password - The password provided by user.
 * @returns {Promise<User, Error>}
 */
const createUser = (user, email, username, password) => {
  if (user) {
    throw new Error('Email address is already in use')
  } else {
    return bcryptjs.hash(password, salt)
      .then(hash => {
        const user = new User({
          email,
          username,
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        })

        return user.save()
          .then(savedUser => Promise.resolve(savedUser))
          .catch(e => {
            throw new Error(e.message)
          })
      })
  }
}

/**
 * Returns the given user object with generated token
 * @param {Object} user - The user object returned from data layer.
 * @returns {AuthenticateUserPayload}
 */
const generateToken = user => {
  const token = jwt.sign({
    id: user.id
  }, config.jwtSecret, {
    expiresIn
  })
  return {
    user,
    token
  }
}

/**
 * Finds the user with given email
 * @param {String} email - Email address
 * @returns {Promise<User>}
 */
const findUser = email => User.findOne({
  'email': email
})

module.exports = {
  query: {
    getUser: (email) => {
      return User.find((user) => user.email === email)
    }
  },
  mutation: {
    authenticateUser: (_, {
      email,
      password
    }) => {
      return findUser(email)
        .then(user => authenticateUser(user, password))
        .then(user => generateToken(user))
        .catch(returnErr)
    },

    signupUser: (_, {
      username,
      password,
      email
    }, {
      request
    }) => {
      if (validator.isEmail(email)) {
        return findUser(email)
          .then(user => createUser(user, email, username, password))
          .then(user => generateToken(user))
          .catch(returnErr)
      } else {
        return new Error('Please enter a valid email address.')
      }
    }
  }
}
