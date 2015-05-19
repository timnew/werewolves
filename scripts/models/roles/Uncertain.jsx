'use strict';

import Villager from './Villager';
import roles from './index';

class Uncertain extends Villager {
  constructor(player) {
    super(player);
  }

  settleRole(roleName) {
    let RoleClass = roles[roleName];
    return new RoleClass(this.player);
  }
}

export default Uncertain;
