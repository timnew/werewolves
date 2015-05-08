'use strict';

const Role = require('./Role');

class Guardian extends Role {
  constructor(player) {
    super('Guardian', player);
  }
}

module.exports = Guardian;
