const { request, response } = require("../routes/user")

let modelPinjam = require("../models/index").pinjam
let modelDetailPinjam = require("../models/index").detail_pinjam

exports.getDataPinjam = async(request, response) => {
    let data = await modelPinjam.findAll({
        include: ["user", {
            model: modelDetailPinjam,
            as: "detail_pinjam",
            include: "buku"
        }]
    })
    return response.json(data)
}

exports.addDataPinjam = (request, response) => {
    let newData = {
        tgl_pinjam: request.body.tgl_pinjam,
        id_user: request.body.id_user
    }

    // insert ke tabel pelanggaran_siswa
    modelPinjam.create(newData)
    .then(result => {
        let detail_pinjam = request.body.detail_pinjam
        // asumsinya detail_pelanggaran_siswa itu bertipe array
        let id = result.id_pinjam
        for (let i = 0; i < detail_pinjam.length; i++) {
            detail_pinjam[i].id_pinjam = id
        }

        // insert ke tabel detail_pelanggaran_siswa
        modelDetailPinjam.bulkCreate(detail_pinjam)
        // create = insert 1 baris / 1 data
        // bulkCreate = bisa banyak data(array)
        .then(result => {
            return response.json({
                message:`Data pinjam berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.editDataPinjam = (request, response) => {
    let id = request.params.id_pinjam
    let newData = {
        tgl_pinjam: request.body.tgl_pinjam,
        id_user: request.body.id_user
    }

    modelPinjam.update(
        newData, {where:{id_pinjam: id}}
    )

        .then(async result => {
            await modelDetailPinjam.destroy(
                {where: {
                    id_pinjam: request.params.id_pinjam
                } }
            )

            let detail_pinjam = request.body.detail_pinjam
            // asumsinya detail_pelanggaran_siswa itu bertipe array
            let id = request.params.id_pinjam
            for (let i = 0; i < detail_pinjam.length; i++) {
                detail_pinjam[i].id_pinjam = id
            }

            // insert ke tabel detail_pelanggaran_siswa
            modelDetailPinjam.bulkCreate(detail_pinjam)
            // create = insert 1 baris / 1 data
            // bulkCreate = bisa banyak data(array)
            .then(result => {
                return response.json({
                    message:`Data pinjam berhasil diubah`
                })
            })
            .catch(error => {
                return response.json({
                    message: error.message
                })
            })

        })
        .catch(error => console.error(error))
}

exports.deleteDataPinjam = (request, response) => {
   let id = request.params.id_pinjam
   
   modelDetailPinjam.destroy({
       where:{
           id_pinjam: id
       }
   })

   .then(result => {
        let id = request.params.id_pinjam

        modelPinjam.destroy({
            where: {
                id_pinjam: id
            }
        })

        .then(result => {
            return response.json({
                message: ` Data pinjam berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
   })
   .catch(error => console.log(error))
}