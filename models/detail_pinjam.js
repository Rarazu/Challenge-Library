'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_pinjam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relasi detail_pinjam -> buku (c -> p)
      // key: id_buku
      // p: buku
      // c: detail_pinjam
      // tipe: 1 detail_pelanggaran_siswa mencatat 1 data pelanggaran
      this.belongsTo(models.buku, {
        foreignKey: "id_buku",
        as: "buku"
      })
    }
  }
  detail_pinjam.init({
    id_detail_pinjam:{  //dikenalkan, karena bisa dianggap id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_pinjam: DataTypes.INTEGER,
    id_buku: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_pinjam',
    tableName: 'detail_pinjam'
  });
  return detail_pinjam;
};