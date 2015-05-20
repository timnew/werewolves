'use strict';

import Role from './Role';

import SeerPhase from 'models/phases/SeerPhase';

class Seer extends Role {
  constructor(player) {
    super(player);
  }

  static createPhase() {
    return new SeerPhase();
  }
}

export default Seer;
