const express = require("express")
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const mongoose = require("./services/mongoose")
const passportJWT = require("./services/passport.js")
const jwt = require("jsonwebtoken")
const taskRoutes = require("./routes/api/task.routes")
const placeRoutes = require("./routes/api/place.routes")
const employeeRoutes = require("./routes/api/employee.routes")
const carRoutes = require("./routes/api/car.routes")
const autopartRoutes = require("./routes/api/autoparts.routes")
const customerRoutes = require("./routes/api/customer.routes")
const accountRoutes = require("./routes/api/accounts.routes")
const User = require("./models/User.model")
const app = express()
const passport = require("passport")
const config = require("./config")
const auth = require("./middleware/auth")

mongoose.connect()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, "../dist/assets")),
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  }),
  bodyParser.json({ limit: "50mb", extended: true }),
  cookieParser(),
]

passport.use("jwt", passportJWT.jwt)

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
)
app.use(bodyParser.json({ limit: "50mb", extended: true }))

app.use(express.static(path.join(__dirname, "../build")))
app.use("/api/v1", taskRoutes)
app.use("/api/v1", placeRoutes)
app.use("/api/v1", employeeRoutes)
app.use("/api/v1", carRoutes)
app.use("/api/v1", autopartRoutes)
app.use("/api/v1", customerRoutes)
app.use("/api/v1", accountRoutes)

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"))
})
app.listen(process.env.PORT || 9000, () => {
  console.log("listening on", process.env.PORT || 9000)
})

app.post("/api/v1/auth", async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findAndValidateUser(req.body)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: "48h" })
    delete user.password
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: "ok", token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: "error", err })
  }
})

app.get("/api/v1/auth", async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: "48h" })
    delete user.password
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: "ok", token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: "error", err })
  }
})

app.get("/api/v1/user-info", auth(["admin"]), (req, res) => {
  res.json({ users: connections.map((t) => t.userInfo) })
})
