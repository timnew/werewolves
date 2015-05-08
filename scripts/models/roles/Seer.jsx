'use strict';

const Role = require('./Role');

class Seer extends Role {
  constructor(player) {
    super('Seer', player);
  }
}


module.exports = Seer;
