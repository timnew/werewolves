'use strict';

import Marty from 'marty';
import { UPDATE_PLAYER_COUNT, ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER, REMOVE_ALL_PLAYERS } from 'constants/GameSetupConstants';

class GameSetup extends Marty.ActionCreators {
  updatePlayerCount(count) {
    this.dispatch(UPDATE_PLAYER_COUNT, count);
  }

  addPlayer(playerDefinition) {
    this.dispatch(ADD_PLAYER, playerDefinition);
  }

  removePlayer(index) {
    this.dispatch(REMOVE_PLAYER, index);
  }

  updatePlayer(index, playerDefinition) {
    this.dispatch(UPDATE_PLAYER, index, playerDefinition);
  }

  removeAllPlayers() {
    this.dispatch(REMOVE_ALL_PLAYERS);
  }
}

export default Marty.register(GameSetup);
