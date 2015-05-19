'use strict';

import Marty from 'marty';
import {
  UPDATE_PLAYER_COUNT,
  ADD_PLAYER,
  REMOVE_PLAYER,
  UPDATE_PLAYER,
  REMOVE_ALL_PLAYERS,
  UPDATE_ROLE_CONFIG,
  LOAD_CONFIG,
  SAVE_CONFIG,
  CURRENT_GAME
} from 'constants/GameSetupConstants';

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

  updateRoleConfig(roleName, value) {
    if(typeof value === 'boolean') {
      value = value ? 1 : 0;
    }
    this.dispatch(UPDATE_ROLE_CONFIG, roleName, value);
  }

  loadConfig(name) {
    this.dispatch(LOAD_CONFIG, name);
  }

  saveConfig(name) {
    this.dispatch(SAVE_CONFIG, name);
  }

  submitConfig() {
    this.saveConfig(CURRENT_GAME);
  }
}

export default Marty.register(GameSetup);
