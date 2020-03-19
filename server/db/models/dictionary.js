const Sequelize = require("sequelize");
const db = require("../db");

const Dictionary = db.define("dictionary", {});

module.exports = Dictionary;
