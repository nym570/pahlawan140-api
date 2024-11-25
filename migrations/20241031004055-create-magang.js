'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('magangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      akun: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mulai: {
        allowNull: false,
        type: Sequelize.DATE
      },
      selesai: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rekomendasi: {
        type: Sequelize.STRING
      },
      ktm: {
        type: Sequelize.STRING
      },
      proposal: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('magangs',  {
      type: 'FOREIGN KEY',
      name: 'FK_magangacc_magang', 
      fields: ['akun'],
      references: {
        table: 'magangaccs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('magangs');
  }
};