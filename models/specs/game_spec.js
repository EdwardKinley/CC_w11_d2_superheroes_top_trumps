const assert = require("assert");
const Game = require("../game.js");
const Card = require("../card.js");
const Player = require("../player.js");

describe("Game", function () {

  let card1;
  let card2;
  let card3;
  let card4;
  let card5;
  let card6;
  let player1;
  let player2;
  let game;

  beforeEach(function () {
    card1 = new Card("Superman", 6, 9, 7);
    card2 = new Card("Scarlet Witch", 7, 10, 5);
    card3 = new Card("Black Widdow", 8, 6, 9);
    card4 = new Card("The Flash", 7, 4, 10);
    card5 = new Card("Wonder Woman", 8, 7, 5);
    card6 = new Card("Batman", 10, 5, 6);
    card7 = new Card("Spider-man", 7, 4, 10);
    player1 = new Player("Gary");
    player2 = new Player("Edward");
    game = new Game(player1, player2);
  });

  it("can name a player", function () {
    assert.deepStrictEqual(player1.name, "Gary");
    assert.deepStrictEqual(player2.name, "Edward");
  });

  it("can read card category values", function () {
    player1.receiveCard(card1);
    player1.receiveCard(card2);
    player1.receiveCard(card3);
    player2.receiveCard(card4);
    player2.receiveCard(card5);
    player2.receiveCard(card6);
    assert.deepStrictEqual(player1.cards[0].intelligence, 6);
    assert.deepStrictEqual(player1.cards[1].strength, 10);
    assert.deepStrictEqual(player2.cards[2].agility, 6);
  });

  it("can determine winning card", function () {
    assert.deepStrictEqual(game.determineWinningCard(card1, card4, "strength"), card1);
    assert.deepStrictEqual(game.determineWinningCard(card2, card5, "intelligence"), card5);
    assert.deepStrictEqual(game.determineWinningCard(card2, card5, "agility"), "draw");
  });

  describe("round winners", function () {
    it("can determine round winner player1 controller", function () {
      player1.receiveCard(card1);
      player2.receiveCard(card4);
      assert.deepStrictEqual(game.determineRoundWinner(player1), player1);
    });
    it("can determine round winner player2 controller", function () {
      player1.receiveCard(card1);
      player2.receiveCard(card4);
      assert.deepStrictEqual(game.determineRoundWinner(player2), player2);
    });
    it("can determine round winner player1 follower", function () {
      player1.receiveCard(card6);
      player2.receiveCard(card5);
      assert.deepStrictEqual(game.determineRoundWinner(player2), player1);
    });
    it("can determine round winner player2 follower", function () {
      player1.receiveCard(card1);
      player2.receiveCard(card2);
      assert.deepStrictEqual(game.determineRoundWinner(player1), player2);
    });
    it("can determine round winner player1 controller draw", function () {
      player1.receiveCard(card4);
      player2.receiveCard(card7);
      assert.deepStrictEqual(game.determineRoundWinner(player1), player1);
    });
    it("can determine round winner player2 controller draw", function () {
      player1.receiveCard(card4);
      player2.receiveCard(card7);
      assert.deepStrictEqual(game.determineRoundWinner(player2), player2);
    });
  });

  it("can play round", function () {
    player1.controller = true;
    player1.receiveCard(card1);
    player1.receiveCard(card2);
    player1.receiveCard(card3);
    player2.receiveCard(card4);
    player2.receiveCard(card5);
    player2.receiveCard(card6);
    game.playRound();
    assert.deepStrictEqual(player1.getNumberOfCards(), 4);
    assert.deepStrictEqual(player2.getNumberOfCards(), 2);
    assert.deepStrictEqual(player1.controller, true);
    assert.deepStrictEqual(player2.controller, false);
    assert.deepStrictEqual(player1.cards, [card2, card3, card1, card4]);
    assert.deepStrictEqual(player2.cards, [card5, card6]);
  });

  it("can play game, player1 starts and wins", function () {
    player1.receiveCard(card1);
    player1.receiveCard(card2);
    player1.receiveCard(card3);
    player2.receiveCard(card4);
    player2.receiveCard(card5);
    player2.receiveCard(card6);
    assert.deepStrictEqual(game.playGame(), player1);
    assert.deepStrictEqual(player1.getNumberOfCards(), 6);
    assert.deepStrictEqual(player2.getNumberOfCards(), 0);
    assert.deepStrictEqual(player1.cards, [card1, card4, card2, card5, card3, card6]);
    assert.deepStrictEqual(player2.cards, []);
  });

  it("can play game, player1 starts and loses", function () {
    player1.receiveCard(card5);
    player1.receiveCard(card3);
    player1.receiveCard(card1);
    player2.receiveCard(card6);
    player2.receiveCard(card4);
    player2.receiveCard(card2);
    assert.deepStrictEqual(game.playGame(), player2);
    assert.deepStrictEqual(player1.getNumberOfCards(), 0);
    assert.deepStrictEqual(player2.getNumberOfCards(), 6);
    assert.deepStrictEqual(player1.cards, []);
    assert.deepStrictEqual(player2.cards, [card6, card5, card4, card3, card2, card1]);
  });

  it("can play game, player1 starts and loses a longer game", function () {
    player1.receiveCard(card1);
    player1.receiveCard(card4);
    player1.receiveCard(card5);
    player2.receiveCard(card2);
    player2.receiveCard(card3);
    player2.receiveCard(card6);
    assert.deepStrictEqual(game.playGame(), player2);
    assert.deepStrictEqual(player1.getNumberOfCards(), 0);
    assert.deepStrictEqual(player2.getNumberOfCards(), 6);
    assert.deepStrictEqual(player1.cards, []);
    assert.deepStrictEqual(player2.cards, [card6, card5, card2, card4, card1, card3]);
  });

});
