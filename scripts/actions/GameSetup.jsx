'use strict';

const Marty = require('marty');
const GameSetupConstants = require('../constants/GameSetupConstants');

class GameSetup extends Marty.ActionCreators {
  updatePlayerCount(count) {
    this.dispatch(GameSetupConstants.UPDATE_PLAYER_COUNT, count);
  }

  toggleRole(roleName, enabled) {
    this.dispatch(GameSetupConstants.TOGGLE_ROLE, roleName, enabled);
  }
}

module.exports = Marty.register(GameSetup);
