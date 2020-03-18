const { expect } = require("chai");
const { db, Game } = require(".");

describe("Game model", () => {
  beforeEach(() => db.sync({ force: true }));
  describe("column definitions and validations", () => {
    it("has a roundId date, winner, and mode property", () => {
      return Game.create({
        roundId: 1,
         date: new Date(),
         winner: true,
         mode: '1v1'
      }).then(game => {
        expect(game.roundId).to.equal("ABCD");
        expect(game.date).to.equal(new Date());
        expect(game.winner).to.equal(true);
        expect(game.mode).to.equal('1v1');
      });
    });
  });
});
