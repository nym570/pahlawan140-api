'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class catLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  catLink.init({
    judul: DataTypes.STRING,
    deskripsi: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'catLink',
  });
  catLink.associate = function(models){
    catLink.hasMany(models.link, {
      foreignKey: 'segmen',
      as: 'links'
    })
  };
  return catLink;
};