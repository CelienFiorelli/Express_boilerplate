
const { Sequelize } = require('sequelize');
const { database } = require('../config.json')

const sequelize = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: database.dialect
});

const usersDefine = require("./users.model.js");

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    users: usersDefine(sequelize, Sequelize),
};


module.exports = db;