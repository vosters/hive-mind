const Sequelize = require("sequelize");
const db = require("../db");

const GuessedWord = db.define("GuessedWord", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = GuessedWord;
