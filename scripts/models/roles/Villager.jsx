'use strict';

import Role from './Role';

class Villager extends Role {
  constructor(player) {
    super('Villager', player);
  }
}

export default Villager;
