const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const mongoose = require('./services/mongoose')
const taskRoutes = require('./routes/api/task.routes')

const app = express()

mongoose.connect();

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
)
app.use(bodyParser.json({ limit: "50mb", extended: true }))

app.use(express.static(path.join(__dirname, "build")))
app.use('/api/v1/task', taskRoutes)


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"))
})
app.listen(9000)

