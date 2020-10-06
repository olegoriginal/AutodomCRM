const dotEnv = require('dotenv')
dotEnv.config()

const options = {
  mongoUrl: process.env.MONGOURL
}

module.exports = options