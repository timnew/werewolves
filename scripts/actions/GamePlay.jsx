'use strict';

import Marty from 'marty';
import {
  CREATE_GAME,
  NEXT_STEP,

  SETTLE_ROLE,
  KILL_PLAYER,
  VERIFY_PLAYER
} from 'constants/GamePlayConstants';

class GamePlay extends Marty.ActionCreators {
  createGame() {
    this.dispatch(CREATE_GAME);
  }
  nextStep() {
    this.dispatch(NEXT_STEP);
  }

  settleRole(player, role) {
    this.dispatch(SETTLE_ROLE, player, role);
  }
  killPlayer(player, reason) {
    this.dispatch(KILL_PLAYER, player, reason);
  }
  verifyPlayer(player) {
    this.dispatch(VERIFY_PLAYER, player);
  }
}

export default Marty.register(GamePlay);
