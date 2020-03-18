const Sequelize = require("sequelize");
const db = require("../db");

const GuessedWords = db.define("GuessedWord", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = GuessedWords;
