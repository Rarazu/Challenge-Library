const express = require(`express`)
const app = express()

app.use(express.json())

let pinjamController = require("../controllers/pinjamController")
let authorization = require("../middlewares/authorization")

app.get("/", pinjamController.getDataPinjam)
app.post("/", authorization.authorization, pinjamController.addDataPinjam)
app.put("/:id_pinjam", authorization.authorization,pinjamController.editDataPinjam)
app.delete("/:id_pinjam", pinjamController.deleteDataPinjam)

module.exports = app