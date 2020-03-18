const Sequelize = require("sequelize");
const db = require("../db");

const UserRound = db.define("UserRound", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = UserRound;
