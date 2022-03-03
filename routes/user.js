const express = require(`express`)
const app = express()

app.use(express.json())

let userController = require("../controllers/userControllers")

let userValidator = require("../middlewares/userValidation")

app.get("/", userController.getDataUser)
app.post("/", [userValidator.validate], userController.addDataUser)
app.put("/:id_user", userController.editDataUser)
app.delete("/:id_user", userController.deleteDataUser)
app.post("/auth", userController.authentication)

module.exports = app