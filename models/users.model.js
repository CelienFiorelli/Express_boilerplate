const { Sequelize } = require("sequelize");
const sequelize = require('./index');

const Users = sequelize.define("users", {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'user'
  }
});


module.exports = Users;