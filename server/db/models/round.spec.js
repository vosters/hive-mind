const { expect } = require("chai");
const { db, Round } = require(".");

beforeEach(() => db.sync({ force: true }));
describe("Round model", () => {
  it("has a GameId, letters, coreLetter, and gameDate property", () => {
    return Round.create({
      gameId: 1,
      letters: "ABCDEFG",
      coreLetter: "A",
      gameDate: new Date()
    }).then(round => {
      expect(round.gameId).to.equal(1);
      expect(round.letters).to.equal("ABCDEFG");
      expect(round.coreLetter).to.equal("A");
      expect(round.gameDate).to.equal(new Date());
    });
  });
});
