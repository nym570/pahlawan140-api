'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class magangacc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  magangacc.init({
    nama: DataTypes.STRING,
    nim: DataTypes.STRING,
    sekolah: DataTypes.STRING,
    jurusan: DataTypes.STRING,
    email: DataTypes.STRING,
    nohp: DataTypes.STRING,
    password: DataTypes.STRING,
    verifyToken: DataTypes.STRING,
    verifyAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'magangacc',
  });
  magangacc.associate = function(models){
    magangacc.hasMany(models.magang, {
      foreignKey: 'akun',
      as: 'magang'
    })
  };
  return magangacc;
};