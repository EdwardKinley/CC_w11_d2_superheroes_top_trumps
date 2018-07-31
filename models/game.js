const Card = require("./card.js");
const Player = require("./player.js");

const Game = function (player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  // this.controller = player1;
  // this.follower = player2;
};

Game.prototype.determineWinningCard = function (card1, card2, category) {
  if (card1[category] > card2[category]) { return card1; }
  else if (card2[category] > card1[category]) { return card2; }
  else { return "draw"; }
};

Game.prototype.determineRoundWinner = function (controller) {
  let category;
  let winner;
  if (controller === this.player1) {
    this.player1.controller = true;
    category = this.player1.selectCategory();
    winner = this.player1;
  } else {
    this.player2.controller = true;
    category = this.player2.selectCategory();
    winner = this.player2;
  };
  let winningCard = this.determineWinningCard(this.player1.cards[0], this.player2.cards[0], category);
  if (winningCard === this.player1.cards[0]) { return this.player1; }
  else if (winningCard === this.player2.cards[0]) { return this.player2; };
  return winner;
};

Game.prototype.playRound = function () {
  let roundController;
  if (this.player1.controller === true) { roundController = this.player1; }
  else { roundController = this.player2; };
  let winner = this.determineRoundWinner(roundController);
  let player1Card = this.player1.loseCard();
  let player2Card = this.player2.loseCard();
  if (winner === this.player1) {
    this.player1.controller = true;
    this.player2.controller = false;
    this.player1.receiveCard(player1Card);
    this.player1.receiveCard(player2Card);
  } else {
    this.player2.controller = true;
    this.player1.controller = false;
    this.player2.receiveCard(player2Card);
    this.player2.receiveCard(player1Card);
  };
};

Game.prototype.playGame = function () {
  this.player1.controller = true;
  while (this.player1.getNumberOfCards() > 0 && this.player2.getNumberOfCards() > 0) {
    this.playRound();
  };
  if (this.player1.getNumberOfCards() > 0) { return this.player1; }
  else { return this.player2; };
};


module.exports = Game;
