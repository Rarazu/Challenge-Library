const { request, response } = require("../routes/user")

let modelBuku = require("../models/index").buku

exports.getDataBuku = (request, response) => {
    modelBuku.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
            message = error.message
    })
}

exports.addDataBuku = (request, response) => {
    let newBuku = {
        judul: request.body.judul,
        penulis: request.body.penulis,
        penerbit: request.body.penerbit
    }

    modelBuku.create(newBuku)
    .then(result => {
        return response.json({
            message: "Success Add Book Data"
        })
    })
    .catch(error => {
        message = error.message
})
}

exports.editDataBuku = (request, response) => {
    let id = request.params.id_buku
    let dataBuku = {
        judul: request.body.judul,
        penulis: request.body.penulis,
        penerbit: request.body.penerbit
    }

    modelBuku.update(dataBuku, {where: {id_buku: id}})
    .then(result => {
        return response.json({
            message: "Success Update Book Data"
        })
    })
    .catch(error => {
        message = error.message
})
}

exports.deleteDataBuku = (request, response) => {
    let id = request.params.id_buku

    modelBuku.destroy({where: {id_buku: id}})
    .then(result => {
        return response.json({
            message: "Success Delete Book Data"
        })
    })
   .catch(error => {
            message = error.message
    })
}