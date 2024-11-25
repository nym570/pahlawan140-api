'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  link.init({
    judul: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    link: DataTypes.STRING,
    gambar: DataTypes.STRING,
    segmen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'link',
  });
  link.associate = function(models){
    link.belongsTo(models.catLink, {
      foreignKey: 'segmen',
      as: 'catlinks'
    })
  };
  return link;
};