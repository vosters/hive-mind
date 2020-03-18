const Sequelize = require("sequelize");
const db = require("../db");

const Game = db.define("game", {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },

  winner: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

  mode: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Game;
