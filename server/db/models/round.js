const Sequelize = require("sequelize");
const db = require("../db");

const Round = db.define("round", {
  letters: {
    type: Sequelize.STRING,
    allowNull: false
  },

  coreLetter: {
    type: Sequelize.STRING,
    allowNull: false
  },

  gameDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Round;
