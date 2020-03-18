const Game = require('./game');
const Round = require('./round');
const User = require('./user');
const Word = require('./word');
const UserRounds = require('./userRounds')
const GuessedWords = require('./guessedWords')

/** Model associations here **/

/*
TO DO:
Round … given a round, set letters. Query MongoDb
Create tests for associations
*/

Game.hasMany(Round)

User.belongsToMany(Round, { through: 'usersRounds'});
Round.belongsToMany(User, { through: 'usersRounds'});
UserRounds.belongsTo(User)
UserRounds.belongsTo(Round)
User.hasMany(UserRounds)
Round.hasMany(UserRounds)

Word.belongsToMany(UserRounds, { through: GuessedWords });
UserRounds.belongsToMany(Word, { through: GuessedWords });
GuessedWords.belongsTo(Word);
GuessedWords.belongsTo(UserRounds);
Word.hasMany(GuessedWords);
UserRounds.hasMany( GuessedWords);

/** Instance methods here **/

Word.alphabetize = async function() {
  const words = await Word.findAll();

  // something to sort according to first letter
  return words
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
  Word
};
