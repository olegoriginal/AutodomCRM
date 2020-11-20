const mongoose = require("mongoose")
const bcrypt = require("bcrypt-nodejs")
const uuid = require("uuid")

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: [String],
      default: ["user"],
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      unique: true,
      default: () => uuid.v4(),
    },
  },
  {
    timestamp: true,
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password)

  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  },
})

userSchema.statics = {
  async toggleChannel({ email, channel }) {
    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new Error("No User")
    }
    if (user.channels.indexOf(channel) >= 0) {
      user.channels = user.channels.filter((ch) => ch !== channel)
    } else {
      user.channels = [...user.channels, channel]
    }
    await user.save()
    return user
  },

  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new Error("No Email")
    }
    if (!password) {
      throw new Error("No Password")
    }

    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new Error("No User")
    }

    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error("PasswordIncorrect")
    }

    return user
  },
}

module.exports = mongoose.model("users", userSchema)
