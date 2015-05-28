'use strict';

import Marty from 'marty';
import _ from 'lodash';

import GameConfigStorage from 'stateSources/GameConfigStorage';

import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  UPDATE_PLAYER,
  RESET_ALL_PLAYER,
  SAVE_CONFIG,
  LOAD_CONFIG,
  INIT_CONFIG,
  CURRENT_CONFIG
} from 'constants/GameSetupConstants';

export const MIN_PLAYER_COUNT = 5;
export const RECOMMENDED_MAX_PLAYER_COUNT = 17;
export const MAX_PLAYER_COUNT = 999;


export class PlayerStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
      players: _.range(0, MIN_PLAYER_COUNT).map(index => this.buildPlayer(index)),
      validationError: null
    };

    this.handlers = {
      addPlayer: ADD_PLAYER,
      removePlayer: REMOVE_PLAYER,
      updatePlayer: UPDATE_PLAYER,
      resetAllPlayer: RESET_ALL_PLAYER,
      saveConfig: SAVE_CONFIG,
      loadConfig: LOAD_CONFIG,
      initConfig: INIT_CONFIG
    };

    this.validate();
  }

  get playerCount() {
    return this.players.length;
  }

  get players() {
    return this.state.players;
  }

  get validationError() { return this.state.validationError; }

  get isValid() {
    return this.validationError === null;
  }

  get canDecreasePlayer() {
    return this.playerCount > MIN_PLAYER_COUNT;
  }

  get canIncreasePlayer() {
    return this.playerCount < MAX_PLAYER_COUNT;
  }

  buildPlayer(index = this.players.length) {
    return {name: `Player ${index + 1}`};
  }

  setError(error) {
    this.setState({
      validationError: error
    });

    return error == null;
  }

  addPlayer() {
    this.players.push(this.buildPlayer());
    this.validate();
  }

  removePlayer(index) {
    if(index == null) {
      this.players.pop();
    } else {
      _.pullAt(this.players, index);
    }
    this.validate();
  }

  updatePlayer(index, playerDefinition) {
    this.players[index] = playerDefinition;
    this.validate();
  }

  resetAllPlayer() {
    this.state.players = this.players.map((player, index) => this.buildPlayer(index));
    this.validate();
  }

  validate() {
    if (this.expectedPlayerCount < MIN_PLAYER_COUNT) {
      return this.setError(`At least ${MIN_PLAYER_COUNT} players`);
    }

    for(var index in this.players) {
      let player = this.players[index];

      if(!player.name) {
        return this.setError('Player name is empty');
      }
    }

    if(_.uniq(_.pluck(this.players, 'name')).length !== this.players.length) {
      return this.setError('Duplicate player name');
    }

    return this.setError(null);
  }

  saveConfig(name) {
    if(!this.validate()) {
      return;
    }

    GameConfigStorage.saveConfig(name, 'players', this.state);
  }

  loadConfig(name) {
    if(!GameConfigStorage.hasConfig(name, 'players')) {
      console.error(`Config ${name} doesn't exist`);
      return;
    }

    let currentConfig = this.state;

    this.state = GameConfigStorage.loadConfig(name, 'players');

    if(!this.validate()) {
      console.error('Loaded config is invalid, restore to previous one');
      this.state = currentConfig;
      this.validate();
    }
  }

  initConfig() {
    this.loadConfig(CURRENT_CONFIG);
  }
}

export default Marty.register(PlayerStore, 'PlayerStore');
