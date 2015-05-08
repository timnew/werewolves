'use strict';

const Role = require('./Role');

class Idiot extends Role {
  constructor(player) {
    super('Idiot', player);
  }
}

module.exports = Idiot;
