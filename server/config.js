const dotEnv = require("dotenv")
dotEnv.config()

const options = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  isSocketsEnabled: process.env.ENABLE_SOCKETS,
  mongoUrl: process.env.MONGOURL,
  secret: process.env.SECRET_JWT || "secretKey",
}

module.exports = options
