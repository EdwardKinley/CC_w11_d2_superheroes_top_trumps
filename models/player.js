const Player = function(name) {
  this.name = name;
  this.cards = [];
  this.controller = false;
};

Player.prototype.getNumberOfCards = function () {
  return this.cards.length;
};

Player.prototype.receiveCard = function (card) {
  this.cards.push(card);
};

Player.prototype.loseCard = function () {
  return this.cards.shift();
};

Player.prototype.selectCategory = function () {
  let card = this.cards[0]
  if (card.intelligence >= card.strength && card.intelligence >= card.agility) { return "intelligence"; }
  else if (card.strength >= card.agility) { return "strength"; }
  else { return "agility"; }
};

module.exports = Player;
