const Sequelize = require("sequelize");
const db = require("../db");

const Words = db.define("word", {
  wordId: {
    wordId: Sequelize.INTEGER,
    allowNull: false
  },

  word: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Words;
