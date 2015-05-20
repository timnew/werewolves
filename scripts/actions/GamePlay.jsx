'use strict';

import Marty from 'marty';
import {
  CREATE_GAME,
  NEXT_STEP,

  CHANGE_ROLE,
  ATTACK_PLAYER,
  VERIFY_PLAYER
} from 'constants/GamePlayConstants';

class GamePlay extends Marty.ActionCreators {
  createGame() {
    this.dispatch(CREATE_GAME);
  }
  nextStep() {
    this.dispatch(NEXT_STEP);
  }

  changeRole(player, role) {
    this.dispatch(CHANGE_ROLE, player, role);
  }
  attackPlayer(player) {
    this.dispatch(ATTACK_PLAYER, player);
  }
  verifyPlayer(player) {
    this.dispatch(VERIFY_PLAYER, player);
  }
}

export default Marty.register(GamePlay);
