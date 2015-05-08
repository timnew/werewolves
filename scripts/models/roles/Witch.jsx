'use strict';

const Role = require('./Role');

class Witch extends Role {
  constructor(player) {
    super('Witch', player);
  }
}

module.exports = Witch;
