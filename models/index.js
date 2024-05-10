const { Sequelize } = require('sequelize');
const dbConfig = require('../config/config');

const sequelize = new Sequelize(dbConfig.development);

const User = require('./user')(sequelize); 

module.exports = {
  sequelize,
  User
};
