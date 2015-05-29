'use strict';

import Role from './Role';
import GuardianPhase from 'models/phases/GuardianPhase';

class Guardian extends Role {
  constructor(player) {
    super(player);
  }

  static get roleName() { return 'Guardian'; }

  static createPhase() {
    return new GuardianPhase();
  }
}

export default Guardian;
