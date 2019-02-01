const Sequelize = require('sequelize');

module.exports.sequelize = new Sequelize('testDB', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});
