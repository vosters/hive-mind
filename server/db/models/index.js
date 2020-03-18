const Game = require('./game');
const Round = require('./round');
const User = require('./user');
const Word = require('./word');
const UserRound = require('./userRound')
const GuessedWord = require('./guessedWord')

/** Model associations here **/

/*
TO DO:
Round … given a round, set letters. Query MongoDb
Create tests for associations
*/

Game.hasMany(Round)

User.belongsToMany(Round, { through: 'usersRound'});
Round.belongsToMany(User, { through: 'usersRound'});
UserRound.belongsTo(User)
UserRound.belongsTo(Round)
User.hasMany(UserRound)
Round.hasMany(UserRound)

Word.belongsToMany(UserRound, { through: GuessedWord });
UserRound.belongsToMany(Word, { through: GuessedWord });
GuessedWord.belongsTo(Word);
GuessedWord.belongsTo(UserRound);
Word.hasMany(GuessedWord);
UserRound.hasMany( GuessedWord);

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
