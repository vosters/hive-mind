const Sequelize = require('sequelize')
const db = require('../db')

const Games = db.define('game', {

  RoundId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  Date: {
    type: Sequelize.DATE,
    allowNull: false
  },

  Winner: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },

  Mode: {
    type: Sequelize.STRING,
    allowNull: false,
  }

})

module.exports = Games
