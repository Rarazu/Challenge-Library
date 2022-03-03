const express = require(`express`)
const app = express()

app.use(express.json())

let bukuController = require("../controllers/bukuControllers")
let authorization = require("../middlewares/authorization")

app.get("/", bukuController.getDataBuku)
app.post("/", authorization.authorization, bukuController.addDataBuku)
app.put("/:id_buku", authorization.authorization,bukuController.editDataBuku)
app.delete("/:id_buku", bukuController.deleteDataBuku)

module.exports = app