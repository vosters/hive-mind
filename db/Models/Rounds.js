const Sequelize = require('sequelize')
const db = require('../db')

const Rounds = db.define('round', {

  GameId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  letters: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  coreLetter: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  gameDate: {
    type: Sequelize.DATE
    }

})

module.exports = Rounds
