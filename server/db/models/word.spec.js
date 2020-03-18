const { expect } = require("chai");
const { db, Word } = require(".");

describe("Word model", () => {
  beforeEach(() => db.sync({ force: true }));
  describe("column definitions and validations", () => {
    it("has a word property", () => {
      return Word.create({
        word: "ABCD"
      }).then(word => {
        expect(word.word).to.equal("ABCD");
      });
    });
  });
});
