'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Karyawan extends Model {}
  Karyawan.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING 
    }
  }, {
    sequelize,
    modelName: 'Karyawan'
  });

  return Karyawan;
};
