const Game = require('./game');
const Round = require('./round');
const User = require('./user');
const Word = require('./word');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/** Add instance methods here **/

Word.alphabetize = async function() {
  const words = await Word.findAll({order: [
            ['word', 'ASC'],
        ]})

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
