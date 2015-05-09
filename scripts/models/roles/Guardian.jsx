'use strict';

import Role from './Role';

class Guardian extends Role {
  constructor(player) {
    super('Guardian', player);
  }
}

export default Guardian;
