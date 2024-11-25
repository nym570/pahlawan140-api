'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deskripsi: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      segmen: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addConstraint('links',  {
      type: 'FOREIGN KEY',
      name: 'FK_catlinks_links', 
      fields: ['segmen'],
      references: {
        table: 'catlinks',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('links');
  }
};