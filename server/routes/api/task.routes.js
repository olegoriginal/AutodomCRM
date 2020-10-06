const express = require('express')
const taskController = require('../../controller/task.controller')

const router = express.Router()

router.get('/', taskController.getAll)
router.get("/:id", taskController.getOne)
router.post("/", taskController.create)
router.patch("/:id", taskController.update)
router.delete("/:id", taskController.delete)

module.exports =  router;