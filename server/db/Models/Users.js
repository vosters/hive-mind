const Sequelize = require("sequelize");
const crypto = require("crypto");
const db = require("../db");

const Users = db.define("user", {
  facebookId: {
    type: Sequelize.STRING,
    allowNull: true
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue("password");
    }
  },

  username: {
    type: Sequelize.STRING,
    unique: true
  },

  photo: {
    type: Sequelize.STRING,
    allowNull: true
  },

  location: {
    type: Sequelize.INTEGER, //Zip code?
    allowNull: true
  },

  gender: {
    type: Sequelize.ENUM,
    allowNull: true
  },

  age: {
    type: Sequelize.INTEGER,
    allowNull: true
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    }
  }
});

/**
 * instanceMethods
 */
Users.prototype.correctPassword = function(candidatePwd) {
  return Users.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
Users.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

Users.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed("password")) {
    user.salt = Users.generateSalt();
    user.password = Users.encryptPassword(user.password(), user.salt());
  }
};

Users.beforeCreate(setSaltAndPassword);
Users.beforeUpdate(setSaltAndPassword);
Users.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});

module.exports = Users;
