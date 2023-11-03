
const { Sequelize } = require('sequelize');
const { database } = require('../config.json')

const sequelize = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: database.dialect
});

sequelize.sync()
    .then(() => {
        console.log("[+] Synced database");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

module.exports = sequelize;
