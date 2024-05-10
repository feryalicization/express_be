'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Karyawan extends Model {
    static associate(models) {
      Karyawan.belongsTo(models.Role, { foreignKey: 'roleId' }); // Foreign key for Role
      Karyawan.belongsTo(models.Cabang, { foreignKey: 'cabangId' }); // Foreign key for Cabang
    }
  }
  
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
      type: DataTypes.STRING // Assuming photo is a URL to the image
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role', // Name of the referenced model
        key: 'id' // Primary key in the referenced model
      }
    },
    cabangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cabang', 
        key: 'id' 
      }
    }
  }, {
    sequelize,
    modelName: 'Karyawan'
  });

  return Karyawan;
};
