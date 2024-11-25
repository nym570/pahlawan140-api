'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class magang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  magang.init({
    akun: DataTypes.INTEGER,
    mulai: DataTypes.DATE,
    selesai: DataTypes.DATE,
    status: DataTypes.STRING,
    rekomendasi: DataTypes.STRING,
    ktm: DataTypes.STRING,
    proposal: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'magang',
  });
  magang.associate = function(models){
    magang.belongsTo(models.magangacc, {
      foreignKey: 'akun',
      as: 'magangaccs'
    })
  };
  return magang;
};