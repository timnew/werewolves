'use strict';

import Role from './Role';

class Hunter extends Role {
  constructor(player) {
    super('Hunter', player);
  }
}

export default Hunter;
