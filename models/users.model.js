const { Sequelize } = require("sequelize");

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {Sequelize} Sequelize 
 * @returns 
 */
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user'
      }
    });
  
    return Users;
  };