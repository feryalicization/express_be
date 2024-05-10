const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  database: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres', 
    logging: false 
  }
};
