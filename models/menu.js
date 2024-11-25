'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  menu.init({
    judul: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menu',
  });
  menu.associate = function(models){
    menu.hasMany(models.submenu, {
      foreignKey: 'menu',
      as: 'submenus'
    })
  };
  return menu;
};