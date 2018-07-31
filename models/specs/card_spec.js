const assert = require("assert");
const Card = require("../card.js");

describe("Card", function () {

  let card1;

  beforeEach(function () {
    card1 = new Card("Superman", 6, 9, 7);
  });

  it("should have a name", function () {
    assert.deepStrictEqual(card1.name, "Superman");
  });

  it("should have intelligence", function () {
    assert.deepStrictEqual(card1.intelligence, 6);
  });

  it("should have strength", function () {
    assert.deepStrictEqual(card1.strength, 9);
  });

  it("should have agility", function () {
    assert.deepStrictEqual(card1.agility, 7);
  });

});
