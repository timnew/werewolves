'use strict';

const Role = require('./Role');

class Hunter extends Role {
  constructor(player) {
    super('Hunter', player);
  }
}


module.exports = Hunter;
