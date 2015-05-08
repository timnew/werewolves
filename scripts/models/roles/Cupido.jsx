'use strict';

const Role = require('./Role');

class Cupido extends Role {
  constructor(player) {
    super('Cupido', player);
  }

  inNightTurn(turn) {
    return turn.fistNight;
  }

  playNightTurn(turn){
  }
}

module.exports = Cupido;
