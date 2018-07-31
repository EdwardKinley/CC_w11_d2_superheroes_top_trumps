const assert = require("assert");
const Player = require("../player.js");
const Card = require("../card.js");

describe("Player", function () {

  let card1;
  let card2;
  let card3;
  let card4;
  let card5;
  let card6;
  let player1;
  let player2;

  beforeEach(function () {
    card1 = new Card("Superman", 6, 9, 7);
    card2 = new Card("Scarlet Witch", 7, 10, 5);
    card3 = new Card("Black Widdow", 8, 6, 9);
    card4 = new Card("The Flash", 7, 4, 10);
    card5 = new Card("Wonder Woman", 8, 7, 5);
    card6 = new Card("Batman", 10, 5, 6);
    player1 = new Player("Gary");
    player2 = new Player("Edward");
  });

  it("should have a name", function () {
    assert.deepStrictEqual(player1.name, "Gary");
    assert.deepStrictEqual(player2.name, "Edward");
  });

  describe("cards", function () {

    it("should start with no cards", function () {
      assert.deepStrictEqual(player1.cards, []);
      assert.deepStrictEqual(player2.getNumberOfCards(), 0);
    });

    it("can receive card", function () {
      player1.receiveCard(card1);
      assert.deepStrictEqual(player1.cards, [card1]);
      assert.deepStrictEqual(player1.getNumberOfCards(), 1);
    });

    it("can lose card", function () {
      player2.receiveCard(card4);
      player2.receiveCard(card5);
      player2.receiveCard(card6);
      player2.loseCard();
      assert.deepStrictEqual(player2.cards, [card5, card6]);
      assert.deepStrictEqual(player2.getNumberOfCards(), 2);
    });

    it("can select category intelligence", function () {
      player1.receiveCard(card6);
      assert.deepStrictEqual(player1.selectCategory(), "intelligence");
    });

    it("can select category strength", function () {
      player1.receiveCard(card2);
      assert.deepStrictEqual(player1.selectCategory(), "strength");
    });

    it("can select category agility", function () {
      player1.receiveCard(card4);
      assert.deepStrictEqual(player1.selectCategory(), "agility");
    });

  });

});
