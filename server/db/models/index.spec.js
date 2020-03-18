const { expect } = require("chai");
const { db, Word } = require("../models");

describe("Word alphabetize", () => {
  it.only("Words are returned alphabetically", async () => {
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
