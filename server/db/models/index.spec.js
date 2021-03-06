const { expect } = require("chai");
const { db, Word, Round, Game, User, UserRound } = require("../models");

describe("Class and prototype methods", () => {
  beforeEach(() => db.sync({ force: true }));
  describe("Word alphabetization", () => {
    it("Words are returned alphabetically", async () => {
      await Word.create({ word: "Titanic" });
      await Word.create({ word: "Sea Sluts" });
      await Word.create({ word: "Aquaholic" });
      await Word.create({ word: "SeaWorthy" });

      const alphabetizedWords = await Word.alphabetize();

      expect(alphabetizedWords.map(word => word.word)).to.deep.equal([
        "Aquaholic",
        "Sea Sluts",
        "SeaWorthy",
        "Titanic"
      ]);
    });
  });
});

describe("Game >-< Round Association", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("Round magic methods", () => {
    it("a round belongs to exactly one game", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const game1 = await Game.create({
        date: new Date(),
        mode: "1v1"
      });
      const game2 = await Game.create({
        date: new Date(),
        mode: "competition"
      });
      await round.setGame(game1);
      await round.setGame(game2);
      round.getGame().then(game => {
        expect(game.id).to.equal(game2.id);
      });
    });
  });

  describe("Game magic methods", () => {
    it("a game can have many rounds", async () => {
      const round1 = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const round2 = await Round.create({
        letters: "abcd",
        coreLetter: "c",
        gameDate: new Date()
      });
      const game = await Game.create({
        date: new Date(),
        mode: "1v1"
      });
      await game.addRound(round1);
      await game.addRound(round2);
      game.getRounds().then(rounds => {
        expect(rounds.length).to.equal(2);
      });
    });
  });
});

describe("Game >-< User Association", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("Game winner", () => {
    it("Each game has a winner", async () => {
      const game = await Game.create({
        date: new Date(),
        mode: "1v1"
      });
      const user = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      await game.setWinner(user);
      game.getWinner().then(winner => {
        expect(winner.id).to.equal(user.id);
      });
    });
  });
});

describe("Round >-< User Association", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("User magic methods", () => {
    it("Each user can play many rounds", async () => {
      const user = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      const round1 = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const round2 = await Round.create({
        letters: "abcd",
        coreLetter: "c",
        gameDate: new Date()
      });
      await user.addRounds([round1, round2]);

      user.getRounds().then(rounds => {
        expect(rounds.length).to.equal(2);
      });
    });

    describe("User magic methods pt 2", () => {
      it("Users can get their user rounds", async () => {
        const user = await User.create({
          email: "cody@email.com",
          password: "123"
        });
        const round1 = await Round.create({
          letters: "abcd",
          coreLetter: "a",
          gameDate: new Date()
        });
        const round2 = await Round.create({
          letters: "abcd",
          coreLetter: "c",
          gameDate: new Date()
        });
        await user.addRounds([round1, round2]);

        user.getUserRounds().then(userRounds => {
          expect(userRounds.length).to.equal(2);
        });
      });
    });
  });

  describe("Round magic methods", () => {
    it("Each round can have many users", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const user1 = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      const user2 = await User.create({
        email: "murphy@email.com",
        password: "123"
      });

      await round.addUsers([user1, user2]);

      round.getUsers().then(users => {
        expect(users.length).to.equal(2);
      });
    });
  });

  describe("Round magic method pt 2", () => {
    it("Rounds can get their user rounds", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const user1 = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      const user2 = await User.create({
        email: "murphy@email.com",
        password: "123"
      });
      await round.addUsers([user1, user2]);

      round.getUserRounds().then(userRounds => {
        expect(userRounds.length).to.equal(2);
      });
    });
  });

  describe("User round magic methods", () => {
    it.only("User rounds can get their user and round", async () => {
      const round1 = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const user1 = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      await round1.addUser(user1);
      const userRounds = await round1.getUserRounds();

      userRounds[0].getUser().then(user => {
        expect(user.id).to.equal(user1.id);
      });
      userRounds[0].getRound().then(round => {
        expect(round.id).to.equal(round1.id);
      });
    });
  });
});

describe("Word >-< Round Association", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("Round magic methods", () => {
    it("Each round has many words", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });

      await round.addWords([
        await Word.create({ word: "i" }),
        await Word.create({ word: "love" }),
        await Word.create({ word: "my" }),
        await Word.create({ word: "team" })
      ]);

      round.getWords().then(words => {
        expect(words.length).to.equal(4);
      });
    });
  });

  describe("Word magic methods", () => {
    it("Each word can be used in many rounds", async () => {
      const word = await Word.create({
        word: "panagram"
      });

      await word.addRounds([
        await Round.create({
          letters: "abcd",
          coreLetter: "a",
          gameDate: new Date()
        }),
        await Round.create({
          letters: "abcd",
          coreLetter: "a",
          gameDate: new Date()
        })
      ]);

      word.getRounds().then(rounds => {
        expect(rounds.length).to.equal(2);
      });
    });
  });
});

// describe("Word >-< UserRound Association", () => {
//   beforeEach(() => db.sync({ force: true }));

//   describe("Word magic methods", () => {
//     it("Each  has many words", async () => {
//       const round = await Round.create({
//         letters: "abcd",
//         coreLetter: "a",
//         gameDate: new Date()
//       });

//       await round.addWords([
//         await Word.create({ word: "i" }),
//         await Word.create({ word: "love" }),
//         await Word.create({ word: "my" }),
//         await Word.create({ word: "team" })
//       ]);

//       round.getWords().then(words => {
//         expect(words.length).to.equal(4);
//       });
//     });
//   });

//   describe("Word magic methods", () => {
//     it("Each word can be used in many rounds", async () => {
//       const word = await Word.create({
//         word: "panagram"
//       });

//       await word.addRounds([
//         await Round.create({
//           letters: "abcd",
//           coreLetter: "a",
//           gameDate: new Date()
//         }),
//         await Round.create({
//           letters: "abcd",
//           coreLetter: "a",
//           gameDate: new Date()
//         })
//       ]);

//       word.getRounds().then(rounds => {
//         expect(rounds.length).to.equal(2);
//       });
//     });
//   });
// });
