'use strict';
const { Model, DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {

    }
  }

  User.init({
    userName: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identityNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  return User;
};
