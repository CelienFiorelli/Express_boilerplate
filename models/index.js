
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT
});


sequelize.sync()
    .then(() => {
        console.log("[+] Synced database");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

module.exports = sequelize;
