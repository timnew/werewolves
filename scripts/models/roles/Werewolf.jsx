'use strict';

import Role from './Role';
import WerewolfPhase from 'models/phases/WerewolfPhase';

class Werewolf extends Role {
  constructor(player) {
    super(player);
  }

  static createPhase() {
    return new WerewolfPhase();
  }
}

export default Werewolf;
