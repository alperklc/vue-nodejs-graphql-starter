
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4040,
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/starter",
  jwtSecret: process.env.JWT_SECRET || "kek"
}

module.exports = config
