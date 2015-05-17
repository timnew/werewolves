'use strict';

import Role from './Role';

class Cupido extends Role {
  constructor(player) {
    super(player);
  }

  inNightTurn(turn) {
    return turn.fistNight;
  }

  playNightTurn(turn){
  }
}

export default Cupido;
