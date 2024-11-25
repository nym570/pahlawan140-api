'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class submenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  submenu.init({
    judul: DataTypes.STRING,
    menu: DataTypes.INTEGER,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'submenu',
  });
  submenu.associate = function(models){
    submenu.belongsTo(models.menu, {
      foreignKey: 'menu',
      as: 'menus'
    })
  };
  return submenu;
};