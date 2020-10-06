const mongoose = require('mongoose')
const config = require('../config')

mongoose.connection.on('connected', () => {
  console.log('MongodB is connected ')
})

mongoose.connection.on("error", (err) => {
  console.log(`MongodB coukd not connect because og ${err}`);
})

module.exports.connect = async(mongoURL = config.mongoUrl) => {
  mongoose.connect(mongoURL,{
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  })
}