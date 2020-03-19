const { expect } = require("chai");
const { db, Game } = require(".");

describe("Game model", () => {
  beforeEach(() => db.sync({ force: true }));
  describe("column definitions and validations", () => {
    it("has a roundId date, winner, and mode property", () => {
      const date = new Date();
      return Game.create({
        date: date,
        winner: true,
        mode: "1v1"
      }).then(game => {
        expect(game.date).to.deep.equal(date);
        expect(game.winner).to.equal(true);
        expect(game.mode).to.equal("1v1");
      });
    });
  });
});
