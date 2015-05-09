'use strict';

import Role from './Role';

class Seer extends Role {
  constructor(player) {
    super('Seer', player);
  }
}

export default Seer;
