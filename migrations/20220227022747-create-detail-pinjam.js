'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_pinjam', {
      id_detail_pinjam: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pinjam: {
        type: Sequelize.INTEGER,
        references:{
          model: "pinjam",
          key: "id_pinjam"
        }
      },
      id_buku: {
        type: Sequelize.INTEGER,
        references:{
          model: "buku",
          key: "id_buku"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_pinjam');
  }
};