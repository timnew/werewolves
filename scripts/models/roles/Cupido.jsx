'use strict';

import Role from './Role';

class Cupido extends Role {
  constructor(player) {
    super('Cupido', player);
  }

  inNightTurn(turn) {
    return turn.fistNight;
  }

  playNightTurn(turn){
  }
}

export default Cupido;
