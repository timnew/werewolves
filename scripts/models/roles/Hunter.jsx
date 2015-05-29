'use strict';

import Role from './Role';

class Hunter extends Role {
  constructor(player) {
    super(player);
  }

  static get roleName() { return 'Hunter'; }
}

export default Hunter;
