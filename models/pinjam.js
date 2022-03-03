'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pinjam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi: pinjam -> user (child -> parent)
      // parent: user, child: pinjam
      // tipe: 1 pinjam dilakukan oleh 1 user(one to one)
      this.belongsTo(models.user, {
        foreignKey: "id_user",
        as: "user"
      })

      // relasi: pinjam -> detail_pinjam (parent -> child)
      // parent: pinjam, child: detail_pinjam
      // tipe: 1 pinjam dilakukan bisa lebih dari 1 buku(one to many)
      this.hasMany(models.detail_pinjam, {
        foreignKey: "id_pinjam",
        as: "detail_pinjam"
      })
    }
  }
  pinjam.init({
    id_pinjam:{  //dikenalkan, karena bisa dianggap id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tgl_pinjam: DataTypes.DATE,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pinjam',
    tableName: 'pinjam'
  });
  return pinjam;
};