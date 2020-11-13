const Autoparts = require("../models/autoparts")

exports.getAll = async (req, res) => {
  const list = await Autoparts.find({})
  return res.json({ status: "ok", data: list })
}

exports.getOne = async (req, res) => {
  const autopart = await Autoparts.findOne(
    { id: req.params.id },
    { upsert: false, useFindAndModify: false }
  )
  return res.json({ status: "ok", data: autopart })
}

exports.update = async (req, res) => {
  let autopart = await Autoparts.findOneAndUpdate(
    { id: req.params.id },
    { $set: req.body },
    { upsert: false, useFindAndModify: false }
  )
  task = await Autoparts.findOne({ id: req.params.id })
  return res.json({ status: "ok", data: autopart })
}

exports.create = async (req, res) => {
  const autopart = new Autoparts(req.body)
  await autopart.save()
  return res.json({ status: "ok", data: autopart })
}

exports.delete = async (req, res) => {
  await Autoparts.deleteOne({ id: req.params.id })
  return res.json({ status: "ok", id: req.params.id })
}
