'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pegawai.init({
    nama: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    urutan: DataTypes.INTEGER,
    gambar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pegawai',
  });
  return pegawai;
};