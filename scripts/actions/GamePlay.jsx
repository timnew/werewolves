'use strict';

import Marty from 'marty';
import {
  CREATE_GAME,
  NEXT_STEP,

  CHANGE_ROLE,
  COUPLE_PLAYER,
  GUARD_PLAYER,
  ATTACK_PLAYER,
  HEAL_PLAYER,
  POISON_PLAYER,
  VERIFY_PLAYER,
  SHOOT_PLAYER,
  VOTE_PLAYER
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
  couplePlayer(player) {
    this.dispatch(COUPLE_PLAYER, player);
  }
  guardPlayer(player) {
    this.dispatch(GUARD_PLAYER, player);
  }
  attackPlayer(player) {
    this.dispatch(ATTACK_PLAYER, player);
  }
  healPlayer(player) {
    this.dispatch(HEAL_PLAYER, player);
  }
  poisonPlayer(player) {
    this.dispatch(POISON_PLAYER, player);
  }
  verifyPlayer(player) {
    this.dispatch(VERIFY_PLAYER, player);
  }
  shootPlayer(player) {
    this.dispatch(SHOOT_PLAYER, player);
  }
  votePlayer(player, tickets = 1) {
    this.dispatch(VOTE_PLAYER, player, tickets);
  }
}

export default Marty.register(GamePlay);
