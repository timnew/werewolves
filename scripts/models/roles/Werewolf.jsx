'use strict';

const Role = require('./Role');

class Werewolf extends Role {
  constructor(player) {
    super('Werewolf', player);
  }
}

module.exports = Werewolf;
