'use strict';

import Role from './Role';

class Witch extends Role {
  constructor(player) {
    super('Witch', player);
  }
}

export default Witch;
