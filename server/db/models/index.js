const Game = require("./game");
const Round = require("./round");
const User = require("./user");
const Word = require("./word");
const UserRound = require("./userRound");
const GuessedWord = require("./guessedWord");
const db = require("../db");

/** Model associations here **/

/*
TO DO:
Round … given a round, set letters. Query MongoDb
Create tests for associations
*/

// Games have many rounds
Game.hasMany(Round);
Round.belongsTo(Game);

// Games have one winner
// User winner as the accessor method instead of user
Game.belongsTo(User, { as: "winner", foreignKey: "winnerId" });

User.belongsToMany(Round, { through: UserRound });
Round.belongsToMany(User, { through: UserRound });
// UserRound.belongsTo(User)
// UserRound.belongsTo(Round)
// User.hasMany(UserRound)
// Round.hasMany(UserRound)

Word.belongsToMany(UserRound, { through: GuessedWord });
UserRound.belongsToMany(Word, { through: GuessedWord });
// GuessedWord.belongsTo(Word);
// GuessedWord.belongsTo(UserRound);
// Word.hasMany(GuessedWord);
// UserRound.hasMany(GuessedWord);

/** Instance methods here **/

Word.alphabetize = async function() {
  const words = await Word.findAll({ order: [["word", "ASC"]] });

  // something to sort according to first letter
  return words;
};

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  Game,
  Round,
  User,
  Word,
  UserRound,
  GuessedWord,
  db
};
