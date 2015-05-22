'use strict';

import Role from './Role';
import CupidoPhase from 'models/phases/CupidoPhase';

class Cupido extends Role {
  constructor(player) {
    super(player);
  }

  static createPhase() {
    return new CupidoPhase();
  }
}

export default Cupido;
