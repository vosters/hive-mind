const { expect } = require("chai");
const { db, Word, Round, Game, User } = require("../models");

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

  describe("Round associations", () => {
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

  describe("Game associations", () => {
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
    it.only("Each game has a winner", async () => {
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
