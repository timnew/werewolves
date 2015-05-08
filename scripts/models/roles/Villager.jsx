'use strict';

const Role = require('./Role');

class Villager extends Role {
  constructor(player) {
    super('Villager', player);
  }
}

module.exports = Villager;
