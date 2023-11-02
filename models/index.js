
const { Sequelize } = require('sequelize');
const { database } = require('../config.json')

const sequelize = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: database.dialect
});

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
};

db.users = require("./users.model.js")(sequelize, Sequelize);

module.exports = db;