'use strict';

import Role from './Role';

class Villager extends Role {
  constructor(player) {
    super(player);
  }

  static get roleName() { return 'Villager'; }
}

export default Villager;
